const database = require('../database/database');
const { v4: uuid4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.postReserv = async (req, res) => {
  const reserv_idx = uuid4();
  const { username, pn, date, dog, cat, etc, descriptionR } = req.body;

  try {
    await database.query(
      'INSERT INTO task (reserv_idx, username, pn, date, dog, cat, etc, descriptionR) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [reserv_idx, username, pn, date, dog, cat, etc, descriptionR]
    );

    return res
      .status(201)
      .json({ message: 'Reservation Created Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.postInq = async (req, res) => {
  const inq_idx = uuid4();
  const { username, pn, descriptionI } = req.body;

  try {
    await database.query(
      'INSERT INTO task (inq_idx, username, pn, descriptionI) VALUES ($1, $2, $3, $4)',
      [inq_idx, username, pn, descriptionI]
    );

    return res.status(201).json({ message: 'Inquiry Created Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.postUser = async (req, res) => {
  const { userid, username, email, password } = req.body;

  if (!userid || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const values = [userid, hash, username, email];

    await database.query(
      'INSERT INTO hospuser (userID, password, username, email) VALUES ($1, $2, $3, $4)',
      values
    );

    return res.status(201).json({ message: 'Account Created Successfully' });
  } catch (error) {
    if (error.code === '23505') {
      return res
        .status(409)
        .json({ message: 'UserID or Email already exists' });
    }
    return res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { userid, password } = req.body;

  if (!userid || !password) {
    return res
      .status(400)
      .json({ message: 'UserID and Password are required' });
  }

  try {
    const { rows } = await database.query(
      'SELECT * FROM hospuser WHERE userID = $1',
      [userid]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return res.status(401).json({ message: 'Password not matched' });
    }

    // 환경 변수 체크 및 에러 처리
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: 'Secret key not set' });
    }

    const token = jwt.sign(
      { userID: user.userid, username: user.username, email: user.email },
      secretKey,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
