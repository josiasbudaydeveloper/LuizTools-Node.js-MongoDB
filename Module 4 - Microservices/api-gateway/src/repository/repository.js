const database = require('../config/database');
const bcrypt = require('bcryptjs');

async function getUser(email, password) {
  const db = await database.connect();
  const user = await db.collection('users').findOne({ email });
  if (!user) throw new Error('Wrong user or password');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Wrong user or password');

  return user;
}

async function blackListToken(token) {
  const db = await database.connect();

  return await db.collection('blackList').insertOne({_id: token, date: new Date()});
}

async function checkBlackList(token) {
  const db = await database.connect();
  const qtd = await db.collection('blackList').countDocuments({_id: token});

  return qtd > 0;
}

module.exports = { getUser, blackListToken, checkBlackList };