const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const {
  createUser,
  login,
  logout,
} = require('./controllers/users');

const routes = require('./routes');
const { PORT, DB_ADDRESS } = require('./src/utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

/* const allowedCors = [
  'localhost:3000',
  'http://tomato.nomoredomains.xyz',
  'https://tomato.nomoredomains.xyz',
  'http://api.tomato.nomoredomains.work',
  'https://api.tomato.nomoredomains.work',
]; */

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(cors({
  origin: 'https://tomato.nomoredomains.xyz',
  credentials: true,
}));

/* app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.headers('Access-Control-Allow-Origin', '*');
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.headers('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
    return;
  }
  next();
}); */

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    password: Joi.string().required().min(8),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.()))(:\d{2,5})?((\/.+)+)?\/?#?/),
    email: Joi.string().required().email(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signout', logout);

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

/* eslint no-console: ["error", { allow: [log] }] */
app.listen(PORT, () => console.log(`Сервер запущен успешно. Порт ${PORT}`));
