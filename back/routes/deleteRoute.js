const router = require('express').Router();
const { deleteReserv, deleteInq } = require('../controllers/deleteTask');

router.delete('/delete_reserv/:reserv_idx', deleteReserv);
router.delete('/delete_inq/:inq_idx', deleteInq);

module.exports = router;
