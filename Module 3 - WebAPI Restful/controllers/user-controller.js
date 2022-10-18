const db = require('../models/userModel');

function getUsers(req, res, next) {
  res.json(db.findUsers());
}

function getUser(req, res, next) {
  const id = req.params.id;
  res.json(db.findUser(id));
}

function insertUser(req, res, next) {
  const newUser = req.body;
  db.insertUser(newUser);
  res.status(201).json(db.findUsers());
}

function updateUserTotally(req, res, next) {
  const id = req.params.id;
  db.updateUser(id, req.body, true);
  res.json(db.findUser(id));
}

function updateUserPartially(req, res, next) {
  const id = req.params.id;
  db.updateUser(id, req.body);
  res.json(db.findUser(id));
}

function deleteUser(req, res, next) {
  const id = req.params.id;
  db.deleteUser(id);
  res.json(db.findUsers());
}


module.exports = { 
  getUsers,
  getUser,
  insertUser,
  updateUserTotally,
  updateUserPartially,
  deleteUser
}