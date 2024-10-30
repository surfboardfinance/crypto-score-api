// src/config/index.js

require('dotenv').config(); // Load environment variables from .env file

const config = {
  coinMarketCap: {
    apiKey: process.env.COINMARKETCAP_API_KEY, // API key for CoinMarketCap
    baseUrl: 'https://pro-api.coinmarketcap.com/v1', // Base URL for CoinMarketCap API
  },
  lunarCrush: {
    apiKey: process.env.LUNARCRUSH_API_KEY, // API key for LunarCrush
    baseUrl: 'https://api.lunarcrush.com/v2', // Base URL for LunarCrush API
  },
  analytics: {
    scoringRange: { min: 0, max: 99 }, // Scoring range for topics
  },
};

module.exports = config;
