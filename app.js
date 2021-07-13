const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_ADDRESS } = require('./config');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

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

// TODO добавить сюда мидлвару Логгера

// Подключам все роуты из файла ./routes.js
app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {

});
