const router = require('express').Router();
const {
  updateCompletedTask,
  updateTask,
} = require('../controllers/updateTask');

router.patch('/update_completed_task', updateCompletedTask);

router.put('/update_task', updateTask);

module.exports = router;
