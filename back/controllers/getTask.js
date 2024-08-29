const database = require('../database/database');

const getItems = async (req, res, column, value) => {
  try {
    const query = `SELECT * FROM task WHERE ${column} = $1 ORDER BY created_at DESC`;
    const result = await database.query(query, [value]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: `Get Items Fail: ${error.message}` });
  }
};

exports.gethosp = async (req, res) => {
  const hosp_idx = req.params.hosp_idx;
  console.log(hosp_idx);
  await getItems(req, res, 'hosp_idx', hosp_idx);
};

exports.getReserv = async (req, res) => {
  const reserv_idx = req.params.reserv_idx;
  console.log(reserv_idx);
  await getItems(req, res, 'reserv_idx', reserv_idx);
};

exports.getInq = async (req, res) => {
  const inq_idx = req.params.inq_idx;
  console.log(inq_idx);
  await getItems(req, res, 'inq_idx', inq_idx);
};
