const jwt = require('jsonwebtoken');

const JWT_SECRET = 'SECRET_KEY';

const getGWTToken = (payload) => {
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

module.exports = { getGWTToken };
