const router = require('express').Router(); // api path를 전달해 주는 메서드
const { getReserv, gethosp, getInq } = require('../controllers/getTask');

router.get('/get_reserv/:reserv_idx', getReserv); // 컨트롤러 함수 연결 - :은 정해지지 않은 문자열 표시
router.get('/get_inquiry/:inq_idx', getInq);
router.get('/get_inquiry/:hosp_idx', gethosp);

module.exports = router; // router 모듈 내보내기
