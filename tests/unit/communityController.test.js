// tests/unit/communityController.test.js

const communityController = require('../../src/controllers/communityController');
const coinMarketCapService = require('../../src/services/coinmarketcapService');
const lunarCrushService = require('../../src/services/lunarcrushService');

// Mock the services used in the communityController
jest.mock('../../src/services/coinmarketcapService');
jest.mock('../../src/services/lunarcrushService');

describe('Community Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid interference
  });

  it('should calculate community score correctly when all conditions are met', async () => {
    // Mock the service responses
    coinMarketCapService.getSocialMetrics.mockResolvedValue({
      twitterFollowers: 15000, // More than 10,000 Twitter followers
      telegramMembers: 6000, // More than 5,000 Telegram members
    });

    lunarCrushService.getCommunityEngagement.mockResolvedValue({
      activityRate: 80, // More than 70% activity rate
      sentimentScore: 85, // More than 75 sentiment score
    });

    const score = await communityController.calculateCommunityScore('projectId');

    expect(score).toBeLessThanOrEqual(99); // Ensure score does not exceed 99
    expect(score).toBeGreaterThanOrEqual(75); // Check that score is correctly calculated
  });

  it('should calculate community score correctly when conditions are not met', async () => {
    // Mock the service responses
    coinMarketCapService.getSocialMetrics.mockResolvedValue({
      twitterFollowers: 8000, // Less than 10,000 Twitter followers
      telegramMembers: 4000, // Less than 5,000 Telegram members
    });

    lunarCrushService.getCommunityEngagement.mockResolvedValue({
      activityRate: 60, // Less than 70% activity rate
      sentimentScore: 50, // Less than 75 sentiment score
    });

    const score = await communityController.calculateCommunityScore('projectId');

    expect(score).toBe(0); // When no conditions are met, the score should be 0
  });

  it('should handle errors from service calls gracefully', async () => {
    // Mock a service call to throw an error
    coinMarketCapService.getSocialMetrics.mockRejectedValue(new Error('Service error'));

    await expect(communityController.calculateCommunityScore('projectId')).rejects.toThrow('Failed to calculate community score');
  });
});
