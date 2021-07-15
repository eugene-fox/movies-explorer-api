const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userRegistrationValidator, userLoginValidator } = require('../validators');
const moviesRoutes = require('./movies');
const usersRoutes = require('./users');

const { login, userCreate } = require('../controllers/users');

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

// Отработал +
// Защищен
router.post('/signup', celebrate(userRegistrationValidator), userCreate);

// Отработал +
// Защищен
router.post('/signin', celebrate(userLoginValidator), login);

module.exports = router;
