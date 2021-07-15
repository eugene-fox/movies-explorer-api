const rateLimit = require('express-rate-limit');

// Ограничеваем количество запросов от одного пользователя
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10000, // Ограничение в 10000 запросов для одного IP
});

module.exports = limiter;
