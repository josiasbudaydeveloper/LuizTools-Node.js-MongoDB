const keyModel = require('../models/keyModel');

function authentication(req, res, next) {
  const key = req.headers['authorization'];
  const apiKey = keyModel.findKey(key.replace('ApiKey',''));

  if (apiKey && apiKey.enabled) {
    return next();
  }
  else {
    // status 401: unauthorized
    return res.status(401).json({message: 'Unauthorized'});
  }
}

module.exports = authentication;