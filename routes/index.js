const router = require('express').Router();
const moviesRoutes = require('./movies');

router.use('/movies', moviesRoutes);

module.exports = router;
