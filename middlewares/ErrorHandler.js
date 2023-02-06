const mongoose = require('mongoose');

const {
  BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, FORBIDDEN_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
    res.status(BAD_REQUEST).send(err.message);
  } else if (err.name === 'NotFound') {
    res.status(NOT_FOUND).send(err.message);
  } else if (err.name === 'Forbidden') {
    res.status(FORBIDDEN_ERROR).send(err.message);
  } else if (err.code === 11000) {
    res.status(409).send(err.message);
  } else {
    next(err);
  }
  res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MESSAGE);
  console.log(err);
};
