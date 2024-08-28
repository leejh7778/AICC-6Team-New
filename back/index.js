const express = require('express');
const cors = require('cors');
const PORT = '8080';
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const pool = require('./database/database');
const JWT_SECRET = process.env.JWT_SECRET;
const proj4 = require('proj4');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

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

// EPSG:2097 (Bessel 중부원점TM) 좌표계 정의
proj4.defs(
  'EPSG:2097',
  '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs'
);

// 병원 데이터 가져오기 엔드포인트
app.get('/hospitals', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT hosp_name, hosp_x, hosp_y, hosp_add FROM hospitals'
    );
    const hospitals = result.rows.map((hospital) => {
      // Bessel 중부원점TM 좌표를 WGS84 좌표계로 변환
      const [lng, lat] = proj4('EPSG:2097', 'EPSG:4326', [
        hospital.hosp_x,
        hospital.hosp_y,
      ]);
      return {
        hosp_name: hospital.hosp_name,
        hosp_x: lng, // 변환된 경도
        hosp_y: lat, // 변환된 위도
        hosp_add: hospital.hosp_add,
      };
    });
    res.status(200).json(hospitals);
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    res.status(500).json({ message: 'Failed to fetch hospital data.' });
  }
});
app.use(require('./routes/getRoute'));
app.use(require('./routes/postRoute'));
app.use(require('./routes/deleteRoute'));
app.use(require('./routes/updateRoute'));

app.listen(PORT, () => console.log(`Server running on ${PORT}`)); // 서버 실행 시 메시지
