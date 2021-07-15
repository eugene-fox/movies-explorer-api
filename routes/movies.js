const router = require('express').Router();

const { celebrate } = require('celebrate');

const { movieSaveValidator, movieIdValidator } = require('../validators');

const auth = require('../middlewares/auth');

const {
  getMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

// Защищен
router.post('/', celebrate(movieSaveValidator), auth, saveMovie);
// Защита не требуется
router.get('/', auth, getMovies);
// Защищен
router.delete('/:movieId', celebrate(movieIdValidator), auth, deleteMovie);

module.exports = router;
