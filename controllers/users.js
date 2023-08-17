const bcrypt = require('bcrypt');

const UserModel = require('../models/user');
const { OK_CREATE_CODE } = require('../utils/constStatusCode');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');

const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => {
  UserModel.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  UserModel.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некоректные данные'));
        return;
      }

      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => {
      UserModel.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      });
    })
    .then((user) => res.status(OK_CREATE_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некоректные данные'));
        return;
      }

      next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const { _id } = req.user;

  const { name, about } = req.body;

  UserModel.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .then((newData) => {
      res.send(newData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некоректные данные'));
        return;
      }

      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { _id } = req.user;

  const { avatar } = req.body;

  UserModel.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .then((newData) => {
      res.send(newData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некоректные данные'));
        return;
      }

      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
