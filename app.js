const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_ADDRESS } = require('./config');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());

app.use(requestLogger);

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

// Подключам все роуты из файла ./routes.js
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {

});
