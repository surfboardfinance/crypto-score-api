// src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env; // Use a strong secret key from .env

/**
 * Middleware to authenticate a user based on JWT token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token or user not found.' });
    }

    // Attach user to request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized access.' });
  }
};

module.exports = authMiddleware;
