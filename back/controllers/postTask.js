const database = require('../database/database');
const { v4: uuid4 } = require('uuid');

exports.postTask = async (req, res) => {
  const reserv_idx = uuid4();
  const { userName, pn, date, dog, cat, etc, descriptionR } = req.body;
  // console.log(userName, pn, date, dog, cat, etc, descriptionR);

  try {
    await database.query(
      'INSERT INTO task (reserv_idx, userName, pn, date, dog, cat, etc, descriptionR) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [reserv_idx, userName, pn, date, dog, cat, etc, descriptionR]
    );

    return res.status(201).json({ message: 'Task Created Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
