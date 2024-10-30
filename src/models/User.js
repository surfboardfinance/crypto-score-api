// src/models/User.js

const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure each username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email is unique
  },
  password: {
    type: String,
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
  lastLogin: {
    type: Date, // Track the last login time
  },
  roles: {
    type: [String], // Array to hold user roles (e.g., admin, user)
    default: ['user'], // Default role is 'user'
  },
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
