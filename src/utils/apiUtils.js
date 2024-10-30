// src/utils/apiUtils.js

const axios = require('axios');
const coinMarketCapConfig = require('../config/coinmarketcap');
const lunarCrushConfig = require('../config/lunarcrush');

/**
 * Utility function to make API calls to CoinMarketCap.
 * @param {string} url - The endpoint URL for the CoinMarketCap API.
 * @returns {Promise<Object>} - The response data from the API call.
 */
const callCoinMarketCapAPI = async (url) => {
  try {
    const response = await axios.get(url, { headers: coinMarketCapConfig.getHeaders() });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error calling CoinMarketCap API:', error);
    throw new Error('CoinMarketCap API call failed');
  }
};

/**
 * Utility function to make API calls to LunarCrush.
 * @param {string} url - The endpoint URL for the LunarCrush API.
 * @returns {Promise<Object>} - The response data from the API call.
 */
const callLunarCrushAPI = async (url) => {
  try {
    const response = await axios.get(url, { headers: lunarCrushConfig.getHeaders() });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error calling LunarCrush API:', error);
    throw new Error('LunarCrush API call failed');
  }
};

module.exports = {
  callCoinMarketCapAPI,
  callLunarCrushAPI,
};
