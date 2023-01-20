const CardRouter = require('express').Router();
const Card = require('../models/card');
const {
  createCard, getCards, getCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

CardRouter.get('/', getCards);
CardRouter.get('/:id', getCard);
CardRouter.post('/', createCard);
CardRouter.delete('/:id', deleteCard);
CardRouter.put('/:id/likes', likeCard);
CardRouter.delete('/:id/likes', dislikeCard);

module.exports = CardRouter;
