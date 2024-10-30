// tests/unit/operationalController.test.js

const operationalController = require('../../src/controllers/operationalController');
const coinMarketCapService = require('../../src/services/coinmarketcapService');
const lunarCrushService = require('../../src/services/lunarcrushService');

// Mock the services used in the operationalController
jest.mock('../../src/services/coinmarketcapService');
jest.mock('../../src/services/lunarcrushService');

describe('Operational Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid interference
  });

  it('should calculate operational score correctly when all conditions are met', async () => {
    // Mock the service responses
    coinMarketCapService.getTeamProfile.mockResolvedValue({
      experience: 6, // More than 5 years of experience
    });

    coinMarketCapService.getBugBountyData.mockResolvedValue({
      participants: 100, // More than 50 participants
    });

    lunarCrushService.getOperationalMetrics.mockResolvedValue({
      milestonesAchieved: 4, // More than 3 milestones
      communityEngagement: 80, // More than 70 engagement
    });

    const score = await operationalController.calculateOperationalScore('projectId');

    expect(score).toBeLessThanOrEqual(99); // Ensure score does not exceed 99
    expect(score).toBeGreaterThanOrEqual(75); // Check that score is correctly calculated
  });

  it('should calculate operational score correctly when conditions are not met', async () => {
    // Mock the service responses
    coinMarketCapService.getTeamProfile.mockResolvedValue({
      experience: 3, // Less than 5 years of experience
    });

    coinMarketCapService.getBugBountyData.mockResolvedValue({
      participants: 30, // Less than 50 participants
    });

    lunarCrushService.getOperationalMetrics.mockResolvedValue({
      milestonesAchieved: 2, // Less than 3 milestones
      communityEngagement: 60, // Less than 70 engagement
    });

    const score = await operationalController.calculateOperationalScore('projectId');

    expect(score).toBe(0); // When no conditions are met, the score should be 0
  });

  it('should handle errors from service calls gracefully', async () => {
    // Mock a service call to throw an error
    coinMarketCapService.getTeamProfile.mockRejectedValue(new Error('Service error'));

    await expect(operationalController.calculateOperationalScore('projectId')).rejects.toThrow('Failed to calculate operational score');
  });
});
