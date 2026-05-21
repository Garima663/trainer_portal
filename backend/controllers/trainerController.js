const db = require('../models/db');

// const getProfile = async (req,res) => {
//     const trainerId = req.user.id;

//   try {
//     const [rows] = await db.promise().query(
//       'SELECT id, name, email FROM trainers WHERE id = ?',
//       [trainerId]
//     );
//     if (rows.length === 0) return res.status(404).json({ message: 'Trainer not found' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching trainer profile' });
//   }
// }

// module.exports = {getProfile}





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
const sendMail = require('../utils/mailer');


const listTrainees = async (req,res)=> {
   const trainerId = req.user.id;

  try {
    const [rows] = await db.promise().query(
      'SELECT id, name, email, program_id, attendance_file FROM trainees WHERE trainer_id = ?',
      [trainerId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching trainees:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// const addTrainee =  (req,res) => {
//   const trainerId = req.user.id;
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ message: 'Name and email required' });
//   }

//   try {
//     db.query(
//       'INSERT INTO trainees (name, email, trainer_id) VALUES (?, ?, ?)',
//       [name, email, trainerId]
//     );
//     res.status(201).json({ message: 'Trainee added successfully' });
//   } catch (err) {
//     console.error('Error adding trainee:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


// const newDeadline = async (req,res) => {
//   const { taskId } = req.params;
//   const { newDeadline } = req.body;

//   if (!newDeadline) {
//     return res.status(400).json({ message: 'New deadline required.' });
//   }

//   try {
//     const [task] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
//     if (!task.length) return res.status(404).json({ message: 'Task not found' });

//     await db.query('UPDATE tasks SET deadline = ? WHERE id = ?', [newDeadline, taskId]);

//     res.json({ message: 'Deadline extended successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

// const certificateReq = async (req,res) => {
// const { traineeId, programId } = req.body;

//   if (!traineeId || !programId) {
//     return res.status(400).json({ message: 'Trainee ID and Program ID required' });
//   }

//   try {
//     const [[trainee]] = await db.query('SELECT name, email FROM trainees WHERE id = ?', [traineeId]);
//     const [[program]] = await db.query('SELECT type, description FROM programs WHERE id = ?', [programId]);

//     if (!trainee || !program) {
//       return res.status(404).json({ message: 'Trainee or program not found' });
//     }

//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // Or another SMTP provider
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.HR_EMAIL,
//       subject: `Internship Completion Certificate Request for ${trainee.name}`,
//       text: `
// Dear HR Team,

// Trainer ${req.trainer.name} requests a certificate for the following trainee:

// Name: ${trainee.name}
// Email: ${trainee.email}
// Program: ${program.type}
// Description: ${program.description}

// Please initiate the certificate generation process.

// Regards,
// Internship Portal
//       `,
//     });

//     res.json({ message: 'Certificate request sent to HR successfully.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to send email' });
//   }
// }

// const createProject = async (req, res) => {
//   const { title, description, type } = req.body;
//   const trainer_id = req.user.id;

//   try {
//     const [result] = await db.execute(
//       `INSERT INTO projects (title, description, type, trainer_id) VALUES (?, ?, ?, ?)`,
//       [title, description, type, trainer_id]
//     );
//     res.json({ message: 'Project created', projectId: result.insertId });
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating project' });
//   }
// };

// const assignTrainees = async (req, res) => {
//   const { trainee_ids } = req.body;
//   const { projectId } = req.params;

//   try {
//     const values = trainee_ids.map(id => [projectId, id]);
//     await db.query('INSERT INTO project_trainees (project_id, trainee_id) VALUES ?', [values]);
//     res.json({ message: 'Trainees assigned' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error assigning trainees' });
//   }
// };

// const addTask = async (req, res) => {
//   const { name, deadline } = req.body;
//   const { projectId } = req.params;

//   try {
//     await db.execute(
//       `INSERT INTO project_tasks (project_id, name, deadline) VALUES (?, ?, ?)`,
//       [projectId, name, deadline]
//     );
//     res.json({ message: 'Task added' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error adding task' });
//   }
// };

// const updateDeadline = async (req, res) => {
//   const { taskId } = req.params;
//   const { newDeadline } = req.body;

//   try {
//     await db.execute(
//       `UPDATE project_tasks SET deadline = ? WHERE id = ?`,
//       [newDeadline, taskId]
//     );
//     res.json({ message: 'Deadline updated' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating deadline' });
//   }
// };

// const sendCertificateRequest = async (req, res) => {
//   const { traineeId } = req.params;

//   try {
//     const [traineeRows] = await db.execute('SELECT * FROM trainees WHERE id = ?', [traineeId]);
//     const trainee = traineeRows[0];

//     if (!trainee) return res.status(404).json({ message: 'Trainee not found' });

//     // Send email to HR
//     await sendMail({
//       to: 'hr@example.com',
//       subject: 'Internship Completion Certificate Request',
//       html: `<p>Trainer ${req.user.name} requests certificate for ${trainee.name} (${trainee.email}).</p>`
//     });

//     res.json({ message: 'Certificate request sent to HR' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to send certificate request' });
//   }
// };


// controller/trainerController.js

// const createProject = (req, res) => {
//   // const trainer_id = req.user.id;
//   const { title, description, programId, trainer_id,status } = req.body;
//   // const projectStatus = status || 'Active';
//   // if (!title || !description || !type) {
//   //   return res.status(400).json({ message: 'All fields are required.' });
//   // }

//    if (!title || !programId) {
//     return res.status(400).json({ message: 'Title and Program ID are required.' });
//   }

//   const sql = `
//     INSERT INTO projects (title, description, program_id,created_by,status)
//     VALUES (?, ?, ?)
//   `;

//   db.execute(sql, [title, description, programId, trainer_id, status], (err, result) => {
//     if (err) {
//       console.error('Error creating project:', err);
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//     res.status(201).json({ message: 'Project created successfully', projectId: result.insertId });
//   });
// };

const createProject = (req, res) => {
  const trainer_id = req.user.id; 
  const { title, description, programId, status } = req.body;

  if (!title || !programId || !trainer_id) {
    return res.status(400).json({ message: 'Title, Program ID, and Trainer ID are required.' });
  }

  const sql = `
    INSERT INTO projects (title, description, program_id, created_by, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.execute(sql, [title, description, programId, trainer_id, status || 'Active'], (err, result) => {
    if (err) {
      console.error('Error creating project:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(201).json({ message: 'Project created successfully', projectId: result.insertId });
  });
};



// const getProjects = (req, res) => {
//   const trainer_id = req.user.id;

//   db.execute(
//     'SELECT id, title, description, type, created_at FROM projects WHERE trainer_id = ? ORDER BY created_at DESC',
//     [trainer_id],
//     (err, results, fields) => {
//       if (err) {
//         console.error('Error fetching projects:', err);
//         return res.status(500).json({ message: 'Internal server error' });
//       }

//       console.log('Projects fetched successfully:', results);
//       res.json(results); // send the result array directly
//     }
//   );
// };

const getProjects = (req,res)=> {
  const programId = req.params.programId;

  db.query(
    `SELECT * FROM projects WHERE program_id = ?`,
    [programId],
    (err, results) => {
      if (err) {
        console.error('Error fetching projects:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    }
  );
}

const getProjectById = (req, res) => {
  const { projectId } = req.params;

  db.query('SELECT * FROM projects WHERE id = ?', [projectId], (err, results) => {
    if (err) {
      console.error('Error fetching project:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(results[0]); // Return the project object directly
  });
};


// const assignProjectToTrainee = async (req, res) => {
//   const { projectId, traineeId } = req.body;

//   try {
//     await db.execute(
//       'INSERT INTO trainee_projects (trainee_id, project_id) VALUES (?, ?)',
//       [traineeId, projectId]
//     );
//     res.status(200).json({ message: 'Project assigned successfully' });
//   } catch (err) {
//     console.error('Error assigning project:', err);
//     res.status(500).json({ message: 'Failed to assign project' });
//   }
// };


const createProgram = (req,res) => {
  const { title, startDate, endDate, internshipType, status } = req.body;
  const trainer_id = req.user.id;

  try {
     db.query(
      'INSERT INTO trainer_programs (trainer_id, title, start_date, end_date, internship_type, status) VALUES (?, ?, ?, ?, ?, ?)',
      [trainer_id, title, startDate, endDate, internshipType, status || 'pending']
    );
    res.status(201).json({ message: 'Internship program created successfully' });
  } catch (err) {
    console.error('Error creating internship program:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getPrograms = (req, res) => {
  const trainer_id = req.user.id;

  db.query(
    'SELECT * FROM trainer_programs WHERE trainer_id = ? ORDER BY start_date DESC',
    [trainer_id],
    (err, results) => {
      if (err) {
        console.error('Error fetching programs:', err);
        return res.status(500).json({ error: 'Failed to fetch programs' });
      }

      res.json(results); // `results` is the array of programs
    }
  );
};


const updateProgram = (req, res) => {
  const programId = req.params.id;
  const trainerId = req.user.id;
  const { title, start_date, end_date, internship_type, status } = req.body;

  db.query(
    `UPDATE trainer_programs 
     SET title = ?, start_date = ?, end_date = ?, internship_type = ?, status = ?
     WHERE id = ? AND trainer_id = ?`,
    [title, start_date, end_date, internship_type, status, programId, trainerId],
    (err, result) => {
      if (err) {
        console.error("Error updating program:", err);
        return res.status(500).json({ error: "Failed to update program" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Program not found or not authorized" });
      }

      res.json({ message: "Program updated successfully" });
    }
  );
};


const getProgramDetails = (req, res) => {
  const programId = req.params.programId;

  const query = `
    SELECT p.*, t.name AS trainer_name 
    FROM trainer_programs p
    JOIN trainers t ON p.trainer_id = t.id
    WHERE p.id = ?
  `;

  db.query(query, [programId], (err, result) => {
    if (err) {
      console.error('Error fetching program detail:', err);
      return res.status(500).json({ error: 'Failed to fetch program detail' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Program not found' });
    }

    res.json(result[0]);
  });
};


const addTrainee = (req, res) => {
  const { name, email, program_id } = req.body;
  const trainer_id = req.user.id;

  const query = 'INSERT INTO trainees (name, email, trainer_id, program_id) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, trainer_id, program_id], (err, result) => {
    if (err) {
      console.error('Error creating trainee:', err);
      return res.status(500).json({ error: 'Failed to create trainee' });
    }
    res.status(201).json({ message: 'Trainee created successfully' });
  });
};

const getTraineesByProgram = (req, res) => {
  const { programId } = req.params;
  const query = 'SELECT * FROM trainees WHERE program_id = ?';
  db.query(query, [programId], (err, result) => {
    if (err) {
      console.error('Error fetching trainees:', err);
      return res.status(500).json({ error: 'Failed to fetch trainees' });
    }
    res.json(result);
  });
};



// CREATE a task under a project
const createTask = async (req, res) => {
  const { projectId } = req.params;
  const { title, deadline } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({ message: 'Title and deadline are required.' });
  }

  try {
    const [result] = await db.promise().execute(
      'INSERT INTO tasks (project_id, title, deadline) VALUES (?, ?, ?)',
      [projectId, title, deadline]
    );

    res.status(201).json({
      message: 'Task created successfully',
      taskId: result.insertId,
    });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET all tasks under a project
const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const [rows] = await db.promise().execute(
      'SELECT id, title, deadline, status FROM tasks WHERE project_id = ? ORDER BY deadline ASC',
      [projectId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const updateTask = (req, res) => {
  const { projectId, taskId } = req.params;
  const { title, deadline } = req.body;

  db.query(
    `UPDATE tasks SET title = ?, deadline = ? WHERE id = ? AND project_id = ?`,
    [title, deadline, taskId, projectId],
    (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.json({ message: 'Task updated successfully' });
    }
  );
};


const deleteTask = (req, res) => {
  const { taskId } = req.params;

  db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
};



const markTaskCompleted = (req, res) => {
  const { projectId, taskId } = req.params;

  db.query(
    `UPDATE tasks SET status = 'completed' WHERE id = ? AND project_id = ?`,
    [taskId, projectId],
    (err, result) => {
      if (err) {
        console.error('Error updating task status:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Task marked as completed' });
    }
  );
};


// trainerController.js
const closeProject = (req, res) => {
  const { projectId } = req.params;

  // Step 1: Update project status
  db.query(`UPDATE projects SET status = 'Completed' WHERE id = ?`, [projectId], (err, result) => {
    if (err) {
      console.error("Error closing project:", err);
      return res.status(500).json({ message: 'Failed to close project' });
    }

    // Step 2: Get the program ID for this project
    db.query(`SELECT program_id FROM projects WHERE id = ?`, [projectId], (err, project) => {
      if (err) {
        console.error("Error fetching project:", err);
        return res.status(500).json({ message: 'Failed to fetch project details' });
      }

      if (!project.length) {
        return res.status(404).json({ message: 'Project not found' });
      }

      const programId = project[0].program_id;

      // Step 3: Check if all projects under this program are completed
      db.query(
        `SELECT COUNT(*) AS count FROM projects WHERE program_id = ? AND status != 'Completed'`,
        [programId],
        (err, remaining) => {
          if (err) {
            console.error("Error checking remaining projects:", err);
            return res.status(500).json({ message: 'Failed to check project status' });
          }

          // Step 4: If no remaining projects, update program status
          if (remaining[0].count === 0) {
            db.query(
              `UPDATE trainer_programs SET status = 'Completed' WHERE id = ?`,
              [programId],
              (err, result) => {
                if (err) {
                  console.error("Error updating program status:", err);
                  return res.status(500).json({ message: 'Failed to update program status' });
                }
                return res.json({ message: 'Project and program closed successfully' });
              }
            );
          } else {
            return res.json({ message: 'Project closed successfully' });
          }
        }
      );
    });
  });
};



const updateProgramStatus = (req, res) => {
  const { programId } = req.params;
  const { status } = req.body;

  // Update the program status
  db.query(
    `UPDATE trainer_programs SET status = ? WHERE id = ?`,
    [status, programId],
    (err, result) => {
      if (err) {
        console.error("Error updating program status:", err);
        return res.status(500).json({ message: 'Failed to update program status' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Program not found' });
      }
      res.json({ message: 'Program status updated successfully' });
    }
  );
};


const updateProjectStatus = (req, res) => {
  const { projectId } = req.params;
  const { status } = req.body;

  const sql = "UPDATE projects SET status = ? WHERE id = ?";
  db.query(sql, [status, projectId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Project status updated" });
  });
};


// const updateProgramState = async (req, res) => {
//   const { programId } = req.params;
//   const { status } = req.body;

//   try {
//     const [result] = db.query(
//       "UPDATE trainer_programs SET status = ? WHERE id = ?",
//       [status, programId]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Program not found" });
//     }

//     res.json({ message: "Program status updated successfully" });
//   } catch (err) {
//     console.error("Error updating program status:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


const updateProgramState = (req, res) => {
  const { programId } = req.params;
  const { status } = req.body;

  const sql = "UPDATE trainer_programs SET status = ? WHERE id = ?";

  db.query(sql, [status, programId], (err, result) => {
    if (err) {
      console.error("Error updating program status:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.json({ message: "Program status updated successfully" });
  });
};





// const uploadAttendance = (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   const filePath =  `/uploads/${req.file.filename}`;
//   const { programId } = req.body;

//   const sql = "UPDATE trainees SET attendance_file = ? WHERE program_id = ?";
//   db.query(sql, [filePath, programId], (err, result) => {
//     if (err) {
//       console.error("Error uploading attendance:", err);
//       return res.status(500).json({ message: "Error uploading attendance" });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "No trainees found for this program" });
//     }

//     res.json({
//       message: "Attendance uploaded successfully",
//       updated: result.affectedRows,
//     });
//   });
// };




// Upload Attendance for a single trainee
const uploadAttendance = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = "/uploads/" + req.file.filename;  // save relative path
  const { traineeId } = req.body;  // ⬅️ now expecting traineeId

  db.query(
    "UPDATE trainees SET attendance_file = ? WHERE id = ?",
    [filePath, traineeId],
    (err, result) => {
      if (err) {
        console.error("Error updating attendance:", err);
        return res.status(500).json({ message: "Error uploading attendance" });
      }

      res.json({
        message: "Attendance uploaded successfully",
        updated: result.affectedRows,
        filePath: filePath   // ⬅️ return updated path to frontend
      });
    }
  );
};




// Upload Project Report for a project
const uploadProjectReport = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = "/uploads/" + req.file.filename;
    const { projectId } = req.body;

    db.query(
      "UPDATE projects SET project_report_file = ? WHERE id = ?",
      [filePath, projectId],
      (err, result) => {
        if (err) {
          console.error("Error uploading project report:", err);
          return res.status(500).json({ message: "Error uploading project report" });
        }
        res.json({ message: "Project report uploaded successfully" });
      }
    );
  } catch (error) {
    console.error("Error uploading project report:", error);
    res.status(500).json({ message: "Error uploading project report" });
  }
};






// Send completion request to HR
const path = require("path");
const nodemailer = require("nodemailer");

const sendCompletionMail = async (req, res) => {
  try {
    const { programId } = req.body;

    // 1. Get trainees
    const [trainees] = await db.promise().query(
      "SELECT id, name, email, attendance_file FROM trainees WHERE program_id = ?",
      [programId]
    );

    // 2. Get project reports
    const [projects] = await db.promise().query(
      "SELECT project_report_file FROM projects WHERE program_id = ?",
      [programId]
    );

    // Build attachments
    const attachments = [];

    trainees.forEach((t) => {
      if (t.attendance_file) {
        attachments.push({
          filename: `${t.name}_attendance.xlsx`,
          path: path.join(__dirname, "..", t.attendance_file),
        });
      }
    });

    projects.forEach((p, idx) => {
      if (p.project_report_file) {
        attachments.push({
          filename: `project_${idx + 1}_report.pdf`,
          path: path.join(__dirname, "..", p.project_report_file),
        });
      }
    });

    // Mail transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "srivastavagarima226@gmail.com",
        pass: "wnax fbvl jccg hnvb",
      },
    });

    await transporter.sendMail({
      from: '"Trainer Portal" <garimafaridabad@gmail.com>',
      to: "garimafaridabad@gmail.com",
      subject: `Certificate Request for Program ${programId}`,
      text: `Dear HR,\n\nThe training program (ID: ${programId}) has been completed.\nPlease generate completion certificates for all trainees.\n\nRegards,\nTrainer Team`,
      attachments,
    });

    res.json({ message: "Mail sent successfully to HR" });
  } catch (error) {
    console.error("Error sending mail:", error);
    res.status(500).json({ message: "Error sending mail" });
  }
};







 module.exports = {listTrainees, addTrainee, createProject, 
  getProjects, createProgram, getPrograms, updateProgram, 
  getProgramDetails, getTraineesByProgram, getTasksByProject, 
  createTask, getProjectById, updateTask, deleteTask, markTaskCompleted,
closeProject, updateProgramStatus, updateProjectStatus, 
updateProgramState, uploadAttendance, uploadProjectReport, sendCompletionMail}



