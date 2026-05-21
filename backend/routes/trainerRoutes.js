const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
// const { getTraineesByTrainer } = require('../controllers/adminController');
const { verifyToken } = require('../middleware/authMiddleware');
const {listTrainees, addTrainee, createProject, getProjects, createProgram, getPrograms, updateProgram, getProgramDetails, getTraineesByProgram, getMyProjects, createTask, getTasksByProject, getProjectById, updateTask, deleteTask, markTaskCompleted, closeProject, updateProgramStatus, updateProjectStatus, updateProgramState, closeAll, uploadAttendance, uploadProjectReport, sendCompletionMail} = require('../controllers/trainerController');
// const { createProject } = require('../controllers/trainerProjectsController');
// const { getProfile } = require('../controllers/trainerController');

// router.get('/trainees', verifyToken, getTraineesByTrainer);
// router.get('/profile', verifyToken, getProfile)

// const nodemailer = require('nodemailer');





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure uploads/ folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.get('/trainees', verifyToken, listTrainees);
// router.post('/trainees', verifyToken, addTrainee)
router.post('/trainees', verifyToken, addTrainee);
router.get('/trainees/:programId', verifyToken, getTraineesByProgram);


router.post('/projects', verifyToken, createProject)
router.get('/projects/:programId', verifyToken, getProjects)

router.get('/project/:projectId', verifyToken, getProjectById);


// router.get('/projects', verifyToken, getProjects)

router.post('/create-program', verifyToken, createProgram)
router.get('/programs', verifyToken, getPrograms);
router.put('/programs/:id', verifyToken, updateProgram);

router.get('/programs/:programId', verifyToken, getProgramDetails);

router.post('/projects/:projectId/tasks', verifyToken, createTask);
router.get('/projects/:projectId/tasks', verifyToken, getTasksByProject);

router.put('/projects/:projectId/tasks/:taskId', verifyToken, updateTask);

router.delete('/projects/:projectId/tasks/:taskId', verifyToken, deleteTask);

router.put('/projects/:projectId/tasks/:taskId/complete', verifyToken, markTaskCompleted);

// trainerRoutes.js
router.put('/projects/:projectId/close', verifyToken, closeProject);


router.put('/programs/:programId/status', verifyToken, updateProgramStatus);

router.put("/project/:projectId/status", updateProjectStatus);

router.put("/program/:programId/status", updateProgramState)

// router.put('/programs/:programId/close-all-tasks', closeAll)

// trainerRoutes.js
router.post("/attendance/upload", upload.single("file"), uploadAttendance);

router.post("/projects/report/upload", upload.single("file"), uploadProjectReport);

router.post("/programs/send-mail", sendCompletionMail);



// router.post('/assign-project', verifyToken, assignProjectToTrainee)



module.exports = router;
