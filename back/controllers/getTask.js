const database = require('../database/database');

exports.getReserv = async (req, res) => {
  const reserv_idx = req.params.reserv_idx;
  console.log(reserv_idx);

  try {
    const result = await database.query(
      'SELECT * FROM task WHERE reserv_idx = $1 ORDER BY created_at DESC',
      [reserv_idx]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: 'Get Items Fail' + error });
  }
};

exports.getInquiry = async (req, res) => {
  const inq_idx = req.params.inq_idx;
  console.log(inq_idx);

  try {
    const result = await database.query(
      'SELECT * FROM task WHERE inq_idx = $1 ORDER BY created_at DESC',
      [inq_idx]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: 'Get Items Fail' + error });
  }
};
