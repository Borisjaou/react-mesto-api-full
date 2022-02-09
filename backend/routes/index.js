const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/not-found-error');

router.use(auth);
router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

router.use((req, res, next) => {
  next(new NotFound());
});

module.exports = router;
