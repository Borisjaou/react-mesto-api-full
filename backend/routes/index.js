const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/not-found-error');

if (process.env.NODE_ENV === 'production') {
  const newLocal = 'client/build';
  // eslint-disable-next-line no-undef
  app.use(express.static(newLocal));
}
// eslint-disable-next-line no-undef
app.get('/*', (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

router.use(auth);
router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

router.use((req, res, next) => {
  next(new NotFound());
});

module.exports = router;
