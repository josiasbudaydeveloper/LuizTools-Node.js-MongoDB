const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET view page.
router.get('/', async function(req, res, next) {
  try {
    const members = await db.findFamilyMembers();
    res.render('index', {title: 'Family members', members});
  }
  catch(err) {
    console.log(err);
    res.render('error', {message: "We cannot list the family members", err});
  }
});

// GET register page
router.get('/new', function(req, res, next) {
  res.render('register-or-edit-family-member', 
  {title: 'Register Family Member',
  member: {}});
});

// GET edit family member
router.get('/edit/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const member = await db.findFamilyMember(id);
    res.render('register-or-edit-family-member', {title: 'Edit family member', member});
  }
  catch(err) {
    res.render('error', {message: "We cannot find the family member specified", err});
  }

});

// GET remove family member
router.get('/remove/:userId', async function(req, res, next) {
  try {
    const id = req.params.userId;
    await db.deleteFamilyMember(id);
  
    res.redirect('/');
  }
  catch(err) {
    res.render('error', {message: "We cannot remove the family member specified", err});
  }
}); 

// POST register route
router.post('/new', async function(req, res, next) {
  // form validating
  const errMessage = "There are mandatory fields to be filled!!"
  if (!req.body.name || 
    !req.body.position || 
    !req.body.age ||
    !/[0-9+]/.test(req.body.age) || // if age is not a valid number
    !req.body.occupation ||
    !req.body.state ||
    !req.body.city
    ) {
    return res.redirect(`/new?error=${errMessage}`);
  }

  const name = req.body.name;
  const position = req.body.position;
  const age = parseInt(req.body.age);
  const occupation = req.body.occupation;
  const state = req.body.state;
  const city = req.body.city;
  try {
    await db.insertFamilyMember({name, position, age, occupation, state, city});
    res.redirect('/');
  }
  catch(err) {
    res.render('error', {message: "We cannot insert the family member specified", err});
  }
});

// POST edit family member
router.post('/edit', async function(req, res, next) {
  try {
    await db.updateFamilyMember(req.body.id, req.body);
    res.redirect('/');
  }
  catch(err) {
    res.render('error', {message: "We cannot update the family member specified", err});
  }
});

module.exports = router;