var express = require('express');
var router = express.Router();
global.products = [];

router.get('/list-products', (req, res) => {
  res.render('view-products', { title: 'Product List', products: global.products });
});

router.get('/register-product', (req, res) => {
  res.render('register-product', {title: 'Register product'});
});

router.post('/register-product', (req, res) => {
  global.products.push({
    id: req.body.id, 
    name: req.body.name, 
    description: req.body.description,
    price: req.body.price
  });

  console.log(global.products);

  res.redirect('/products/list-products');
});

module.exports = router;