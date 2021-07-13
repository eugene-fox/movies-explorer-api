const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

const getMovies = (req, res) => {
  const { owner } = req.body;
  Movie.find({ owner })
    .then((cards) => {
      res.status(200).send(cards);
    })
    // TODO добавить централизованный обработчик ошибок
    .catch((err) => {
      res.status(400).send(err);
    });
};

// контроллер сохранения нового фильма
const saveMovie = (req, res) => {
  const {
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
    // TODO добавить централизованный обработчик ошибок
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм с таким ID не найден'))
    .then((movie) => {
      // if (!card.owner.equals(req.user._id)) {
      // TODO c equals не работает
      if (movie.owner !== req.body.owner) {
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
