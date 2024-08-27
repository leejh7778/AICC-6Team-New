const express = require('express');
const cors = require('cors');
const PORT = '8080';
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

// 로그인 API 엔드포인트
app.post('/login', async (req, res) => {
  const { userID, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM hospUser WHERE userID = $1',
      [userID]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userID: user.userID }, JWT_SECRET, {
      expiresIn: '1h',
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res
      .status(500)
      .json({ message: 'Login failed. Please try again later.' });
  }
});

app.use(require('./routes/getRoute'));
app.use(require('./routes/postRoute'));
app.use(require('./routes/deleteRoute'));
app.use(require('./routes/updateRoute'));

app.listen(PORT, () => console.log(`Server running on ${PORT}`)); // 서버 실행 시 메시지
