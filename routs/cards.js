const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards); // получить все карточки

router.post('/cards', createCard); // создать карточку

router.delete('/cards/:cardId', deleteCard); // удалить карточку

router.put('/cards/:cardId/likes', likeCard); // добавляет лайк

router.delete('/cards/:cardId/likes', deleteLikeCard); // удаляет лайк

module.exports = router;
