const bcrypt = require('bcryptjs');

function createUser(username, email, password, profile, callback) {
  const cryptoPassword = bcrypt.hashSync(password, 12);
  global.db.collection('users').insertOne({ username, email, password: cryptoPassword, profile }, callback);
}

function resetPassword(email, callback) {
  const utils = require('./utils');
  const newPassword = utils.generatePassword();
  const cryptoPassword = bcrypt.hashSync(newPassword, 12);
  global.db.collection('users').updateOne({ email }, {$set: { password: cryptoPassword }}, (err, res) => {
    callback(err, res, newPassword);
  });
}

function countAll(callback) {
  global.db.collection('users').countDocuments(callback);
}

const PAGE_SIZE = 5;
function findAllUsers(page, callback) {
  const TOTAL_SKIP = (page - 1) * PAGE_SIZE;
  global.db.collection('users').find()
    .skip(TOTAL_SKIP)
    .limit(PAGE_SIZE)
    .toArray(callback);
}

function deleteUser(id, callback) {
  const { ObjectId } = require('mongodb');
  global.db.collection('users').deleteOne({_id: ObjectId(id)}, callback);
}

module.exports = { 
  createUser, 
  resetPassword, 
  findAllUsers, 
  PAGE_SIZE, 
  countAll,
  deleteUser
}