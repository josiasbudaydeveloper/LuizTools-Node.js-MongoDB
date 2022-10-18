function getIndex(req, res, next) {
  res.status(200).json({message: 'Ok'});
}

module.exports = { getIndex }