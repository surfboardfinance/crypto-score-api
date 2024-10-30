// tests/integration/apiRoutes.test.js

const request = require('supertest');
const express = require('express');
const routes = require('../../src/routes/index');
const mongoose = require('mongoose');

// Create a mock Express app for testing
const app = express();
app.use(express.json());
app.use(routes);

describe('API Routes', () => {
  beforeAll(async () => {
    // Connect to the in-memory database or mock database
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Close the database connection after tests
  });

  it('GET /api/listings should return latest cryptocurrency listings', async () => {
    const response = await request(app).get('/api/listings');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data'); // Assuming the response has a 'data' field
  });

  it('GET /api/project/:id should return project data by ID', async () => {
    const response = await request(app).get('/api/project/1'); // Replace with a valid ID

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', '1'); // Assuming the response has an 'id' field
  });

  it('GET /api/security-score/:projectId should return security score', async () => {
    const response = await request(app).get('/api/security-score/projectId'); // Replace with a valid projectId

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('securityScore'); // Check for the securityScore field
  });

  it('GET /api/operational-score/:projectId should return operational score', async () => {
    const response = await request(app).get('/api/operational-score/projectId'); // Replace with a valid projectId

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('operationalScore'); // Check for the operationalScore field
  });

  it('GET /api/governance-score/:projectId should return governance score', async () => {
    const response = await request(app).get('/api/governance-score/projectId'); // Replace with a valid projectId

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('governanceScore'); // Check for the governanceScore field
  });

  it('GET /api/community-score/:projectId should return community score', async () => {
    const response = await request(app).get('/api/community-score/projectId'); // Replace with a valid projectId

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('communityScore'); // Check for the communityScore field
  });

  it('GET /api/social-metrics/:slug should return social metrics for an asset', async () => {
    const response = await request(app).get('/api/social-metrics/bitcoin'); // Replace with a valid slug

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('metrics'); // Assuming the response has a 'metrics' field
  });

  it('GET /api/historical-data/:slug/:timeframe should return historical data', async () => {
    const response = await request(app).get('/api/historical-data/bitcoin/30d'); // Replace with a valid slug and timeframe

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data'); // Assuming the response has a 'data' field
  });
});
