const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.fail) {
    res.render('login', { title: 'Login', message: 'Wrong user or password', err: true });
  }
  else if (req.query.reset) {
    res.render('login', { title: 'Login',
    message: 'Your new password will arrive on your email in a feel moments', err: false });    
  }
  else {
    res.render('login', { title: 'Login', message: null });
  }
});

router.post('/',
  passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/?fail=true' })
);

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
