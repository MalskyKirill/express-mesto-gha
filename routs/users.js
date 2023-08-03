const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers); // получить всех пользователей

router.get('/users/:userId', getUserById); // получит пользователя по id

router.post('/users', createUser); // создать пользователя

router.patch('/users/me', updateUserProfile); // обновить информацию о пользователе

router.patch('/users/me/avatar', updateUserAvatar); // обновить аватар

module.exports = router;
