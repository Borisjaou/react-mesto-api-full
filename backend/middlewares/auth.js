const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized-error');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
// const { JWT_SECRET } = require('../src/utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Необходимо авторизоваться'));
  }

  req.user = payload;
  next();
};
