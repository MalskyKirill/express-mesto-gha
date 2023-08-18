const bcrypt = require('bcrypt');

const UserModel = require('../models/user');
const { OK_CREATE_CODE } = require('../utils/constStatusCode');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const ConflictError = require('../utils/errors/ConflictError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { getGWTToken } = require('../utils/jwt');

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
  const { email, password, name, about, avatar } = req.body;

  if (!email || !password) {
    throw new ValidationError('Email и пароль не могут быть пустыми');
  }

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) =>
      UserModel.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      }),
    )
    .then((user) => res.status(OK_CREATE_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некоректные данные'));
        return;
      }

      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
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

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Email и пароль не могут быть пустыми');
  }

  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пользователь с указаным email не найден');
      }

      bcrypt.compare(password, user.password, (err, isValidPassvord) => {
        if (!isValidPassvord) {
          next(new UnauthorizedError('Пароль не верный'));
          return;
        }
        const token = getGWTToken({ _id: user._id });
        res.send({ token });
      });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  loginUser,
};
