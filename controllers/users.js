const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const ValidationError = require('../errors/NotValidate');
const {
  OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, UserResult
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => users.map((user) => UserResult(user)))
    .then((user) => res.status(OK).send({ data: user }))
    .catch(() => (INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new NotFound(`Пользователь с указанным id = ${req.params.id} не найдена`))
    .then((user) => UserResult(user))
    .then((user) => res.status(OK).send({ data: user }))
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

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFound(`Пользователь с указанным id ${req.params._id} не найдена`))
    .then((user) => UserResult(user))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: err.message });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(new NotFound(`Пользователь с указанным id ${req.params._id} не найдена`))
    .then((user) => UserResult(user))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: err.message });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' });
    });
};
