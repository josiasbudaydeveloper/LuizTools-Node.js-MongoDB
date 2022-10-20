const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  if (req.query.fail) {
    res.render('signup', {title: 'Sign Up', message: 'User registration failure'});
  }
  else {
    res.render('signup', {title: 'Sign Up', message: null});
  }
});

router.post('/signup', (req, res, next) => {
  const db = require('../db');

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  let profile;
  if (!req.body.profile) {
    profile = 2;
  }
  else {
    profile = parseInt(req.body.profile);
  }

  db.createUser(username, email, password, profile, (err, done) =>  {
    if (err) return res.redirect('/users/signup?fail=true');

    const subject = 'Account created successfully!'
    const text = `Thanks for registering, ${username}!`;
    require('../mail')(email, subject, text);
    res.redirect('/');
  });
});

router.get('/forgot', (req, res, next) => {
  res.render('forgot', { title: 'Reset Password' });
});

router.post('/forgot', (req, res, next) => {
  const db = require('../db');

  db.resetPassword(req.body.email, (err, done, newPassword) => {
    if (err) return res.redirect('/users/signup?fail=true');

    const email = req.body.email;
    const subject = 'Password updated successfully!'
    const text = `Your new password is, ${newPassword}`;
    require('../mail')(email, subject, text);
    res.redirect('/?reset=true');
  });
});

router.post('/delete', global.authenticationMiddleware(), (req, res, next) => {
  const id = req.body.id;
  const db = require('../db');

  db.deleteUser(id, (err) => {
    if (err) console.log(err);

    res.redirect('/index');
  })
});

module.exports = router;