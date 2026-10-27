const express = require('express');
const router = express.Router();
const StorageAdapter = require('../storage/storageAdapter');
const { FATIGUE_THRESHOLDS } = require('../config/constants');

// GET /api/shifts - list active or past shifts
router.get('/', async (req, res) => {
  try {
    const { sector, status, workerId } = req.query;
    const shifts = await StorageAdapter.getShifts({ sector, status, workerId });

    // Recalculate hoursWorkedSoFar for active shifts dynamically
    const now = Date.now();
    const formatted = shifts.map(s => {
      if (s.status === 'active' && s.startTime) {
        const elapsed = (now - new Date(s.startTime).getTime()) / (1000 * 60 * 60);
        const hours = parseFloat(Math.max(0, elapsed).toFixed(1));
        let fatigueRisk = 'normal';
        if (hours >= FATIGUE_THRESHOLDS.MAX_DAILY_HOURS) {
          fatigueRisk = 'critical';
        } else if (hours >= FATIGUE_THRESHOLDS.WARNING_DAILY_HOURS) {
          fatigueRisk = 'warning';
        }
        return { ...s, hoursWorkedSoFar: hours, fatigueRisk };
      }
      return s;
    });

    res.json({ success: true, count: formatted.length, shifts: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve shifts', error: err.message });
  }
});

// POST /api/shifts/check-in - worker check-in or manager assignment
router.post('/check-in', async (req, res) => {
  try {
    const {
      workerId,
      workerName,
      sector,
      shiftType,
      siteLocation,
      taskDescription,
      hazardRating,
      requiredPPE
    } = req.body;

    if (!workerId) {
      return res.status(400).json({ success: false, message: 'Worker ID is required.' });
    }

    const worker = await StorageAdapter.getWorkerById(workerId);
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }

    const newShift = await StorageAdapter.createShift({
      workerId,
      workerName: workerName || worker.name,
      sector: sector || worker.sector,
      shiftType: shiftType || 'Day Shift',
      siteLocation: siteLocation || 'Main Job Site',
      taskDescription: taskDescription || `Standard manual duties for ${worker.trade}`,
      hazardRating: hazardRating || 'Medium',
      requiredPPE: Array.isArray(requiredPPE) && requiredPPE.length ? requiredPPE : ['Standard PPE', 'Safety Boots'],
      startTime: new Date().toISOString(),
      endTime: null,
      hoursWorkedSoFar: 0,
      status: 'active',
      fatigueRisk: 'normal'
    });

    res.status(201).json({
      success: true,
      message: `${worker.name} checked in successfully. Shift active.`,
      shift: newShift
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Check-in failed', error: err.message });
  }
});

// POST /api/shifts/:id/check-out - worker check-out
router.post('/:id/check-out', async (req, res) => {
  try {
    const shifts = await StorageAdapter.getShifts();
    const shift = shifts.find(s => s.id === req.params.id);
    if (!shift) {
      return res.status(404).json({ success: false, message: 'Shift not found' });
    }

    const endTime = new Date();
    const startMs = new Date(shift.startTime).getTime();
    const hoursLogged = parseFloat(Math.max(0, (endTime.getTime() - startMs) / (1000 * 60 * 60)).toFixed(2));

    const updated = await StorageAdapter.updateShift(shift.id, {
      endTime: endTime.toISOString(),
      hoursWorkedSoFar: hoursLogged,
      status: 'completed',
      fatigueRisk: 'normal'
    });

    // Update worker status
    if (shift.workerId) {
      await StorageAdapter.updateWorker(shift.workerId, {
        status: 'off_duty',
        currentShiftId: null
      });
    }

    res.json({
      success: true,
      message: `Shift completed. Total logged time: ${hoursLogged} hours.`,
      shift: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Check-out failed', error: err.message });
  }
});

// PATCH /api/shifts/:id - update shift details
router.patch('/:id', async (req, res) => {
  try {
    const updated = await StorageAdapter.updateShift(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Shift not found' });
    }
    res.json({ success: true, shift: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Shift update failed', error: err.message });
  }
});

module.exports = router;
