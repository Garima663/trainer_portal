const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const trainerRoutes = require('./routes/trainerRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const path = require("path");



app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trainer', trainerRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;
