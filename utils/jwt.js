const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const JWT_SECRET = 'SECRET_KEY';

const getGWTToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

const isAuthorized = (token) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) return false;

  return UserModel.findById(decoded._id)
    .then((user) => Boolean(user))
    .catch(() => false);
});

module.exports = { getGWTToken, isAuthorized };
