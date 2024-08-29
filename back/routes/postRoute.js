const router = require('express').Router();
const { postReserv, postInq } = require('../controllers/postTask');
const { postUser, loginUser } = require('../controllers/postUser');

router.post('/post_reserv', postReserv);
router.post('/post_inq', postInq);
router.post('/register', postUser);
router.post('/login', loginUser);

module.exports = router;
