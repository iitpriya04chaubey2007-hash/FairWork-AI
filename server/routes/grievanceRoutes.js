const express = require('express');
const router = express.Router();
const StorageAdapter = require('../storage/storageAdapter');
const { GRIEVANCE_CATEGORIES } = require('../config/constants');

// GET /api/grievances - list all grievances
router.get('/', async (req, res) => {
  try {
    const { sector, status } = req.query;
    const grievances = await StorageAdapter.getGrievances({ sector, status });
    res.json({ success: true, count: grievances.length, grievances });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve grievances', error: err.message });
  }
});

// GET /api/grievances/categories - list grievance types
router.get('/categories', (req, res) => {
  res.json({ success: true, categories: GRIEVANCE_CATEGORIES });
});

// GET /api/grievances/track/:code - anonymous tracking lookup
router.get('/track/:code', async (req, res) => {
  try {
    const grievance = await StorageAdapter.getGrievanceByTrackingCode(req.params.code);
    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: `No grievance record found with tracking code: ${req.params.code}. Please verify the ticket code.`
      });
    }

    res.json({
      success: true,
      grievance: {
        trackingCode: grievance.trackingCode,
        category: grievance.category,
        sector: grievance.sector,
        priority: grievance.priority,
        timestamp: grievance.timestamp,
        status: grievance.status,
        officialNotes: grievance.officialNotes,
        resolutionDate: grievance.resolutionDate,
        isAnonymous: grievance.isAnonymous
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Tracking lookup failed', error: err.message });
  }
});

// POST /api/grievances - submit grievance
router.post('/', async (req, res) => {
  try {
    const {
      sector,
      category,
      priority,
      description,
      location,
      isAnonymous,
      workerName,
      workerId
    } = req.body;

    if (!sector || !category || !description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Sector, category, and grievance description are required.'
      });
    }

    const anonymousMode = Boolean(isAnonymous);

    const newGrievance = await StorageAdapter.createGrievance({
      sector,
      category,
      priority: priority || 'Medium',
      description: description.trim(),
      location: location ? location.trim() : 'Unspecified Site',
      isAnonymous: anonymousMode,
      reportedBy: anonymousMode ? 'Anonymous Whistleblower' : (workerName || 'Worker'),
      workerId: anonymousMode ? null : (workerId || null)
    });

    res.status(201).json({
      success: true,
      message: 'Grievance submitted securely. Save your tracking code to view progress anonymously.',
      trackingCode: newGrievance.trackingCode,
      grievance: newGrievance
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Grievance submission failed', error: err.message });
  }
});

// PATCH /api/grievances/:id - update status and official notes
router.patch('/:id', async (req, res) => {
  try {
    const { status, officialNotes } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (officialNotes) updates.officialNotes = officialNotes;
    if (status === 'resolved' && !updates.resolutionDate) {
      updates.resolutionDate = new Date().toISOString();
    }

    const updated = await StorageAdapter.updateGrievance(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Grievance not found' });
    }

    res.json({ success: true, message: 'Grievance record updated.', grievance: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Update failed', error: err.message });
  }
});

module.exports = router;
