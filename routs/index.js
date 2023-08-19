const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../utils/errors/NotFoundError');
const auth = require('../midlewares/auth');

router.use('/', authRouter);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', () => {
  throw new NotFoundError('Page Not Found');
});

module.exports = router;
