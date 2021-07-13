const mongoose = require('mongoose');
const validator = require('validator');

// Поля схемы movie:

// country — страна создания фильма. Обязательное поле-строка.
// director — режиссёр фильма. Обязательное поле-строка.
// duration — длительность фильма. Обязательное поле-число.
// year — год выпуска фильма. Обязательное поле-строка.
// description — описание фильма. Обязательное поле-строка.
// image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// trailer — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
// thumbnail — изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// owner — _id пользователя, который сохранил фильм. Обязательное поле.
// movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
// nameRU — название фильма на русском языке. Обязательное поле-строка.
// nameEN — название фильма на английском языке. Обязательное поле-строка.

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator(v) {
        return validator.isURL(v, { require_protocol: true });
      },
      message: 'Полученное значение не является валидным адресом url',
    },
  },
  trailer: {
    type: String,
    require: true,
    validate: {
      validator(v) {
        return validator.isURL(v, { require_protocol: true });
      },
      message: 'Полученное значение не является валидным адресом url',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(v) {
        return validator.isURL(v, { require_protocol: true });
      },
      message: 'Полученное значение не является валидным адресом url',
    },
  },
  owner: {
    required: true,
  },
  movieId: {
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', movieSchema);
