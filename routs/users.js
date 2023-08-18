const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers); // получить всех пользователей

router.get('/:userId', getUserById); // получит пользователя по id

router.post('/', createUser); // создать пользователя

router.patch('/me', updateUserProfile); // обновить информацию о пользователе

router.patch('/me/avatar', updateUserAvatar); // обновить аватар

module.exports = router;
