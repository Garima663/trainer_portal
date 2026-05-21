const express = require('express');
const router = express.Router();
const { createTrainer, listTrainers, listProgram, addProgram } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/trainers', verifyToken, isAdmin, createTrainer);
router.get('/trainers', verifyToken, isAdmin, listTrainers);
// router.post('/trainees', verifyToken, isAdmin, addTrainee)
// router.get('/trainees', verifyToken, isAdmin, listTrainees)
router.get('/programs', verifyToken, isAdmin, listProgram )
router.post('/programs', verifyToken, isAdmin, addProgram)

module.exports = router;
