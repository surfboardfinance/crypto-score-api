// tests/unit/governanceController.test.js

const governanceController = require('../../src/controllers/governanceController');
const coinMarketCapService = require('../../src/services/coinmarketcapService');
const lunarCrushService = require('../../src/services/lunarcrushService');

// Mock the services used in the governanceController
jest.mock('../../src/services/coinmarketcapService');
jest.mock('../../src/services/lunarcrushService');

describe('Governance Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid interference
  });

  it('should calculate governance score correctly when all conditions are met', async () => {
    // Mock the service responses
    coinMarketCapService.getTokenHolderAnalysis.mockResolvedValue({
      holderCount: 1500, // More than 1000 holders
    });

    coinMarketCapService.getPricingData.mockResolvedValue({
      volume: 2000000, // More than 1,000,000 in trading volume
    });

    lunarCrushService.getGovernanceMetrics.mockResolvedValue({
      decentralization: 80, // More than 75 decentralization
      communityVotes: 600, // More than 500 community votes
    });

    const score = await governanceController.calculateGovernanceScore('projectId');

    expect(score).toBeLessThanOrEqual(99); // Ensure score does not exceed 99
    expect(score).toBeGreaterThanOrEqual(75); // Check that score is correctly calculated
  });

  it('should calculate governance score correctly when conditions are not met', async () => {
    // Mock the service responses
    coinMarketCapService.getTokenHolderAnalysis.mockResolvedValue({
      holderCount: 800, // Less than 1000 holders
    });

    coinMarketCapService.getPricingData.mockResolvedValue({
      volume: 500000, // Less than 1,000,000 in trading volume
    });

    lunarCrushService.getGovernanceMetrics.mockResolvedValue({
      decentralization: 50, // Less than 75 decentralization
      communityVotes: 300, // Less than 500 community votes
    });

    const score = await governanceController.calculateGovernanceScore('projectId');

    expect(score).toBe(0); // When no conditions are met, the score should be 0
  });

  it('should handle errors from service calls gracefully', async () => {
    // Mock a service call to throw an error
    coinMarketCapService.getTokenHolderAnalysis.mockRejectedValue(new Error('Service error'));

    await expect(governanceController.calculateGovernanceScore('projectId')).rejects.toThrow('Failed to calculate governance score');
  });
});
