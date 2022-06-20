const router = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);

module.exports = router;
