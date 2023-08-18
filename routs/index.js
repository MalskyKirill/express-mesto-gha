const router = require('express').Router();
const auth = require('./auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../utils/errors/NotFoundError');

router.use('/', auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', () => {
  throw new NotFoundError('Page Not Found');
});

module.exports = router;
