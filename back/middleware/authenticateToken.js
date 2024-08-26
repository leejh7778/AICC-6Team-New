// 사용자의 userID와 password로 로그인한 후, 인증된 사용자만이 예약정보/1대1문의 관련 작업(Task)을 할 수 있는 API 엔드포인트를 구현하는 과정에서, JWT를 사용하여 인증할 수 있도록 따로 생성

// 모든 작업 요청에서 JWT 검증하기 위한 목적

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // 환경 변수에서 비밀 키를 읽어옵니다.

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
