const router = require('express').Router();
const { updateReserv, updateInq } = require('../controllers/updateTask');

// 예약 항목 업데이트
router.put('/reservations/:reserv_idx', updateReserv);

// 문의 항목 업데이트
router.put('/inquiries/:inq_idx', updateInq);

module.exports = router;
