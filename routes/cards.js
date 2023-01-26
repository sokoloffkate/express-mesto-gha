const CardRouter = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

CardRouter.get('/', getCards);
CardRouter.post('/', createCard);
CardRouter.delete('/:id', deleteCard);
CardRouter.put('/:id/likes', likeCard);
CardRouter.delete('/:id/likes', dislikeCard);

module.exports = CardRouter;
