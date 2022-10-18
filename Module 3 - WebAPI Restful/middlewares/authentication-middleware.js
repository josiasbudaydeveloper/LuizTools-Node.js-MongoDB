const keyModel = require('../models/keyModel');
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '..', 'data', 'keys.json');
let keys = fs.readFileSync(FILE_PATH, {encoding: 'utf8'});
keys = JSON.parse(keys);
const key = keys[0].key;

function authentication(req, res, next) {
  if (req.headers['authorization'] && req.headers['authorization'] == key) {
    const key = req.headers['authorization'];
    const apiKey = keyModel.findKey(key.replace('ApiKey',''));
  
    if (apiKey && apiKey.enabled) {
      return next();
    }
  }
  else {
    // status 401: unauthorized
    return res.status(401).json({message: 'Unauthorized'});
  }
}

module.exports = authentication;