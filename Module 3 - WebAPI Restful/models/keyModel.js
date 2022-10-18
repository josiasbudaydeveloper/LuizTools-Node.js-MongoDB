const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '..', 'data', 'keys.json');

function findKeys() {
  if (!fs.existsSync(FILE_PATH)) return [];

  var keys = fs.readFileSync(FILE_PATH, {encoding: 'utf8'});
  return JSON.parse(keys);
}

function findKey(key) {
  // if (!fs.existsSync(FILE_PATH)) return []; 

  return findKeys().find(keys => keys.key === key);
}

function createKey() {
  const keys = findKeys();
  const apiKey = {
    key: v4(),
    enabled: true,
    lastUsed: null
  }
  keys.push(apiKey);
  fs.write(FILE_PATH, keys);

  return apiKey;
}

function deleteKey(key) {
  const keys = findKeys();
  const index = keys.findIndex(keys => keys.key === key);

  if (key === -1) return "key does not exist";

  keys.splice(index,1);
  fs.writeFileSync(FILE_PATH, JSON.stringify(users));

  return true;
}

module.exports = { findKey, createKey, deleteKey }