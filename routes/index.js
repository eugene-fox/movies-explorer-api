const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const { userRegistrationValidator, userLoginValidator } = require('../validators');
const NotFoundError = require('../errors/not-found-error');
const moviesRoutes = require('./movies');
const usersRoutes = require('./users');

const { login, userCreate } = require('../controllers/users');

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.post('/signup', celebrate(userRegistrationValidator), userCreate);

router.post('/signin', celebrate(userLoginValidator), login);

// Маршрут по умолчанию
router.use(auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
