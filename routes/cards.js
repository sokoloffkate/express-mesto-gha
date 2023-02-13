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
CardRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
}), deleteCard);

CardRouter.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
}), likeCard);

CardRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
}), dislikeCard);

module.exports = CardRouter;
