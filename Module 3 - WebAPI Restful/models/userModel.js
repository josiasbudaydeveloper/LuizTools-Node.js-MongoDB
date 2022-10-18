const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '..', 'data', 'users.json');

function findUsers() {
  if (!fs.existsSync(FILE_PATH)) return []; 

  const users = fs.readFileSync(FILE_PATH, {encoding: 'utf8'});

  return JSON.parse(users);
}

function findUser(id) {
  const index = findUsers().findIndex((user) => user.id === id);
  
  if (index === -1) return {}

  return findUsers()[index];
}

function insertUser(user) {
  const users = findUsers();
  user.id = v4();
  users.push(user);

  fs.writeFileSync(FILE_PATH, JSON.stringify(users));

  return true;
}

function updateUser(id, newUser, overwrite) {
  const users = findUsers();
  const index = users.findIndex(user => user.id === id);
  newUser.id = id;

  if (index === -1) return {};

  if (overwrite) {
    users[index] = newUser;
  }
  else {
    for (let key in newUser) {
      users[index][key] = newUser[key];
    }
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(users));

  return true;
}

function deleteUser(id) {
  const users = findUsers();
  const index = users.findIndex(user => user.id === id);

  if (index === -1) return "user does not exist";

  users.splice(index,1);
  fs.writeFileSync(FILE_PATH, JSON.stringify(users));

  return true;
}

module.exports = { findUser, findUsers, insertUser, updateUser, deleteUser }