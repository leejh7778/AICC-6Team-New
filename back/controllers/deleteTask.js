const database = require('../database/database');

const deleteItem = async (req, res, column, value, successMessage) => {
  try {
    const result = await database.query(
      `DELETE FROM task WHERE ${column} = $1`,
      [value]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json({ message: successMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Deletion failed: ${error.message}` });
  }
};

exports.deleteReserv = async (req, res) => {
  const reserv_idx = req.params.reserv_idx;
  await deleteItem(
    req,
    res,
    'reserv_idx',
    reserv_idx,
    'Reservation Deleted Successfully'
  );
};

exports.deleteInq = async (req, res) => {
  const inq_idx = req.params.inq_idx;
  await deleteItem(
    req,
    res,
    'inq_idx',
    inq_idx,
    'Inquiry Deleted Successfully'
  );
};
