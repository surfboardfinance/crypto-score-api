// src/utils/scoringUtils.js

/**
 * Normalize a score to fit within a specified range.
 * @param {number} score - The score to normalize.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} - The normalized score.
 */
const normalizeScore = (score, min, max) => {
  if (score < min) return min;
  if (score > max) return max;
  return score;
};

/**
 * Calculate the weighted score based on individual scores and their weights.
 * @param {Object} scores - An object containing individual scores.
 * @param {Object} weights - An object containing weights for each score.
 * @returns {number} - The calculated weighted score.
 */
const calculateWeightedScore = (scores, weights) => {
  let totalScore = 0;
  let totalWeight = 0;

  for (const key in scores) {
    if (scores.hasOwnProperty(key) && weights[key]) {
      totalScore += scores[key] * weights[key]; // Multiply score by its weight
      totalWeight += weights[key]; // Sum of weights
    }
  }

  return totalWeight > 0 ? totalScore / totalWeight : 0; // Avoid division by zero
};

/**
 * Generate a final score based on various metrics.
 * @param {Object} metrics - An object containing different metrics for scoring.
 * @returns {number} - The final score (normalized to 0-99).
 */
const generateFinalScore = (metrics) => {
  const { securityScore, operationalScore, governanceScore, communityScore } = metrics;

  // Define weights for each score type
  const weights = {
    securityScore: 0.4, // 40% weight for security
    operationalScore: 0.3, // 30% weight for operational
    governanceScore: 0.2, // 20% weight for governance
    communityScore: 0.1, // 10% weight for community
  };

  // Calculate weighted score
  const weightedScore = calculateWeightedScore(metrics, weights);

  // Normalize the final score to be within the range of 0-99
  return normalizeScore(weightedScore, 0, 99);
};

module.exports = {
  normalizeScore,
  calculateWeightedScore,
  generateFinalScore,
};
