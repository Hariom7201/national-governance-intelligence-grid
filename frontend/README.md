# Frontend - Digital Democracy Intelligence Platform

Modern React/TypeScript frontend for the Digital Democracy Intelligence Platform with real-time dashboards, crisis management, and fraud detection systems.

## Features

- **Dashboard**: Real-time overview of grievances, crises, fraud alerts
- **District Management**: View and monitor district-wise performance metrics
- **Crisis Management**: Live crisis alerts with severity levels
- **Fraud Detection**: Monitor and investigate suspicious activities
- **Action Items**: Track and manage action items with priorities
- **Modern UI**: Built with React Router, Tailwind CSS, and Recharts

## Tech Stack

- **React** 19.0.0
- **TypeScript** 5.8.2
- **Vite** 6.2.0
- **Tailwind CSS** 4.1.14
- **Recharts** 3.8.0 (for charts)
- **Lucide React** (for icons)
- **Motion** (for animations)

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
- `GEMINI_API_KEY`: Your Google Gemini API key

### Development

```bash
npm run dev
```

The app will start at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx                 # Main app component with router
├── main.tsx               # Entry point
├── index.css              # Global styles
├── components/
│   └── Shared.tsx         # Reusable components (Card, RiskBadge)
├── pages/
│   ├── Dashboard.tsx      # Dashboard page
│   ├── District.tsx       # District management
│   ├── Crisis.tsx         # Crisis alerts
│   ├── Fraud.tsx          # Fraud detection
│   └── Action.tsx         # Action items
└── constants/
    └── mockData.ts        # Mock data for UI
```

## API Integration

The frontend is configured to proxy API calls to the backend:

- Base URL: `http://localhost:5000`
- Endpoints configured in `vite.config.ts`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript linter
- `npm run clean` - Remove dist folder

## Browser Support

- Modern browsers with ES2022 support
- Chrome, Firefox, Safari, Edge

## License

Apache License 2.0
