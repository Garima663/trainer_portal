const { addTrainer, getAllTrainers } = require('../models/AdminModel');
const db = require('../models/db');

const createTrainer = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  addTrainer({ name, email, password }, (err, trainer) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Error creating trainer' });
    }
    res.status(201).json({ message: 'Trainer created', trainer });
  });
};

const listTrainers = (req, res) => {
  getAllTrainers((err, trainers) => {
    if (err) return res.status(500).json({ message: 'Error fetching trainers' });
    res.json(trainers);
  });
};


// const addTrainee = (req, res) => {
//   const { name, email, trainer_id } = req.body;
//   if (!name || !email || !trainer_id)
//     return res.status(400).json({ message: 'All fields are required' });

//   db.query(
//     'INSERT INTO trainees (name, email, trainer_id) VALUES (?, ?, ?)',
//     [name, email, trainer_id],
//     (err, result) => {
//       if (err) {
//         if (err.code === 'ER_DUP_ENTRY') {
//           return res.status(409).json({ message: 'Email already exists' });
//         }
//         return res.status(500).json({ message: 'Error adding trainee' });
//       }
//       res.status(201).json({ message: 'Trainee added successfully' });
//     }
//   );
// };

const getTraineesByTrainer = (req, res) => {
  const trainerId = req.user.id;
  db.query(
    'SELECT id, name, email FROM trainees WHERE trainer_id = ?',
    [trainerId],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching trainees' });
      res.json(results);
    }
  );
};

// const listTrainees = async (req,res)=> {
// try {
//     const [rows] = await db.promise().query(`
//       SELECT trainees.id, trainees.name, trainees.email, trainers.name AS trainer_name
//       FROM trainees
//       LEFT JOIN trainers ON trainees.trainer_id = trainers.id
//     `);
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching trainees' });
//   }
// }

const listProgram = (req,res)=> {
db.query('SELECT * FROM programs ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
}

const addProgram = (req,res)=> {
   const { type, description, duration } = req.body;
  if (!type || !description || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query(
    'INSERT INTO programs (type, description, duration) VALUES (?, ?, ?)',
    [type, description, duration],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error inserting program' });
      res.status(201).json({ message: 'Program created successfully' });
    }
  );
}


module.exports = { createTrainer, listTrainers, getTraineesByTrainer, listProgram, addProgram };
