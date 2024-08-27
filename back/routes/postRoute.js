const router = require('express').Router();
const { postTask } = require('../controllers/postTask');
const { postUser, loginUser } = require('../controllers/postUser');

router.post('/post_task', postTask);
router.post('/register', postUser);
router.post('/login', loginUser);

module.exports = router;
