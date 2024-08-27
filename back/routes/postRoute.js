const router = require('express').Router();
const { postTask } = require('../controllers/postTask');

router.post('/post_task', postTask);

module.exports = router;
