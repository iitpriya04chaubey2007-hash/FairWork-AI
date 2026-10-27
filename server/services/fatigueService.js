// Fatigue Alert Engine (Rule-based & Labor Policy Thresholds)
// IMPORTANT: Does NOT perform medical diagnostics or claim biometric fatigue detection.
// Evaluates statutory rest intervals, consecutive hours, and overtime caps.

const { FATIGUE_THRESHOLDS } = require('../config/constants');
const StorageAdapter = require('../storage/storageAdapter');

class FatigueService {
  /**
   * Evaluates active shifts and flags workers exceeding labor rest thresholds.
   * @param {Object} customThresholds Optional override of threshold hours
   * @returns {Promise<Array>} Array of fatigue alert records with recommended actions
   */
  static async evaluateFatigueRisks(customThresholds = {}) {
    const thresholds = { ...FATIGUE_THRESHOLDS, ...customThresholds };
    const shifts = await StorageAdapter.getShifts({ status: 'active' });
    const workers = await StorageAdapter.getWorkers();
    const workerMap = new Map(workers.map(w => [w.id, w]));

    const alerts = [];
    const now = Date.now();

    for (const shift of shifts) {
      const startMs = new Date(shift.startTime).getTime();
      const elapsedHours = Math.max(0, (now - startMs) / (1000 * 60 * 60));
      const worker = workerMap.get(shift.workerId) || { name: shift.workerName, sector: shift.sector };

      let severity = 'normal';
      let ruleTriggered = null;
      let recommendedAction = 'Continue standard monitoring';

      if (elapsedHours >= thresholds.MAX_DAILY_HOURS) {
        severity = 'critical';
        ruleTriggered = `Exceeded maximum daily threshold (${thresholds.MAX_DAILY_HOURS}h). Currently logged: ${elapsedHours.toFixed(1)}h`;
        recommendedAction = 'Mandatory shift suspension. Relieve worker immediately with guaranteed rest period.';
      } else if (elapsedHours >= thresholds.WARNING_DAILY_HOURS) {
        severity = 'warning';
        ruleTriggered = `Approaching daily threshold limit (${thresholds.WARNING_DAILY_HOURS}h - ${thresholds.MAX_DAILY_HOURS}h). Currently logged: ${elapsedHours.toFixed(1)}h`;
        recommendedAction = 'Dispatch relief worker. Prepare handover and verify hydration/rest break.';
      }

      if (severity !== 'normal') {
        alerts.push({
          id: `alert-${shift.id}`,
          shiftId: shift.id,
          workerId: shift.workerId,
          workerName: worker.name || shift.workerName,
          sector: shift.sector,
          siteLocation: shift.siteLocation,
          elapsedHours: parseFloat(elapsedHours.toFixed(2)),
          severity, // 'warning' | 'critical'
          ruleTriggered,
          recommendedAction,
          thresholdsApplied: thresholds,
          disclaimer: 'Labor policy rule-based alert only; not a medical or biometric evaluation.',
          timestamp: new Date().toISOString()
        });

        // Sync shift fatigueRisk flag
        if (shift.fatigueRisk !== severity) {
          await StorageAdapter.updateShift(shift.id, { fatigueRisk: severity });
        }
        // Sync worker status flag
        if (worker.id && severity === 'critical') {
          await StorageAdapter.updateWorker(worker.id, { status: 'flagged_fatigue' });
        }
      }
    }

    return alerts;
  }

  /**
   * Action to immediately enforce a rest break for a fatigued worker
   */
  static async enforceRestBreak(shiftId, managerNotes = 'Enforced rest break in accordance with labor safety thresholds') {
    const shifts = await StorageAdapter.getShifts();
    const targetShift = shifts.find(s => s.id === shiftId);
    if (!targetShift) throw new Error('Shift not found');

    const now = new Date();
    const startMs = new Date(targetShift.startTime).getTime();
    const finalHours = Math.max(0, (now.getTime() - startMs) / (1000 * 60 * 60));

    // End shift safely
    await StorageAdapter.updateShift(shiftId, {
      status: 'completed',
      endTime: now.toISOString(),
      hoursWorkedSoFar: parseFloat(finalHours.toFixed(2)),
      fatigueRisk: 'rest_enforced',
      resolutionNotes: managerNotes
    });

    // Reset worker status to off duty
    if (targetShift.workerId) {
      await StorageAdapter.updateWorker(targetShift.workerId, {
        status: 'off_duty',
        currentShiftId: null
      });
    }

    return {
      success: true,
      message: `Shift ${shiftId} closed and rest period initiated for worker ${targetShift.workerName}`,
      restPeriodEndsAt: new Date(now.getTime() + FATIGUE_THRESHOLDS.MIN_REST_HOURS_BETWEEN_SHIFTS * 3600 * 1000).toISOString()
    };
  }
}

module.exports = FatigueService;
