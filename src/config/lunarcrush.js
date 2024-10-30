// src/config/lunarcrush.js

const config = require('./index'); // Import the main config file

const lunarCrushConfig = {
  // API URL for fetching general crypto data
  cryptoDataUrl: `${config.lunarCrush.baseUrl}/assets`,
  
  // Headers to be used for API requests (LunarCrush does not require API keys)
  getHeaders: () => {
    return {
      'Accept': 'application/json',
      // No API key required for LunarCrush
    };
  },

  // Function to fetch asset details by ID
  getAssetDetailsUrl: (slug) => {
    return `${config.lunarCrush.baseUrl}/assets?slug=${slug}`;
  },

  // Function to fetch social metrics for a specific asset
  getSocialMetricsUrl: (slug) => {
    return `${config.lunarCrush.baseUrl}/assets?slug=${slug}&data=metrics`;
  },

  // Function to fetch historical data for a specific asset
  getHistoricalDataUrl: (slug, timeframe) => {
    return `${config.lunarCrush.baseUrl}/assets?slug=${slug}&data=historical&timeframe=${timeframe}`;
  }
};

module.exports = lunarCrushConfig;
