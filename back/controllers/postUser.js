const database = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.postUser = async (req, res) => {
  const { userID, username, email, password } = req.body;

  if (!userID || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // 비밀번호 해시화
    const hash = await bcrypt.hash(password, saltRounds);
    const values = [userID, hash, username, email];

    await database.query(
      'INSERT INTO hospuser (userID, password, username, email) VALUES ($1, $2, $3, $4)',
      values
    );

    return res.status(201).json({ message: 'Account Created Successfully' });
  } catch (error) {
    if (error.code === '23505') {
      // Postgres의 unique constraint violation error code
      return res
        .status(409)
        .json({ message: 'UserID or Email already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { userID, password } = req.body;

  if (!userID || !password) {
    return res
      .status(400)
      .json({ message: 'UserID and Password are required' });
  }

  try {
    const { rows } = await database.query(
      'SELECT * FROM hospuser WHERE userID = $1',
      [userID]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.status(401).json({ message: 'Password not matched' });
    }

    // 비밀 키가 설정되지 않았을 경우
    if (!process.env.SECRET_KEY) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    const token = jwt.sign(
      { userID: user.userID, username: user.username, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true, // HTTPS를 사용할 경우에만 쿠키 전송
    });

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
