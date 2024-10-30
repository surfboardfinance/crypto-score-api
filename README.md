# Crypto API Project

A cryptocurrency API project that integrates CoinMarketCap and LunarCrush APIs to provide various data analytics and scoring features for cryptocurrency projects.

## Features

- Fetch the latest cryptocurrency listings.
- Retrieve project details and token holder analysis.
- Calculate security, operational, governance, and community scores for cryptocurrency projects.
- Get social metrics and historical data for specific assets.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building APIs.
- **Mongoose**: ODM for MongoDB.
- **Axios**: HTTP client for making API requests.
- **Jest**: Testing framework for unit and integration tests.
- **Supertest**: Testing library for HTTP assertions.
- **dotenv**: For managing environment variables.

## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/crypto-score-api.git
cd crypto-score-api
```

2. Install dependencies:
```
npm install
```

3. Create a .env file in the root directory and add your environment variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database_name
MONGODB_URI_TEST=mongodb://localhost:27017/your_test_database_name
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
LUNARCRUSH_API_KEY=your_lunarcrush_api_key
BASE_API_URL=https://api.example.com
JWT_SECRET=your_jwt_secret_key
```


## Usage
1. To start the server in development mode, run:
```
npm run dev
```


2. To start the server in production mode, run:
```
npm start
```


3. Run the tests:
```
npm test
```

## API Endpoints

- GET /api/listings: Fetch the latest cryptocurrency listings.
- GET /api/project/: Retrieve project data by ID.
- GET /api/security-score/: Get the security score for a project.
- GET /api/operational-score/: Get the operational score for a project.
- GET /api/governance-score/: Get the governance score for a project.
- GET /api/community-score/: Get the community score for a project.
- GET /api/social-metrics/: Fetch social metrics for an asset.
- GET /api/historical-data/: Fetch historical data for an asset.


## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss changes.


## License

This project is licensed under the MIT License


----
https://www.board.sc
