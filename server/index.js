const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const StorageAdapter = require('./storage/storageAdapter');
const sectorRoutes = require('./routes/sectorRoutes');
const workerRoutes = require('./routes/workerRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const wageRoutes = require('./routes/wageRoutes');
const safetyRoutes = require('./routes/safetyRoutes');
const grievanceRoutes = require('./routes/grievanceRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const demoRoutes = require('./routes/demoRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Security and middleware
app.use(helmet({
  contentSecurityPolicy: false // Allow Vite assets & styles in demo/production
}));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/sectors', sectorRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/wages', wageRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/demo', demoRoutes);

// Health check endpoint for Cloud Run / Vercel / monitoring
app.get('/api/health', (req, res) => {
  const storage = StorageAdapter.getStorageStatus();
  res.json({
    status: 'healthy',
    app: 'FairWork AI',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    storageMode: storage.mode,
    isDemoMode: storage.isDemoMode,
    storageLabel: storage.label
  });
});

// In non-Vercel environments: serve built static client files
// Vercel handles static file serving separately via outputDirectory in vercel.json
if (process.env.VERCEL !== '1') {
  const clientDistPath = path.join(__dirname, '../client/dist');
  const fs = require('fs');
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'Endpoint not found' });
      }
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  } else {
    app.get('/', (req, res) => {
      res.json({
        message: 'FairWork AI Backend API is active.',
        healthCheck: '/api/health',
        sectors: '/api/sectors',
        workers: '/api/workers',
        note: 'Frontend dev server runs at http://localhost:5173 or run "npm run build" to produce production client.'
      });
    });
  }
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[FairWork AI Error]:', err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Start listening only when running directly (not on Vercel / test)
if (process.env.NODE_ENV !== 'test' && process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  FairWork AI Backend active on port: ${PORT}`);
    console.log(`  Cloud Run ready: listening on process.env.PORT || 8080`);
    console.log(`  Storage Mode: ${StorageAdapter.getStorageStatus().label}`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
