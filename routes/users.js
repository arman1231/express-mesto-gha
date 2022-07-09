const router = require('express').Router();
const {
  getUsers, getUser, updateUserInfo, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateAvatar, validateUserInfo, validateGetUser } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateGetUser, getUser);
router.patch('/me', validateUserInfo, updateUserInfo);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = router;
