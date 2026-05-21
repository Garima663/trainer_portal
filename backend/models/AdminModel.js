const db = require('./db');
const bcrypt = require('bcryptjs');

const addTrainer = (trainer, callback) => {
  const { name, email, password } = trainer;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);

    db.query(
      'INSERT INTO trainers (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, hash],
      (err, result) => {
        if (err) return callback(err);
        callback(null, { id: result.insertId, name, email });
      }
    );
  });
};

const getAllTrainers = (callback) => {
  db.query('SELECT id, name, email FROM trainers', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = { addTrainer, getAllTrainers };
