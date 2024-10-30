// src/utils/validationUtils.js

/**
 * Validate if a string is a valid email format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate if a string is a valid URL format.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
const isValidUrl = (url) => {
  const urlRegex = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

/**
 * Validate if a number is within a specified range.
 * @param {number} value - The number to validate.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {boolean} - True if within range, false otherwise.
 */
const isInRange = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Validate if an object has all required fields.
 * @param {Object} obj - The object to validate.
 * @param {Array<string>} requiredFields - The required fields to check.
 * @returns {boolean} - True if all required fields are present, false otherwise.
 */
const hasRequiredFields = (obj, requiredFields) => {
  return requiredFields.every(field => obj.hasOwnProperty(field));
};

module.exports = {
  isValidEmail,
  isValidUrl,
  isInRange,
  hasRequiredFields,
};
