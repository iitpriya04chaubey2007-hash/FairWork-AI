const express = require('express');
const router = express.Router();
const StorageAdapter = require('../storage/storageAdapter');
const FatigueService = require('../services/fatigueService');
const { FATIGUE_THRESHOLDS } = require('../config/constants');

// GET /api/safety/incidents - list incidents
router.get('/incidents', async (req, res) => {
  try {
    const { sector, severity } = req.query;
    const incidents = await StorageAdapter.getSafetyIncidents({ sector, severity });
    res.json({ success: true, count: incidents.length, incidents });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve incidents', error: err.message });
  }
});

// POST /api/safety/incidents - report safety incident / near miss
router.post('/incidents', async (req, res) => {
  try {
    const {
      sector,
      workerId,
      workerName,
      incidentType,
      severity,
      location,
      description,
      immediateActionTaken,
      preventiveMeasure
    } = req.body;

    if (!sector || !incidentType || !description) {
      return res.status(400).json({
        success: false,
        message: 'Sector, incident type, and description are required.'
      });
    }

    const newIncident = await StorageAdapter.createSafetyIncident({
      sector,
      workerId: workerId || null,
      workerName: workerName || 'Site Staff',
      incidentType,
      severity: severity || 'Medium',
      location: location || 'On-site',
      description,
      immediateActionTaken: immediateActionTaken || 'Inspected by team lead',
      preventiveMeasure: preventiveMeasure || 'Refresher toolbox talk scheduled',
      investigatedBy: 'Pending Assignment'
    });

    res.status(201).json({
      success: true,
      message: 'Safety incident logged successfully and queued for inspection.',
      incident: newIncident
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Incident logging failed', error: err.message });
  }
});

// GET /api/safety/fatigue-alerts - rule-based threshold evaluation
router.get('/fatigue-alerts', async (req, res) => {
  try {
    const alerts = await FatigueService.evaluateFatigueRisks();
    res.json({
      success: true,
      count: alerts.length,
      alerts,
      disclaimer: 'Labor policy rule-based alert engine based on logged shift hours and statutory rest guidelines; does NOT constitute medical or biometric diagnosis.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fatigue evaluation failed', error: err.message });
  }
});

// POST /api/safety/fatigue-alerts/:shiftId/rest - enforce mandatory rest
router.post('/fatigue-alerts/:shiftId/rest', async (req, res) => {
  try {
    const result = await FatigueService.enforceRestBreak(req.params.shiftId, req.body.notes);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to enforce rest break', error: err.message });
  }
});

// GET /api/safety/thresholds - return labor policy rules
router.get('/thresholds', (req, res) => {
  res.json({
    success: true,
    thresholds: FATIGUE_THRESHOLDS,
    explanation: {
      MAX_DAILY_HOURS: 'Shifts exceeding 10 consecutive hours trigger immediate critical fatigue intervention.',
      WARNING_DAILY_HOURS: 'Shifts reaching 8.5 hours trigger advisory warning for relief handover.',
      MIN_REST_HOURS_BETWEEN_SHIFTS: '10 hours mandatory rest between shifts to ensure physical recuperation.'
    }
  });
});

module.exports = router;
