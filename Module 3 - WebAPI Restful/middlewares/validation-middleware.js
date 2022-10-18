const userSchema = require('../schemas/user-schema');

function validationMiddlware(req, res, next) {
  if(['POST', 'PUT'].indexOf(req.method) !== -1) {
    if (
      !req.body.name || 
      !req.body.age || 
      !req.body.uf || 
      !req.body.password || 
      !req.body.email
    ) {
      return res.status(422).json({error: 'Blank fields', 
      tip: 'In PUT or POST requests, is necessary to fill all the fields second to the rules'});
    }
  }

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(422).json({error: error.details});
  }
  else {
    next();
  }
}

module.exports = validationMiddlware;