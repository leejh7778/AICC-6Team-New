const router = require('express').Router();
const { getTasks } = require('../controllers/getTask');

router.get('/get_tasks/:userId', getTasks);

module.exports = router;
