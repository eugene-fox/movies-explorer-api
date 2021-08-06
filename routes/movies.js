const router = require('express').Router();

const { celebrate } = require('celebrate');

const { movieSaveValidator, movieIdValidator } = require('../validators');

const auth = require('../middlewares/auth');

const {
  getMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

router.post('/', celebrate(movieSaveValidator), auth, saveMovie);
router.get('/', auth, getMovies);
router.delete('/:movieId', celebrate(movieIdValidator), auth, deleteMovie);

module.exports = router;
