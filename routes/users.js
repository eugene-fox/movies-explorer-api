const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  updateUserProfileValidator,
} = require('../validators');

const auth = require('../middlewares/auth');

const { getUserInfo, updateUserProfile } = require('../controllers/users');

router.get('/me', auth, getUserInfo);
router.patch('/me', celebrate(updateUserProfileValidator), auth, updateUserProfile);

module.exports = router;
