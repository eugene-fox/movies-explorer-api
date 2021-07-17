const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SALT_ROUNDS, JWT_DEV_SECRET } = require('../config');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

// Отработал +
// Регистрируем нового пользователя
// Cоздаёт пользователя с переданными в теле
// email, password и name
const userCreate = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        bcrypt.hash(password, SALT_ROUNDS)
          .then((hash) => User.create({
            name, email, password: hash,
          }))
          .then((newUser) => {
            const { password: hashPassword, ...data } = newUser.toObject();
            res.status(201).send(data);
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
            } else {
              next(err);
            }
          });
      } else {
        next(new ConflictError('Пользователь с таким email уже существует'));
      }
    })
    .catch((err) => next(err));
};

// Отработал +
// Логин по имени и паролю
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

//  Отработал +
//  Получаем данные пользователя
const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => next(err));
};

//  Отработал +
//  Редактирование профиля пользователя
const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(req.user._id,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    })
    .orFail(() => new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный ID пользователя'));
      } else if (err.codeName === 'DuplicateKey') {
        next(new ConflictError('Передан недоступный email адресс'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  userCreate,
  login,
  getUserInfo,
  updateUserProfile,
};
