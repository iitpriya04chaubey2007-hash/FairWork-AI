const express = require('express');
const router = express.Router();
const StorageAdapter = require('../storage/storageAdapter');

// GET /api/workers - list workers with filters
router.get('/', async (req, res) => {
  try {
    const { sector, status, search } = req.query;
    const workers = await StorageAdapter.getWorkers({ sector, status, search });
    res.json({
      success: true,
      count: workers.length,
      workers
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve workers', error: err.message });
  }
});

// GET /api/workers/:id - get worker details & passport
router.get('/:id', async (req, res) => {
  try {
    const worker = await StorageAdapter.getWorkerById(req.params.id);
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.json({ success: true, worker });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve worker', error: err.message });
  }
});

// POST /api/workers - register a new worker
router.post('/', async (req, res) => {
  try {
    const {
      name,
      sector,
      trade,
      experienceYears,
      phone,
      dailyBaseRate,
      hourlyRate,
      preferredLanguage,
      emergencyContact,
      skills,
      certifications
    } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Worker name is required.' });
    }
    if (!sector) {
      return res.status(400).json({ success: false, message: 'Work sector is required.' });
    }
    if (!trade || !trade.trim()) {
      return res.status(400).json({ success: false, message: 'Primary trade / skill is required.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Contact phone number is required.' });
    }

    const baseRate = parseFloat(dailyBaseRate) || 800;
    const calculatedHourly = parseFloat(hourlyRate) || parseFloat((baseRate / 8).toFixed(2));

    const newWorker = await StorageAdapter.createWorker({
      name: name.trim(),
      sector,
      trade: trade.trim(),
      experienceYears: parseInt(experienceYears) || 1,
      phone: phone.trim(),
      nationalIdMasked: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
      dailyBaseRate: baseRate,
      hourlyRate: calculatedHourly,
      preferredLanguage: preferredLanguage || 'en',
      emergencyContact: emergencyContact || { name: 'Family Contact', phone },
      skills: Array.isArray(skills) ? skills : [trade.trim()],
      certifications: Array.isArray(certifications) ? certifications : []
    });

    res.status(201).json({
      success: true,
      message: 'Worker registered successfully with digital Skill Passport.',
      worker: newWorker
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Worker registration failed', error: err.message });
  }
});

// PATCH /api/workers/:id - update worker info
router.patch('/:id', async (req, res) => {
  try {
    const updated = await StorageAdapter.updateWorker(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    res.json({ success: true, worker: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed', error: err.message });
  }
});

module.exports = router;
