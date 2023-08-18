const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers); // получить всех пользователей

router.get('/:userId', getUserById); // получит пользователя по id

router.patch('/me', updateUserProfile); // обновить информацию о пользователе

router.patch('/me/avatar', updateUserAvatar); // обновить аватар

module.exports = router;
