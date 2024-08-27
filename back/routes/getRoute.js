const router = require('express').Router();
const { getTask } = require('../controllers/getTask');

router.get('/get_task/:reserv_idx', getTask);

module.exports = router;
