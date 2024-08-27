const database = require('../database/database');

exports.updateTask = async (req, res) => {
  const { userName, pn, date, dog, cat, etc, descriptionR, reserv_idx } =
    req.body;

  if (!reserv_idx) {
    return res.status(400).json({ message: 'reserv_idx is required' });
  }

  try {
    const result = await database.query(
      'UPDATE task SET username = $1, pn = $2, date = $3, dog = $4, cat = $5, etc = $6, descriptionR = $7 WHERE reserv_idx = $8',
      [userName, pn, date, dog, cat, etc, descriptionR, reserv_idx]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Update Failed: ' + error.message });
  }
};
