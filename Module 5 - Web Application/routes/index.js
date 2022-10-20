const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/:page?' , global.authenticationMiddleware(), function(req, res, next) {
  const db = require('../db')
  db.countAll((err, qtt) => {
    if (err) return console.log(err);
    const qttPages = Math.ceil(qtt/db.PAGE_SIZE);

    const page = parseInt(req.params.page || "1");
    db.findAllUsers(page, (err, users) => {
      if (err) return console.log(err);
      
      res.render('index', { title: req.user.username, users, qtt, qttPages, page, profile: req.user.profile });
    })
  });
});

module.exports = router;