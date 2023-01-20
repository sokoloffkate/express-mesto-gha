const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const ValidationError = require('../errors/NotValidate');
const {
  OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, CardResult
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
  .populate(['likes', 'owner'])
    .then((cards) => cards.map((card) => CardResult(card)))
    .then((cards) => res.status(OK).send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' }));
};

module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
  .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
  .populate(['likes', 'owner'])
  .then((card) => CardResult(card))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: `Введенный id = ${req.params.id} не является валидным` });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFound') {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true, runValidators: true },
)
  .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
  .populate(['likes', 'owner'])
  .then((card) => CardResult(card))
  .then((card) => res.status(OK).send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: `Введенный id = ${req.params.id} не является валидным` });
    } else if (err.name === 'NotFound') {
      res.status(NOT_FOUND).send({ message: err.message });
    } else { res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' }); }
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true, runValidators: true },
)
  .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
  .then((card) => CardResult(card))

  .then((card) => res.status(OK).send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: `Введенный id = ${req.params.id} не является валидным` });
    } else if (err.name === 'NotFound') {
      res.status(NOT_FOUND).send({ message: err.message });
    } else { res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' }); }
  });
