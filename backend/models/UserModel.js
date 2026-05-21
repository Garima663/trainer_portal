const db = require('./db');

function getUserByEmail(email, role, callback) {
  // Decide which table to query based on role
  const table = role === 'admin' ? 'admins' : 'trainers';

  const query = `SELECT * FROM ${table} WHERE email = ? LIMIT 1`;
  db.query(query, [email], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    return callback(null, results[0]);
  });
}

module.exports = { getUserByEmail };
