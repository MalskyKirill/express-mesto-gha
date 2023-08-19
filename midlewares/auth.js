const { isAuthorized } = require('../utils/jwt');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!isAuthorized(token)) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  next();
};

module.exports = auth;
