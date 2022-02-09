// eslint-disable-next-line no-unused-vars
const router = require('express').Router();
const BadRequest = require('../errors/bad-request-error');
const Forbidden = require('../errors/forbidden-error');
const NotFound = require('../errors/not-found-error');
const Card = require('../models/card');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail(new NotFound('Данные не найдены'))
  .then((card) => {
    const owner = String(card.owner);
    const userId = String(req.user._id);
    if (owner !== userId) {
      throw new Forbidden('Вы не можете удалять чужие карточки');
    } else {
      card.remove();
      res.status(200).send(card);
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else {
      next(err);
    }
  });

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Данные не найдены');
      } else {
        res.status(200).send(card);
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

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFound('Данные не найдены');
    } else {
      res.status(200).send(card);
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      if (err.name === 'CastError') {
        next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
