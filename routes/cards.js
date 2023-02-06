const CardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

CardRouter.get('/', getCards);
CardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
CardRouter.delete('/:id', deleteCard);
CardRouter.put('/:id/likes', likeCard);
CardRouter.delete('/:id/likes', dislikeCard);

module.exports = CardRouter;
