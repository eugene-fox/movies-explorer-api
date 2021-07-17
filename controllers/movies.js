const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

// Контроллер получения фильмов пользователя
const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

// Контроллер сохранения нового фильма
const saveMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

//  Контроллер удаления фильма
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм с таким ID не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить фильм пренадлежащий другому пользователю'));
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => {
          res.send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный ID фильма'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  saveMovie,
  deleteMovie,
};
