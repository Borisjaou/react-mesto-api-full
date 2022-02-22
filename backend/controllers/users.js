// const router = require('express').Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ConflictError = require('../errors/conflict-error');
const User = require('../models/user');
const NotFound = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request-error');

const { NODE_ENV, JWT_SECRET } = process.env;

// const { JWT_SECRET } = require('../src/utils/config');

const getUsers = (req, res, next) => User
  .find({})
  .then((users) => res.status(200).send(users))
  .catch(next);

const getUser = (req, res, next) => {
  const { userId } = req.params.userId;
  return User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Данные не найдены');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => User
  .findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  }, {
    new: true,
    runValidators: true,
  })
  .then((user) => {
    if (!user) {
      throw new NotFound('Данные не найдены');
    } else {
      res.status(200).send(user);
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else {
      next(err);
    }
  });

const updateAvatar = (req, res, next) => User
  .findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
  .then((user) => {
    if (!user) {
      throw new NotFound('Данные не найдены');
    } else {
      res.status(200).send(user);
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else {
      next(err);
    }
  });

// авторизация схема создание токена
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCreditails(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      res.send({ data: user.toJSON() });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  res.clearCookie('jwt').status(200).send({ message: 'Токен удален' });
  //  res.cookie('jwt', '').status(200).send({ message: 'Токен удален' });
  // res.cookie('jwt', '')
  // .end();
};

const currentUser = (req, res, next) => {
  const id = req.user._id;
  User
    .findById(id)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  logout,
  currentUser,
};
