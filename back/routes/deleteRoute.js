const router = require('express').Router();
const { deleteTask } = require('../controllers/deleteTask');

router.delete('/delete_task/:reserv_idx', deleteTask);

module.exports = router;
