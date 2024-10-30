// src/routes/apiRoutes.js

const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');
const operationalController = require('../controllers/operationalController');
const governanceController = require('../controllers/governanceController');
const communityController = require('../controllers/communityController');
const coinMarketCapService = require('../services/coinmarketcapService');
const lunarCrushService = require('../services/lunarcrushService');

// Fetch the latest cryptocurrency listings
router.get('/listings', async (req, res) => {
  try {
    const listings = await coinMarketCapService.getLatestListings();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch project data by project ID
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await coinMarketCapService.getProjectData(req.params.id);
    res.json(projectData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate and fetch security score by project ID
router.get('/security-score/:projectId', async (req, res) => {
  try {
    const score = await securityController.calculateSecurityScore(req.params.projectId);
    res.json({ securityScore: score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate and fetch operational score by project ID
router.get('/operational-score/:projectId', async (req, res) => {
  try {
    const score = await operationalController.calculateOperationalScore(req.params.projectId);
    res.json({ operationalScore: score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate and fetch governance score by project ID
router.get('/governance-score/:projectId', async (req, res) => {
  try {
    const score = await governanceController.calculateGovernanceScore(req.params.projectId);
    res.json({ governanceScore: score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate and fetch community score by project ID
router.get('/community-score/:projectId', async (req, res) => {
  try {
    const score = await communityController.calculateCommunityScore(req.params.projectId);
    res.json({ communityScore: score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch social metrics for a specific asset
router.get('/social-metrics/:slug', async (req, res) => {
  try {
    const metrics = await lunarCrushService.getSocialMetrics(req.params.slug);
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch historical data for a specific asset
router.get('/historical-data/:slug/:timeframe', async (req, res) => {
  try {
    const historicalData = await lunarCrushService.getHistoricalData(req.params.slug, req.params.timeframe);
    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
