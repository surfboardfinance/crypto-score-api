// tests/unit/securityController.test.js

const securityController = require('../../src/controllers/securityController');
const coinMarketCapService = require('../../src/services/coinmarketcapService');
const lunarCrushService = require('../../src/services/lunarcrushService');

// Mock the services used in the securityController
jest.mock('../../src/services/coinmarketcapService');
jest.mock('../../src/services/lunarcrushService');

describe('Security Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid interference
  });

  it('should calculate security score correctly when all conditions are met', async () => {
    // Mock the service responses
    coinMarketCapService.getProjectData.mockResolvedValue({
      isAudited: true,
    });

    coinMarketCapService.getBugBountyData.mockResolvedValue({
      participants: 100, // More than 50 participants
    });

    lunarCrushService.getCommunityData.mockResolvedValue({
      securityAwareness: 80, // More than 75 security awareness
    });

    const score = await securityController.calculateSecurityScore('projectId');

    expect(score).toBeLessThanOrEqual(99); // Ensure score does not exceed 99
    expect(score).toBeGreaterThanOrEqual(75); // Check that score is correctly calculated
  });

  it('should calculate security score correctly when conditions are not met', async () => {
    // Mock the service responses
    coinMarketCapService.getProjectData.mockResolvedValue({
      isAudited: false,
    });

    coinMarketCapService.getBugBountyData.mockResolvedValue({
      participants: 30, // Less than 50 participants
    });

    lunarCrushService.getCommunityData.mockResolvedValue({
      securityAwareness: 60, // Less than 75 security awareness
    });

    const score = await securityController.calculateSecurityScore('projectId');

    expect(score).toBe(0); // When no conditions are met, the score should be 0
  });

  it('should handle errors from service calls gracefully', async () => {
    // Mock a service call to throw an error
    coinMarketCapService.getProjectData.mockRejectedValue(new Error('Service error'));

    await expect(securityController.calculateSecurityScore('projectId')).rejects.toThrow('Failed to calculate security score');
  });
});
