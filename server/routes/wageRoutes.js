const express = require('express');
const router = express.Router();
const StorageAdapter = require('../storage/storageAdapter');
const WageService = require('../services/wageService');

// GET /api/wages - list wages
router.get('/', async (req, res) => {
  try {
    const { sector, paymentStatus, workerId } = req.query;
    const wages = await StorageAdapter.getWages({ sector, paymentStatus, workerId });
    res.json({ success: true, count: wages.length, wages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve wage records', error: err.message });
  }
});

// GET /api/wages/export/csv - export CSV file for auditing
router.get('/export/csv', async (req, res) => {
  try {
    const { sector } = req.query;
    const wages = await StorageAdapter.getWages({ sector });
    const csvContent = WageService.generateCSVReport(wages);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="FairWork_Wage_Ledger_${sector || 'all'}_${Date.now()}.csv"`);
    res.status(200).send(csvContent);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to export CSV', error: err.message });
  }
});

// POST /api/wages/calculate - calculate transparent wage preview
router.post('/calculate', async (req, res) => {
  try {
    const { workerId, standardHours, overtimeHours, payPeriod } = req.body;
    if (!workerId) {
      return res.status(400).json({ success: false, message: 'Worker ID is required' });
    }

    const worker = await StorageAdapter.getWorkerById(workerId);
    if (!worker) {
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }

    const calculation = WageService.calculateWageRecord({
      worker,
      standardHours: parseFloat(standardHours) || 48,
      overtimeHours: parseFloat(overtimeHours) || 0,
      payPeriod
    });

    res.json({ success: true, calculation });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Calculation failed', error: err.message });
  }
});

// POST /api/wages - record a newly calculated wage slip
router.post('/', async (req, res) => {
  try {
    const newRecord = await StorageAdapter.createWage(req.body);
    res.status(201).json({
      success: true,
      message: 'Wage record created on transparent ledger.',
      wage: newRecord
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Creation failed', error: err.message });
  }
});

// POST /api/wages/:id/disburse - simulate verifiable disbursement
router.post('/:id/disburse', async (req, res) => {
  try {
    const updated = await WageService.disburseWage(req.params.id, req.body.customRef);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Wage record not found' });
    }
    res.json({
      success: true,
      message: `Wage record ${req.params.id} disbursed. Ref: ${updated.transactionRef}`,
      wage: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Disbursement failed', error: err.message });
  }
});

module.exports = router;
