const CardModel = require('../models/card');
const { OK_CODE, OK_CREATE_CODE } = require('../utils/constStatusCode');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');

const getCards = (req, res, next) => {
  CardModel.find({})
    .then((cards) => {
      res.status(OK_CODE).send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  CardModel.create({ ...req.body, owner })
    .then((card) => {
      res.status(OK_CREATE_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Введены некоректные данные'));
        return;
      }

      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  CardModel.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .then((card) => {
      if (`${card.owner}` !== req.user._id) {
        throw new ForbiddenError(
          'Нельзя удалять карточку созданную другим пользователем',
        );
      }
      CardModel.findByIdAndRemove(cardId).then(() => {
        res.status(OK_CODE).send('Карточка удалена');
      });
    })
    .catch((err) => {
      next(err);
    });
};

const likeCard = (req, res, next) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточки с указанным _id не найдена');
    })
    .then((newData) => {
      res.status(OK_CODE).send(newData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некоректные данные'));
        return;
      }

      next(err);
    });
};

const deleteLikeCard = (req, res, next) => {
  const owner = req.user._id;

  const { cardId } = req.params;

  CardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточки с указанным _id не найдена');
    })
    .then((newData) => {
      res.status(OK_CODE).send(newData);
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
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
