// src/services/coinmarketcapService.js

const { callCoinMarketCapAPI } = require('../utils/apiUtils');
const coinMarketCapConfig = require('../config/coinmarketcap');

/**
 * Fetch the latest cryptocurrency listings from CoinMarketCap.
 * @returns {Promise<Object>} - The latest cryptocurrency listings data.
 */
const getLatestListings = async () => {
  const url = coinMarketCapConfig.cryptoDataUrl;
  return await callCoinMarketCapAPI(url);
};

/**
 * Fetch details of a specific cryptocurrency project by ID.
 * @param {string} projectId - The ID of the cryptocurrency project.
 * @returns {Promise<Object>} - The cryptocurrency project details.
 */
const getProjectData = async (projectId) => {
  const url = coinMarketCapConfig.getCryptoDetailsUrl(projectId);
  return await callCoinMarketCapAPI(url);
};

/**
 * Fetch token holder analysis for a specific cryptocurrency project.
 * @param {string} projectId - The ID of the cryptocurrency project.
 * @returns {Promise<Object>} - The token holder analysis data.
 */
const getTokenHolderAnalysis = async (projectId) => {
  // Hypothetical endpoint for token holder analysis
  const url = `${coinMarketCapConfig.baseUrl}/cryptocurrency/tokenomics?id=${projectId}`;
  return await callCoinMarketCapAPI(url);
};

/**
 * Fetch pricing data for a specific cryptocurrency project.
 * @param {string} projectId - The ID of the cryptocurrency project.
 * @returns {Promise<Object>} - The pricing data.
 */
const getPricingData = async (projectId) => {
  // Hypothetical endpoint for pricing data
  const url = `${coinMarketCapConfig.baseUrl}/cryptocurrency/quotes/latest?id=${projectId}`;
  return await callCoinMarketCapAPI(url);
};

/**
 * Fetch bug bounty program data for a specific cryptocurrency project.
 * @param {string} projectId - The ID of the cryptocurrency project.
 * @returns {Promise<Object>} - The bug bounty program data.
 */
const getBugBountyData = async (projectId) => {
  // Hypothetical endpoint for bug bounty data
  const url = `${coinMarketCapConfig.baseUrl}/cryptocurrency/bug-bounty?id=${projectId}`;
  return await callCoinMarketCapAPI(url);
};

module.exports = {
  getLatestListings,
  getProjectData,
  getTokenHolderAnalysis,
  getPricingData,
  getBugBountyData,
};
