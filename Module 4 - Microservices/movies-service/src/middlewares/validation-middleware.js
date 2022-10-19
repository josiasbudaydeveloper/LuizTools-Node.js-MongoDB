const schema = require('../schemas/movie-schemas');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const ADMIN_PROFILE = 1;

function validateMovie(req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    const { details } = error;
    return res.status(422).json(details.map(detail => detail.message));
  }

  return next();
}

function validateToken(req, res, next) {
  let token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  token = token.replace('Bearer ', '');

  try {
      const { userId, profileId } = jwt.verify(token, process.env.SECRET);
      res.locals.userId = userId;
      res.locals.profileId = profileId;
      next();
  } catch (err) {
      console.log(err);
      res.sendStatus(401);
  }
}

function validateAdmin(req, res, next) {
  if (res.locals.profileId == ADMIN_PROFILE) {
    return next();
  }
  else {
    logger.info(`The user ${res.locals.userId} was tried to ${req.method} at ${req.url} at ${new Date()}`);

    // Return status 403 - FORBIDDEN
    return res.sendStatus(403);
  }
}

module.exports = { 
  validateMovie, 
  validateToken, 
  validateAdmin 
};