// src/config/coinmarketcap.js

const config = require('./index'); // Import the main config file

const coinMarketCapConfig = {
  // API URL for retrieving cryptocurrency data
  cryptoDataUrl: `${config.coinMarketCap.baseUrl}/cryptocurrency/listings/latest`,
  
  // Headers to be used for API requests
  getHeaders: () => {
    return {
      'Accepts': 'application/json',
      'X-CMC_PRO_API_KEY': config.coinMarketCap.apiKey, // Include the API key in headers
    };
  },

  // Function to fetch cryptocurrency details by ID
  getCryptoDetailsUrl: (id) => {
    return `${config.coinMarketCap.baseUrl}/cryptocurrency/info?id=${id}`;
  },

  // Function to fetch historical data
  getHistoricalDataUrl: (id, timeStart, timeEnd) => {
    return `${config.coinMarketCap.baseUrl}/cryptocurrency/quotes/historical?id=${id}&time_start=${timeStart}&time_end=${timeEnd}`;
  }
};

module.exports = coinMarketCapConfig;
