const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/', getCards); // получить все карточки

router.post('/', createCard); // создать карточку

router.delete('/:cardId', deleteCard); // удалить карточку

router.put('/:cardId/likes', likeCard); // добавляет лайк

router.delete('/:cardId/likes', deleteLikeCard); // удаляет лайк

module.exports = router;
