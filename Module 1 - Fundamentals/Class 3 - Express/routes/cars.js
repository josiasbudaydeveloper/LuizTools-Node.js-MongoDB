var express = require('express');
var router = express.Router();
global.cars = [];

router.get('/list-cars', (req, res) => {
  res.render('view-cars', { title: 'Car List', cars: global.cars });
});

router.get('/register-car', (req, res) => {
  res.render('register-car', {title: 'Register Car'});
});

router.post('/register-car', (req, res) => {
  global.cars.push({
    brand: req.body.brand, 
    model: req.body.model, 
    year: req.body.year,
    price: req.body.price
  });

  res.redirect('/cars/list-cars');
});

module.exports = router;