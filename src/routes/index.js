// src/routes/index.js

const express = require('express');
const apiRoutes = require('./apiRoutes');

const router = express.Router();

// Use API routes
router.use('/api', apiRoutes);

// Optionally, you can define additional routes or middleware here

// Catch-all route for 404 errors
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = router;
