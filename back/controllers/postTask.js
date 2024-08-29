const database = require('../database/database');
const { v4: uuid4 } = require('uuid');

exports.postReserv = async (req, res) => {
  const reserv_idx = uuid4();
  const { username, pn, date, dog, cat, etc, descriptionR } = req.body;

  try {
    await database.query(
      'INSERT INTO task (reserv_idx, username, pn, date, dog, cat, etc, descriptionR) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [reserv_idx, username, pn, date, dog, cat, etc, descriptionR]
    );

    return res
      .status(201)
      .json({ message: 'Reservation Created Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.postInq = async (req, res) => {
  const inq_idx = uuid4();
  const { username, pn, descriptionI } = req.body;

  try {
    await database.query(
      'INSERT INTO task (inq_idx, username, pn, descriptionI) VALUES ($1, $2, $3, $4)',
      [inq_idx, username, pn, descriptionI]
    );

    return res.status(201).json({ message: 'Inquiry Created Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
