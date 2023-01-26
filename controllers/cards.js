const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFound = require('../errors/NotFound');

const {
  OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((cards) => res.status(OK).send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR)
      .send({ message: INTERNAL_SERVER_ERROR_MESSAGE }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST).send({ message: `Введенный id = ${req.params.id} не является валидным` });
      } if (err.name === 'NotFound') {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
)
  .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
  .populate(['likes', 'owner'])
  .then((card) => res.status(OK).send({ data: card }))
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(BAD_REQUEST).send({ message: `Введенный id = ${req.params.id} не является валидным` });
    } if (err.name === 'NotFound') {
      return res.status(NOT_FOUND).send({ message: err.message });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
)
  .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
  .then((card) => res.status(OK).send({ data: card }))
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(BAD_REQUEST).send({ message: `Введенный id = ${req.params.id} не является валидным` });
    } if (err.name === 'NotFound') {
      return res.status(NOT_FOUND).send({ message: err.message });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  });
