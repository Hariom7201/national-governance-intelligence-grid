# Backend - Digital Democracy Intelligence Platform

Express.js backend server for the Digital Democracy Intelligence Platform providing REST APIs for dashboard, district, crisis, fraud, and action management.

## Features

- **REST API**: Complete API endpoints for all platform modules
- **CORS Support**: Configured for frontend integration
- **Health Check**: System status monitoring
- **Dashboard API**: Real-time statistics and metrics
- **District Management**: District performance data
- **Crisis Alerts**: Live crisis monitoring
- **Fraud Detection**: Fraud alert endpoints
- **Action Management**: Action items and tasks

## Tech Stack

- **Express.js** 4.21.2
- **TypeScript** 5.8.2
- **Node.js** 18+
- **Axios** (for API calls)
- **CORS** (cross-origin resource sharing)
- **Dotenv** (environment variables)

## Setup

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the environment variables:
- `PORT`: Backend server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `GEMINI_API_KEY`: Google Gemini API key
- `FRONTEND_URL`: Frontend URL for CORS

### Development

```bash
npm run dev
```

The server will start at `http://localhost:5000`

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
src/
└── server.ts           # Main Express server file

dist/                   # Compiled JavaScript (after build)
```

## API Endpoints

### Health Check
- `GET /api/health` - Server status

### Dashboard
- `GET /api/dashboard` - Dashboard statistics and metrics

### Districts
- `GET /api/districts` - List of districts with performance metrics

### Crisis
- `GET /api/crisis` - Active crisis alerts

### Fraud
- `GET /api/fraud` - Fraud detection alerts

### Actions
- `GET /api/actions` - Action items and tasks

## CORS Configuration

The backend is CORS-enabled by default to allow requests from the frontend. Modify the CORS configuration in `src/server.ts` if needed.

## Available Scripts

- `npm run dev` - Start development server with file watching
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled production server
- `npm run lint` - Run TypeScript linter

## Error Handling

Global error handler middleware is configured to catch and log errors. Returns 500 status with error message.

## Running Both Frontend and Backend

### Terminal 1 - Frontend
```bash
cd frontend
npm install
npm run dev
```

### Terminal 2 - Backend
```bash
cd backend
npm install
npm run dev
```

Access the app at `http://localhost:3000`

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Authentication & Authorization
- Real-time WebSocket support
- Advanced caching strategies
- API rate limiting
- Logging and monitoring
- Unit and integration tests

## License

Apache License 2.0
