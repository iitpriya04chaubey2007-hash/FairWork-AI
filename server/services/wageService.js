// Wage Calculation & Transparency Service

const { SECTOR_METADATA } = require('../config/constants');
const StorageAdapter = require('../storage/storageAdapter');

class WageService {
  /**
   * Calculates transparent wages with overtime and hazard rate breakdowns
   */
  static calculateWageRecord({
    worker,
    standardHours = 48,
    overtimeHours = 0,
    hourlyRate = null,
    payPeriod = null
  }) {
    const rate = hourlyRate || worker.hourlyRate || (worker.dailyBaseRate ? worker.dailyBaseRate / 8 : 100);
    const sectorMeta = SECTOR_METADATA[worker.sector] || { hazardMultiplier: 1.0 };

    const basePay = parseFloat((standardHours * rate).toFixed(2));
    const overtimeRate = rate * 1.5;
    const overtimePay = parseFloat((overtimeHours * overtimeRate).toFixed(2));

    // Hazard allowance: percentage uplift over base pay
    const hazardDifferentialPercent = Math.round((sectorMeta.hazardMultiplier - 1.0) * 100);
    const hazardAllowance = parseFloat((basePay * (sectorMeta.hazardMultiplier - 1.0)).toFixed(2));

    const deductions = 0.00;
    const netPayable = parseFloat((basePay + overtimePay + hazardAllowance - deductions).toFixed(2));

    return {
      workerId: worker.id,
      workerName: worker.name,
      sector: worker.sector,
      payPeriod: payPeriod || `2026-W${Math.ceil(new Date().getDate() / 7)}`,
      standardHours,
      overtimeHours,
      baseHourlyRate: rate,
      basePay,
      overtimePay,
      hazardAllowance,
      hazardDifferentialPercent,
      deductions,
      netPayable,
      paymentStatus: 'approved_pending_transfer',
      transactionRef: null,
      disbursedDate: null,
      notes: `Standard wage calculation (${standardHours}h standard @ ${rate}/h, ${overtimeHours}h OT @ ${overtimeRate}/h, +${hazardDifferentialPercent}% hazard pay for ${worker.sector})`
    };
  }

  /**
   * Marks a wage record as disbursed with an audit transaction reference
   */
  static async disburseWage(wageId, customRef = null) {
    const txnRef = customRef || `TXN-FW-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toISOString();

    const updated = await StorageAdapter.updateWage(wageId, {
      paymentStatus: 'disbursed',
      transactionRef: txnRef,
      disbursedDate: now,
      notes: 'Disbursed and logged onto transparent wage ledger.'
    });

    return updated;
  }

  /**
   * Generates a standard CSV report string for wage compliance audits
   */
  static generateCSVReport(wages) {
    const headers = [
      'Wage Record ID',
      'Worker ID',
      'Worker Name',
      'Sector',
      'Pay Period',
      'Standard Hours',
      'Overtime Hours',
      'Base Hourly Rate',
      'Base Pay',
      'Overtime Pay (1.5x)',
      'Hazard Allowance',
      'Deductions',
      'Net Payable',
      'Payment Status',
      'Transaction Ref',
      'Disbursed Date',
      'Audit Notes'
    ];

    const rows = wages.map(w => [
      `"${w.id}"`,
      `"${w.workerId}"`,
      `"${w.workerName.replace(/"/g, '""')}"`,
      `"${w.sector}"`,
      `"${w.payPeriod}"`,
      w.standardHours,
      w.overtimeHours,
      w.baseHourlyRate,
      w.basePay,
      w.overtimePay,
      w.hazardAllowance,
      w.deductions,
      w.netPayable,
      `"${w.paymentStatus}"`,
      `"${w.transactionRef || 'N/A'}"`,
      `"${w.disbursedDate || 'N/A'}"`,
      `"${(w.notes || '').replace(/"/g, '""')}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}

module.exports = WageService;
