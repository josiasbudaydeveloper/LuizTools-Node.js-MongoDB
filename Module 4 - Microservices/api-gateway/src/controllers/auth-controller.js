const jwt = require('jsonwebtoken');
const repository = require('../repository/repository');

async function doLogin(req, res, next) {
  const email = req.body.email;
  const password = String(req.body.password);

  try {
    const user = await repository.getUser(email, password);
    const token = jwt.sign({ userId: user._id, profileId: user.profileId }, process.env.SECRET, { 
      algorithm: 'HS256', 
      // is necessary convert the expires value to int to use seconds, 
      // instead of milisseconds
      expiresIn: parseInt(process.env.EXPIRES) });

    res.json({token});
  }
  catch(err) {
    res.sendStatus(401);
  }
}

async function validateBlackList(req, res, next) {
  let token = req.headers['authorization'];
  if (!token) return next();

  token = token.replace('Bearer ', '');
  const isBlackListed = await repository.checkBlackList(token);

  if (isBlackListed) {
    return res.sendStatus(401);
  }
  else {
    return next();
  }
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
      res.sendStatus(401);
  }
}

async function doLogout(req, res, next) {
  let token = req.headers['authorization'];
  token = token.replace('Bearer ', '');
  await repository.blackListToken(token);

  res.sendStatus(200);
}

module.exports = { doLogin, doLogout, validateToken, validateBlackList };