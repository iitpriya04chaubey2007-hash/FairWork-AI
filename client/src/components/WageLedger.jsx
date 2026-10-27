import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calculator,
  CheckCircle2,
  Clock,
  Printer,
  X,
  Coins,
  ShieldCheck,
  Eye,
  Filter,
  DollarSign
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function WageLedger({
  wages = [],
  workers = [],
  selectedSector,
  onCalculateWage,
  onDisburseWage,
  onExportCsv,
  lang = 'en'
}) {
  const t = translations[lang] || translations.en;
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [activeSlip, setActiveSlip] = useState(null);

  // Calculator Form state
  const [calcForm, setCalcForm] = useState({
    workerId: workers[0]?.id || '',
    standardHours: 48,
    overtimeHours: 6,
    payPeriod: '2026-W43'
  });
  const [calcPreview, setCalcPreview] = useState(null);
  const [calculating, setCalculating] = useState(false);

  // Filter wages
  const filteredWages = wages.filter(w => {
    const matchesSector = selectedSector === 'all' || w.sector === selectedSector;
    const matchesStatus = statusFilter === 'all' || w.paymentStatus === statusFilter;
    return matchesSector && matchesStatus;
  });

  const handleCalculatePreview = async (e) => {
    e.preventDefault();
    if (!calcForm.workerId) return;

    try {
      setCalculating(true);
      const res = await onCalculateWage(calcForm);
      if (res && res.calculation) {
        setCalcPreview(res.calculation);
      }
    } catch (err) {
      alert('Wage calculation failed: ' + err.message);
    } finally {
      setCalculating(false);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Metrics & Actions */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <Coins className="w-5 h-5 text-teal-600" />
            <span>{t.wages.title}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent breakdown of standard hours, statutory 1.5x overtime, and sector hazard differentials.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              setCalcForm({
                workerId: workers[0]?.id || '',
                standardHours: 48,
                overtimeHours: 6,
                payPeriod: '2026-W43'
              });
              setCalcPreview(null);
              setShowCalculatorModal(true);
            }}
            className="px-3.5 py-2 bg-navy-900 hover:bg-navy-800 active:bg-navy-950 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4 text-teal-400" />
            <span>{t.wages.calculateWage}</span>
          </button>

          <button
            onClick={() => onExportCsv(selectedSector)}
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>{t.wages.downloadCsv}</span>
          </button>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Payment Status:</span>
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-300 text-xs rounded-xl font-medium outline-none text-slate-700"
          >
            <option value="all">All Payment Statuses</option>
            <option value="disbursed">Disbursed (Settled)</option>
            <option value="approved_pending_transfer">Approved (Pending Transfer)</option>
            <option value="under_review">Under Review / Inquiry</option>
          </select>
        </div>

        <div className="text-xs font-bold text-slate-600">
          Showing {filteredWages.length} of {wages.length} wage records
        </div>
      </div>

      {/* Wages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Pay Period</th>
                <th className="py-3 px-4">Worker & Sector</th>
                <th className="py-3 px-4 text-right">Standard Hrs</th>
                <th className="py-3 px-4 text-right">Overtime (1.5x)</th>
                <th className="py-3 px-4 text-right">Hazard Pay</th>
                <th className="py-3 px-4 text-right">Net Payable</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredWages.map(w => {
                const isDisbursed = w.paymentStatus === 'disbursed';
                return (
                  <tr key={w.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    <td className="py-3 px-4 font-mono font-medium text-slate-600 whitespace-nowrap">
                      {w.payPeriod}
                      <span className="block text-[10px] text-slate-400 font-sans">{w.id}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-navy-900">{w.workerName}</div>
                      <span className="text-[11px] text-slate-500 capitalize px-2 py-0.2 bg-slate-100 rounded inline-block mt-0.5">
                        {w.sector}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold">{w.standardHours}h</span>
                      <span className="block text-[10px] text-slate-400">@ ₹{w.baseHourlyRate}/h</span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold text-navy-900">₹{w.overtimePay}</span>
                      <span className="block text-[10px] text-slate-400">{w.overtimeHours}h OT</span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold text-teal-700">+₹{w.hazardAllowance}</span>
                      <span className="block text-[10px] text-teal-600 font-mono">
                        {w.sector === 'construction' ? '+25%' : w.sector === 'healthcare' || w.sector === 'manufacturing' ? '+20%' : '+5%'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-extrabold text-emerald-700">
                        ₹{w.netPayable.toLocaleString()}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isDisbursed
                          ? 'bg-emerald-100 text-emerald-800'
                          : w.paymentStatus === 'approved_pending_transfer'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isDisbursed && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        <span>{w.paymentStatus.replace(/_/g, ' ')}</span>
                      </span>
                      {w.transactionRef && (
                        <span className="block font-mono text-[9px] text-slate-400 mt-0.5 truncate max-w-[120px] mx-auto">
                          {w.transactionRef}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveSlip(w)}
                          title="View & Print Official Wage Slip"
                          className="p-1.5 text-navy-700 hover:text-navy-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {!isDisbursed && (
                          <button
                            type="button"
                            onClick={() => onDisburseWage(w.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition-colors shadow-2xs"
                          >
                            Disburse
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Transparent Wage Calculator */}
      {showCalculatorModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="bg-navy-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="font-bold text-base">Transparent Wage Slip Calculator</h3>
                  <p className="text-xs text-slate-300">Auditable formulas with overtime & hazard compensation</p>
                </div>
              </div>
              <button
                onClick={() => setShowCalculatorModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCalculatePreview} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Worker</label>
                <select
                  value={calcForm.workerId}
                  onChange={(e) => setCalcForm({ ...calcForm, workerId: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none bg-white font-medium"
                >
                  {workers.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.sector.toUpperCase()} - {w.trade} @ ₹{w.hourlyRate}/h)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Standard Hours</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={calcForm.standardHours}
                    onChange={(e) => setCalcForm({ ...calcForm, standardHours: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">Statutory 48h base</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Overtime Hours</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={calcForm.overtimeHours}
                    onChange={(e) => setCalcForm({ ...calcForm, overtimeHours: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                  />
                  <span className="text-[10px] text-teal-600 block mt-0.5">Calculated @ 1.5x rate</span>
                </div>
              </div>

              {/* Calculation Preview if generated */}
              {calcPreview && (
                <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2.5 text-xs text-navy-950 animate-in fade-in">
                  <div className="font-bold text-sm text-teal-900 border-b border-teal-200/80 pb-1.5 flex justify-between">
                    <span>Wage Breakdown</span>
                    <span className="font-mono text-emerald-800 text-base">₹{calcPreview.netPayable}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>Base Pay: <strong>₹{calcPreview.basePay}</strong></div>
                    <div>Overtime (1.5x): <strong>₹{calcPreview.overtimePay}</strong></div>
                    <div>Hazard Allowance (+{calcPreview.hazardDifferentialPercent}%): <strong className="text-teal-700">₹{calcPreview.hazardAllowance}</strong></div>
                    <div>Net Payable: <strong className="text-emerald-700">₹{calcPreview.netPayable}</strong></div>
                  </div>

                  <div className="text-[11px] text-slate-500 italic bg-white p-2 rounded border border-teal-100">
                    {calcPreview.notes}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCalculatorModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={calculating}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm"
                >
                  {calculating ? 'Calculating...' : 'Calculate & Record on Ledger'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Printable Pay Slip */}
      {activeSlip && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
            
            <div className="p-4 bg-navy-900 text-white flex items-center justify-between">
              <span className="font-bold text-sm">Official Wage Receipt</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintSlip}
                  className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setActiveSlip(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Printable Slip Container */}
            <div id="printable-slip" className="p-6 space-y-4 text-xs text-slate-800">
              
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
                <div>
                  <h2 className="text-xl font-extrabold text-navy-900">FairWork AI</h2>
                  <p className="text-[11px] text-slate-500">Transparent Manual Workforce Payroll Voucher</p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold">{activeSlip.id}</div>
                  <div className="text-[11px] text-slate-500">Period: {activeSlip.payPeriod}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Worker Name</span>
                  <span className="font-bold text-navy-900 text-sm">{activeSlip.workerName}</span>
                  <span className="text-[11px] text-slate-500 block capitalize">{activeSlip.sector} Sector</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Status</span>
                  <span className="font-bold uppercase text-emerald-700">{activeSlip.paymentStatus}</span>
                  <span className="font-mono text-[10px] text-slate-500 block">{activeSlip.transactionRef || 'Txn Pending'}</span>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="space-y-1.5 border-t border-b border-slate-200 py-3">
                <div className="flex justify-between">
                  <span>Standard Hours ({activeSlip.standardHours}h @ ₹{activeSlip.baseHourlyRate}/h)</span>
                  <span className="font-bold">₹{activeSlip.basePay?.toFixed(2) || (activeSlip.standardHours * activeSlip.baseHourlyRate).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-teal-800">
                  <span>Overtime Hours ({activeSlip.overtimeHours}h @ 1.5x rate)</span>
                  <span className="font-bold">+₹{activeSlip.overtimePay?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-teal-800">
                  <span>Sector Hazard Differential</span>
                  <span className="font-bold">+₹{activeSlip.hazardAllowance?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Statutory Deductions / Penalties</span>
                  <span className="font-bold">₹0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-extrabold pt-2">
                <span>Total Net Disbursed:</span>
                <span className="text-xl text-emerald-700">₹{activeSlip.netPayable.toLocaleString()}</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>FairWork Audited & Blockchain Hash Verifiable</span>
                </div>
                <span>Generated automatically</span>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
