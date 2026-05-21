const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
// const { getUserByEmail } = require('../models/UserModel');

// const login = (req, res) => {
//   const { email, password, role } = req.body;

//   getUserByEmail(email, role, (err, user) => {
//     if (err || !user) return res.status(401).json({ message: 'Invalid credentials' });

//     bcrypt.compare(password, user.password_hash, (err, isMatch) => {
//       if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//       const token = jwt.sign(
//         { id: user.id, role },
//         process.env.JWT_SECRET,
//         { expiresIn: '1d' }
//       );

//       res.json({ token, role });
//     });
//   });
// };

const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const table = role === 'admin' ? 'admins' : 'trainers';
    const [rows] = await db.promise().query(`SELECT * FROM ${table} WHERE email = ?`, [email]);

    if (rows.length === 0) return res.status(400).json({ message: 'Invalid email' });

    const user = rows[0];
    const passwordHashField = role === 'admin' ? 'password_hash' : 'password_hash';

    const isMatch = await bcrypt.compare(password, user[passwordHashField]);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET);
    res.json({ token, role });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { login };
