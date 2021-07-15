const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

require('dotenv').config();

const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_ADDRESS } = require('./config');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/not-found-error');

const app = express();

app.use(limiter);

// Helmet помогает защитить приложения Express, задав различные заголовки HTTP
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

// Подключам все роуты из файла ./routes.js
app.use(routes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {

});
