const UserRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, geCurrenttUser, updateUser, updateAvatar,
} = require('../controllers/users');

UserRouter.get('/', getUsers);
UserRouter.get('/me', geCurrenttUser);
UserRouter.get('/:id', getUser);
UserRouter.patch('/me', updateUser);
UserRouter.patch('/me/avatar', updateAvatar);

module.exports = UserRouter;
