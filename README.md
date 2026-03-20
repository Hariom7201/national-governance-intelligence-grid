<<<<<<< HEAD
# National Governance Intelligence Grid (NGIG)

AI-Powered Decision Intelligence Platform for Predictive Public Administration.

NGIG transforms fragmented governance datasets into a unified intelligence graph that detects emerging citizen issues, validates scheme distribution patterns, and recommends administrative actions in real time.

---

## Problem

Government data exists across multiple disconnected systems. This fragmentation prevents early crisis detection, slows decision-making, and reduces administrative efficiency.

---

## Solution

NGIG integrates multiple governance signals into a unified knowledge graph and applies AI-driven anomaly detection, clustering, and predictive analysis to generate actionable governance insights.

---

## Core Modules

- Governance Knowledge Graph
- Citizen Crisis Radar
- Scheme Leakage Detection Engine
- Action Recommendation System

---

## Architecture

Data Sources → AI Processing → Knowledge Graph → Decision Dashboard

---

## Tech Stack

Backend: Python, FastAPI  
Frontend: ReactJS  
Graph Database: Neo4j  
AI Models: NLP clustering + anomaly detection  

---

## Repository Structure

backend → APIs  
frontend → dashboard  
ai → analytics modules  
data → datasets  
simulation → live demo scripts  

---

## Running Backend
=======
# Digital Democracy Intelligence Platform

A comprehensive platform for monitoring and managing governance systems, including real-time crisis management, fraud detection, and action tracking.

## Project Structure

```
digital-democracy-intelligence-platform/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── constants/      # Mock data and constants
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── vite.config.ts      # Vite configuration
│   ├── tsconfig.json       # TypeScript config
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment variables template
│   └── README.md           # Frontend documentation
│
├── backend/                 # Express.js backend server
│   ├── src/
│   │   └── server.ts       # Express server setup
│   ├── tsconfig.json       # TypeScript config
│   ├── package.json        # Dependencies
│   ├── .env.example        # Environment variables template
│   └── README.md           # Backend documentation
│
├── package.json            # Root package configuration
├── README.md               # This file
├── metadata.json           # Project metadata
├── .env.example            # Root environment variables
└── .gitignore              # Git ignore rules
```

## Features

### Dashboard
- Real-time statistics on grievances, crises, fraud alerts, and actions taken
- Trend visualization with charts
- District risk distribution

### District Management
- Performance monitoring across districts
- Risk level assessment
- Health score tracking
- Issue counting and management

### Crisis Management
- Live crisis alerts with severity levels
- District-wise crisis tracking
- Real-time monitoring dashboard
- Heatmap visualization (GIS integration placeholder)

### Fraud Detection
- Fraud alert monitoring
- Risk factor analysis
- Investigation status tracking
- Multiple fraud type detection

### Action Management
- Actionable insights and task tracking
- Priority-based task management
- Deadline monitoring
- Status tracking

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Quick Start

#### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### 2. Install Backend Dependencies

```bash
cd ../backend
npm install
```

#### 3. Configure Environment Variables

Frontend:
```bash
cd frontend
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

Backend:
```bash
cd ../backend
cp .env.example .env
# Edit .env with your configuration
```

#### 4. Run Both Services

**Terminal 1 - Frontend (Port 3000):**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend (Port 5000):**
```bash
cd backend
npm run dev
```

Access the application at `http://localhost:3000`

## Technology Stack

### Frontend
- React 19.0.0
- TypeScript 5.8.2
- Vite 6.2.0
- Tailwind CSS 4.1.14
- Recharts 3.8.0
- Lucide React Icons
- Motion Animations

### Backend
- Node.js + Express.js 4.21.2
- TypeScript 5.8.2
- CORS support
- RESTful API design

### Development Tools
- TSX for TypeScript execution
- Autoprefixer for CSS
- Tailwind merge utilities
- cLSX for class utilities

## API Overview

The backend provides REST APIs:

- `GET /api/health` - Health check
- `GET /api/dashboard` - Dashboard statistics
- `GET /api/districts` - District data
- `GET /api/crisis` - Crisis alerts
- `GET /api/fraud` - Fraud alerts  
- `GET /api/actions` - Action items

Frontend proxies API calls through the Vite dev server to `http://localhost:5000`

## Development

### Build Commands

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview build
- `npm run lint` - Type checking

**Backend:**
- `npm run dev` - Start with file watching
- `npm run build` - Compile TypeScript
- `npm start` - Run production server
- `npm run lint` - Type checking

## Project Configuration

- **TypeScript Target**: ES2022
- **Module Resolution**: Bundler/ESNext
- **JSX**: React 17+ JSX transform
- **CSS**: Tailwind CSS with Vite plugin
- **Build Tool**: Vite for frontend, TSC for backend

## Environment Variables

### Frontend (.env)
- `GEMINI_API_KEY`: Google Generative AI API key
- `APP_URL`: Application URL

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Frontend URL for CORS
- `NODE_ENV`: Environment (development/production)
- `GEMINI_API_KEY`: Google Generative AI API key

## License

Apache License 2.0

## Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)

## Contributing

Follow the existing code structure and patterns. Ensure TypeScript strict mode compliance.

## Support

For issues and questions, refer to the respective README files in frontend and backend folders.
>>>>>>> d70294d (Initial commit for new repo)
