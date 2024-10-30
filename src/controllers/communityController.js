// src/controllers/communityController.js

const coinMarketCapService = require('../services/coinmarketcapService');
const lunarCrushService = require('../services/lunarcrushService');
const { scoringRange } = require('../config').analytics;

/**
 * Calculate the community score for a given cryptocurrency project.
 * @param {string} projectId - The ID of the cryptocurrency project.
 * @returns {Promise<number>} - The calculated community score (0-99).
 */
const calculateCommunityScore = async (projectId) => {
  try {
    // Fetch community-related data from CoinMarketCap
    const socialData = await coinMarketCapService.getSocialMetrics(projectId); // Hypothetical function

    // Fetch additional community data from LunarCrush
    const communityEngagement = await lunarCrushService.getCommunityEngagement(projectId); // Hypothetical function

    // Calculate community metrics
    let communityScore = 0;

    // Example calculations
    if (socialData.twitterFollowers > 10000) {
      communityScore += 30; // Add points for a large Twitter following
    }

    if (socialData.telegramMembers > 5000) {
      communityScore += 20; // Add points for a large Telegram community
    }

    if (communityEngagement.activityRate > 70) {
      communityScore += 25; // Add points for high activity rate
    }

    if (communityEngagement.sentimentScore > 75) {
      communityScore += 24; // Add points for positive community sentiment
    }

    // Normalize the score to fit within the scoring range
    communityScore = Math.min(communityScore, scoringRange.max); // Ensure score doesn't exceed 99
    return communityScore;
  } catch (error) {
    console.error('Error calculating community score:', error);
    throw new Error('Failed to calculate community score');
  }
};

module.exports = {
  calculateCommunityScore,
};
