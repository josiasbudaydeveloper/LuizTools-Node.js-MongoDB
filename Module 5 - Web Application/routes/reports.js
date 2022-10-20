const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/' , global.authenticationMiddleware(), function(req, res, next) {
  res.render('reports', { title: 'Reports'});
});

module.exports = router;