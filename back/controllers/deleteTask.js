const database = require('../database/database');

exports.deleteTask = async (req, res) => {
  const reserv_idx = req.params.reserv_idx;

  try {
    const result = await database.query(
      'DELETE FROM task WHERE reserv_idx = $1',
      [reserv_idx]
    );
    return res.status(200).json({ message: 'Task Deleted Successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Get Items Fail' + error });
  }
};
