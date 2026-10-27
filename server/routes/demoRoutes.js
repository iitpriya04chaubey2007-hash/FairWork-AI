const express = require('express');
const router = express.Router();
const StorageAdapter = require('../storage/storageAdapter');

// GET /api/demo/status - check mode & persona presets (Focused on Construction & Healthcare)
router.get('/status', (req, res) => {
  const status = StorageAdapter.getStorageStatus();
  res.json({
    success: true,
    storage: status,
    personas: [
      {
        id: 'worker-construction',
        role: 'worker',
        workerId: 'w-c1',
        name: 'Rajesh Kumar (Construction Scaffolder)',
        sector: 'construction',
        description: 'Scaffolder & Rigger at Metro Rail project. View wage breakdown, check-in, skill passport, and height safety protocols.'
      },
      {
        id: 'worker-healthcare',
        role: 'worker',
        workerId: 'w-h1',
        name: 'Maria Santos (Hospital Sanitation Lead)',
        sector: 'healthcare',
        description: 'Hospital Biohazard Sanitizer. View biohazard allowance (+20%), verifiable passport, and infection control certs.'
      },
      {
        id: 'employer',
        role: 'employer',
        name: 'Site Operations Manager',
        sector: 'all',
        description: 'Assign shifts across Construction & Healthcare, manage rosters, disburse transparent wages, and enforce rest breaks.'
      },
      {
        id: 'admin',
        role: 'admin',
        name: 'Labor Inspector & Auditor',
        sector: 'all',
        description: 'Inspect Construction & Healthcare safety compliance, fatigue incident rates, anonymous grievances, and download audit CSVs.'
      }
    ]
  });
});

// POST /api/demo/reset - reset demo data
router.post('/reset', (req, res) => {
  const result = StorageAdapter.resetDemoData();
  res.json(result);
});

module.exports = router;
