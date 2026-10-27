const express = require('express');
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

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes — all prefixed /api/* (Vercel rewrites send full path)
app.use('/api/sectors', sectorRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/wages', wageRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/demo', demoRoutes);

// Health check
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

// Static file serving — only when running locally (not Vercel services)
if (!process.env.VERCEL) {
  const path = require('path');
  const fs = require('fs');
  const clientDistPath = path.join(__dirname, '../client/dist');
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  }
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[FairWork AI Error]:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Start server when running directly (local / Cloud Run) — not on Vercel
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  FairWork AI Backend active on port: ${PORT}`);
    console.log(`  Storage Mode: ${StorageAdapter.getStorageStatus().label}`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
