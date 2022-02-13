const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized-error');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized('Необходимо авторизоваться'));
  }
  req.user = payload;
  next();
};
