const express = require('express');
const pool = require('../database/database');
const router = express.Router();

// 병원 데이터 가져오기
router.get('/hospitals', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT hosp_name, hosp_x, hosp_y, hosp_add FROM hospitals'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching hospital data:', error);
    res.status(500).json({ message: 'Failed to fetch hospital data.' });
  }
});

module.exports = router;
