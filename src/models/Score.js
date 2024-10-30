// src/models/Score.js

const mongoose = require('mongoose');

// Define the schema for the Score model
const scoreSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Project model
    required: true,
    ref: 'Project', // Ensure this references the Project model
  },
  securityScore: {
    type: Number,
    required: true,
  },
  operationalScore: {
    type: Number,
    required: true,
  },
  governanceScore: {
    type: Number,
    required: true,
  },
  communityScore: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Set default update date
  },
});

// Create the Score model using the schema
const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
