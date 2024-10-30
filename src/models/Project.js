// src/models/Project.js

const mongoose = require('mongoose');

// Define the schema for the Project model
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true, // Ensure each symbol is unique
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  socialLinks: {
    twitter: {
      type: String,
    },
    telegram: {
      type: String,
    },
    discord: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Set default update date
  },
  securityScore: {
    type: Number,
    default: 0, // Default score
  },
  operationalScore: {
    type: Number,
    default: 0, // Default score
  },
  governanceScore: {
    type: Number,
    default: 0, // Default score
  },
  communityScore: {
    type: Number,
    default: 0, // Default score
  },
});

// Create the Project model using the schema
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
