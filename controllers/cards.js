const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

const { OK } = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((cards) => res.status(OK).send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  const ownerId = req.user._id;
  Card.findById(req.params.id)
    .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
    .then((card) => {
      if (String(card.owner._id) === ownerId) {
        card.delete();
        res.status(OK).send({ message: `'Карточка с id = ${req.params.id} успешно удалена'` });
      } else {
        throw (new Forbidden('Карточка принаджежит другому пользователю. Удаление невозможно'));
      }
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
)
  .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
  .populate(['likes', 'owner'])
  .then((card) => res.status(OK).send({ data: card }))
  .catch((err) => next(err));

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
)
  .orFail(new NotFound(`Карточка с указанным id = ${req.params.id} не найдена`))
  .then((card) => res.status(OK).send({ data: card }))
  .catch((err) => next(err));
