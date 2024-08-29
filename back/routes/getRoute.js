const router = require('express').Router(); // api path를 전달해 주는 메서드
const { getReserv, getInquiry } = require('../controllers/getTask');

router.get('/get_reserv', getReserv); // 컨트롤러 함수 연결 - :은 정해지지 않은 문자열 표시
router.get('/get_inquiry', getInquiry);

module.exports = router; // router 모듈 내보내기
