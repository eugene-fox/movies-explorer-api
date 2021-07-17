const { Joi } = require('celebrate');
const validator = require('validator');

const customUrlValidation = (value, helpers) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    return helpers.message('Переданная строка не является валидным URL');
  }

  return value;
};

const customIsInteger = (value, helpers) => {
  if (!Number.isInteger(value)) {
    return helpers.message('Переданная строка не является целым числом');
  }

  return value;
};

const userLoginValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const userRegistrationValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const updateUserProfileValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
};

const movieSaveValidator = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(customUrlValidation, 'Is URL?'),
    trailer: Joi.string().required().custom(customUrlValidation, 'Is URL?'),
    thumbnail: Joi.string().required().custom(customUrlValidation, 'Is URL?'),
    owner: Joi.string().hex().length(24),
    movieId: Joi.number().required().custom(customIsInteger, 'Is Int?'),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const movieIdValidator = {
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
};

module.exports = {
  userLoginValidator,
  userRegistrationValidator,
  updateUserProfileValidator,
  movieSaveValidator,
  movieIdValidator,
};
