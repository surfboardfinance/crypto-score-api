// src/controllers/operationalController.js

const coinMarketCapService = require('../services/coinmarketcapService');
const lunarCrushService = require('../services/lunarcrushService');
const { scoringRange } = require('../config').analytics;

/**
 * Calculate the operational score for a given cryptocurrency project.
 * @param {string} projectId - The ID of the cryptocurrency project.
 * @returns {Promise<number>} - The calculated operational score (0-99).
 */
const calculateOperationalScore = async (projectId) => {
  try {
    // Fetch operational-related data from CoinMarketCap
    const teamProfile = await coinMarketCapService.getTeamProfile(projectId); // Hypothetical function
    const bugBountyData = await coinMarketCapService.getBugBountyData(projectId); // Hypothetical function

    // Fetch additional operational data from LunarCrush
    const operationalMetrics = await lunarCrushService.getOperationalMetrics(projectId); // Hypothetical function

    // Calculate operational metrics
    let operationalScore = 0;

    // Example calculations
    if (teamProfile.experience > 5) {
      operationalScore += 30; // Add points for experienced team members
    }

    if (bugBountyData.participants > 50) {
      operationalScore += 20; // Add points for a strong bug bounty program
    }

    if (operationalMetrics.milestonesAchieved > 3) {
      operationalScore += 25; // Add points for achieved milestones
    }

    if (operationalMetrics.communityEngagement > 70) {
      operationalScore += 24; // Add points for high community engagement
    }

    // Normalize the score to fit within the scoring range
    operationalScore = Math.min(operationalScore, scoringRange.max); // Ensure score doesn't exceed 99
    return operationalScore;
  } catch (error) {
    console.error('Error calculating operational score:', error);
    throw new Error('Failed to calculate operational score');
  }
};

module.exports = {
  calculateOperationalScore,
};
