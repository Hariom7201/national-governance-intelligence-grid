import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Placeholder API endpoints
app.get('/api/dashboard', (req: Request, res: Response) => {
  res.json({
    stats: {
      grievances: 12456,
      crises: 24,
      fraudAlerts: 156,
      actionsTaken: 8920,
    },
  });
});

app.get('/api/districts', (req: Request, res: Response) => {
  res.json({
    districts: [
      { name: 'North District', risk: 'Low', score: 85, issues: 120 },
      { name: 'South District', risk: 'High', score: 42, issues: 450 },
      { name: 'East District', risk: 'Medium', score: 65, issues: 280 },
      { name: 'West District', risk: 'Low', score: 92, issues: 85 },
      { name: 'Central District', risk: 'Medium', score: 58, issues: 310 },
    ],
  });
});

app.get('/api/crisis', (req: Request, res: Response) => {
  res.json({
    alerts: [
      { id: 1, type: 'Water Shortage', district: 'South District', severity: 'High' },
      { id: 2, type: 'Power Outage', district: 'East District', severity: 'Medium' },
      { id: 3, type: 'Road Blockage', district: 'Central District', severity: 'Low' },
    ],
  });
});

app.get('/api/fraud', (req: Request, res: Response) => {
  res.json({
    alerts: [
      { id: 1, scheme: 'Pension Fund', type: 'Duplicate Identity', amount: '₹4.5L' },
      { id: 2, scheme: 'Housing Subsidy', type: 'Income Misreporting', amount: '₹12L' },
      { id: 3, scheme: 'Ration Card', type: 'Ghost Beneficiary', amount: '₹1.2L' },
    ],
  });
});

app.get('/api/actions', (req: Request, res: Response) => {
  res.json({
    actions: [
      { id: 1, task: 'Verify Pension Records', priority: 'High', deadline: '2026-03-22' },
      { id: 2, task: 'Dispatch Water Tankers', priority: 'Critical', deadline: '2026-03-20' },
      { id: 3, task: 'Audit Housing Applications', priority: 'Medium', deadline: '2026-03-25' },
    ],
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
