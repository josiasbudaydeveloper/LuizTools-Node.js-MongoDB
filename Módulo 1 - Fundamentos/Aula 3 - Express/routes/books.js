var express = require('express');
var router = express.Router();
global.books = [];

router.get('/list-books', (req, res) => {
  res.render('view-books', { title: 'Book List', productsList: global.books });
});

router.get('/register-book', (req, res) => {
  res.render('register-book', {title: 'Register book'});
});

router.post('/register-book', (req, res) => {
  global.books.push({
    id: req.body.id,
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  });

  res.redirect('/books/list-books');
});

module.exports = router;