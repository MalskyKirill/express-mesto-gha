const CardModel = require('../models/card');

const getCards = (req, res) => {
  CardModel.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => {
      res.status(500).send('Server error');
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  CardModel.create({ ...req.body, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(() => {
      res.status(500).send('Server error');
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  CardModel.findByIdAndRemove(cardId)
    .then(() => {
      res.status(200).send('карточка удалена');
    })
    .catch(() => {
      res.status(500).send('Server error');
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
