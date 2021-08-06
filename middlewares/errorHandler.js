const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и в зависимости от значения — устанавливаем сообщение
      message: statusCode === 500
        ? 'На сервере произошла ошибка (Центральный обработчик ошибок)'
        : message,
    });

  return next();
};

module.exports = errorHandler;
