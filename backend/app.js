const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

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

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
app.use(errors());
app.use(errorHandler);

/* eslint no-console: ["error", { allow: [log] }] */
app.listen(PORT, () => console.log(`Сервер запущен успешно. Порт ${PORT}`));
