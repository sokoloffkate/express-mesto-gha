const UserRouter = require('express').Router();
const {
  createUser, getUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

UserRouter.get('/', getUsers);
UserRouter.get('/:id', getUser);
UserRouter.patch('/me', updateUser);
UserRouter.patch('/me/avatar', updateAvatar);
UserRouter.post('/', createUser);

module.exports = UserRouter;
