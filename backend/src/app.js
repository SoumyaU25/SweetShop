require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const sweetsRoutes = require('./routes/sweets');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;
