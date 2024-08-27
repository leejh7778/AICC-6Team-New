const database = require('../database/database');

exports.updateCompletedTask = async (req, res) => {
  const { isCompleted, itemId } = req.body;
  try {
    const result = await database.query(
      'UPDATE task SET iscompleted = $1 WHERE _id = $2',
      [isCompleted, itemId]
    );
    return res.status(200).json({ message: 'Task Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Update Completed Fail' + error });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, date, isCompleted, isImportant, id } = req.body;
  try {
    const result = await database.query(
      'UPDATE task SET title = $1, description = $2, date = $3, iscompleted = $4, isimportant = $5 WHERE _id = $6',
      [title, description, date, isCompleted, isImportant, id]
    );
    return res.status(200).json({ message: 'Task Updated Successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Update Completed Fail' + error });
  }
};
