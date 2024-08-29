const database = require('../database/database');

const updateItem = async (req, res, column, value, fields, successMessage) => {
  const setClause = Object.keys(fields)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');

  const values = [value, ...Object.values(fields)];

  try {
    const result = await database.query(
      `UPDATE task SET ${setClause} WHERE ${column} = $1`,
      values
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json({ message: successMessage });
  } catch (error) {
    return res.status(500).json({ message: `Update failed: ${error.message}` });
  }
};

exports.updateReserv = async (req, res) => {
  const reserv_idx = req.params.reserv_idx;
  const { username, pn, date, dog, cat, etc, descriptionR } = req.body;

  const fields = { username, pn, date, dog, cat, etc, descriptionR };

  // 전달된 값만 업데이트
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== undefined)
  );

  await updateItem(
    req,
    res,
    'reserv_idx',
    reserv_idx,
    filteredFields,
    'Reservation Updated Successfully'
  );
};

exports.updateInq = async (req, res) => {
  const inq_idx = req.params.inq_idx;
  const { username, pn, descriptionI } = req.body;

  const fields = { username, pn, descriptionI };

  // 전달된 값만 업데이트
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== undefined)
  );

  await updateItem(
    req,
    res,
    'inq_idx',
    inq_idx,
    filteredFields,
    'Inquiry Updated Successfully'
  );
};
