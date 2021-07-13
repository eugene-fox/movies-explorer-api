const router = require('express').Router();
const {
  getMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

router.post('/', saveMovie);

router.get('/', getMovies);

router.delete('/:movieId', deleteMovie);

module.exports = router;
