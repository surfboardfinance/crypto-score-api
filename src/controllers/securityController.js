// src/controllers/securityController.js

const coinMarketCapService = require('../services/coinmarketcapService');
const lunarCrushService = require('../services/lunarcrushService');
const { scoringRange } = require('../config').analytics;

/**
 * Calculate the security score for a given cryptocurrency project.
 * @param {string} projectId - The ID of the cryptocurrency project.
 * @returns {Promise<number>} - The calculated security score (0-99).
 */
const calculateSecurityScore = async (projectId) => {
  try {
    // Fetch security-related data from CoinMarketCap
    const projectData = await coinMarketCapService.getProjectData(projectId);
    const bugBountyData = await coinMarketCapService.getBugBountyData(projectId); // Hypothetical function

    // Fetch data from LunarCrush
    const communityData = await lunarCrushService.getCommunityData(projectId); // Hypothetical function

    // Calculate security metrics
    let securityScore = 0;

    // Example calculations
    if (projectData.isAudited) {
      securityScore += 30; // Add points for being audited
    }

    if (bugBountyData.participants > 50) {
      securityScore += 20; // Add points for a strong bug bounty program
    }

    if (communityData.securityAwareness > 75) {
      securityScore += 25; // Add points for high community security awareness
    }

    // Normalize the score to fit within the scoring range
    securityScore = Math.min(securityScore, scoringRange.max); // Ensure score doesn't exceed 99
    return securityScore;
  } catch (error) {
    console.error('Error calculating security score:', error);
    throw new Error('Failed to calculate security score');
  }
};

module.exports = {
  calculateSecurityScore,
};
