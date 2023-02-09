const UserRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, geCurrenttUser, updateUser, updateAvatar,
} = require('../controllers/users');
const { RegUrl } = require('../utils/constants');

UserRouter.get('/', getUsers);
UserRouter.get('/me', geCurrenttUser);
UserRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24),
  }),
}), getUser);

UserRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

UserRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(RegUrl),
  }),
}), updateAvatar);

module.exports = UserRouter;
