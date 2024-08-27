const database = require('../database/database');

exports.getTask = async (req, res) => {
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
