const mongoose = require('mongoose');

const {
  BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, FORBIDDEN_ERROR, CONFLICT_ERROR, TOKEN_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === 'NotFound') {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err.name === 'Forbidden') {
    return res.status(FORBIDDEN_ERROR).send({ message: err.message });
  }
  if (err.name === 'Conflict') {
    return res.status(CONFLICT_ERROR).send({ message: err.message });
  }
  if (err.name === 'Unauthorised') {
    return res.status(TOKEN_ERROR).send({ message: err.message });
  }
  next(err);

  return res.status(INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR_MESSAGE);
};
