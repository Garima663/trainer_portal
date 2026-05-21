const bcrypt = require('bcryptjs');
const db = require('./models/db');

const name = 'Garima';
const email = 'garima@example.com';
const password = '123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;

  const query = 'INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)';
  db.query(query, [name, email, hash], (err, result) => {
    if (err) throw err;
    console.log('Admin inserted successfully!');
    process.exit();
  });
});
