const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  updateUserProfileValidator,
} = require('../validators');

const auth = require('../middlewares/auth');

const { getUserInfo, updateUserProfile } = require('../controllers/users');

// Тут ничего не передаем, защита не нужна
router.get('/me', auth, getUserInfo);
// Защищен
router.patch('/me', celebrate(updateUserProfileValidator), auth, updateUserProfile);

module.exports = router;
