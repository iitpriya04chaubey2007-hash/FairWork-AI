import React, { useState } from 'react';
import { X, UserPlus, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WorkerRegistrationModal({ onClose, onWorkerCreated, sectors = [], lang = 'en' }) {
  const [formData, setFormData] = useState({
    name: '',
    sector: 'construction',
    trade: '',
    experienceYears: 3,
    phone: '',
    dailyBaseRate: 850,
    preferredLanguage: lang,
    emergencyName: '',
    emergencyPhone: '',
    skillsInput: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError('Please provide the worker’s full name.');
      return;
    }
    if (!formData.trade.trim()) {
      setError('Please specify the primary trade or skill.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please provide a valid contact telephone number.');
      return;
    }

    try {
      setLoading(true);
      const skillsArray = formData.skillsInput
        ? formData.skillsInput.split(',').map(s => s.trim()).filter(Boolean)
        : [formData.trade.trim()];

      const payload = {
        name: formData.name.trim(),
        sector: formData.sector,
        trade: formData.trade.trim(),
        experienceYears: parseInt(formData.experienceYears) || 1,
        phone: formData.phone.trim(),
        dailyBaseRate: parseFloat(formData.dailyBaseRate) || 800,
        preferredLanguage: formData.preferredLanguage,
        emergencyContact: {
          name: formData.emergencyName.trim() || 'Next of Kin',
          phone: formData.emergencyPhone.trim() || formData.phone.trim()
        },
        skills: skillsArray
      };

      await onWorkerCreated(payload);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || 'Worker registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy-900 to-teal-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <UserPlus className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Register New Manual Worker</h3>
              <p className="text-xs text-teal-100">Issues digital identity & verifiable Skill Passport</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Worker registered successfully! Generating Skill Passport...</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Patel"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Work Sector *
              </label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none capitalize bg-white"
              >
                <option value="construction">🏗️ Construction</option>
                <option value="healthcare">🏥 Healthcare (Hospitals)</option>
                <option value="education">🏫 Education (Colleges/Schools)</option>
                <option value="manufacturing">🏭 Manufacturing (Factories)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Trade / Role *
              </label>
              <input
                type="text"
                required
                value={formData.trade}
                onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                placeholder="e.g. Scaffolder, Orderly, Machine Operator"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Contact Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Daily Base Wage (₹)
              </label>
              <input
                type="number"
                min="100"
                step="50"
                value={formData.dailyBaseRate}
                onChange={(e) => setFormData({ ...formData, dailyBaseRate: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
              <span className="text-[11px] text-slate-500 block mt-0.5">
                ≈ ₹{(formData.dailyBaseRate / 8).toFixed(2)}/hr base rate
              </span>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              Emergency Safety Contact
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                placeholder="Contact Name (e.g. Spouse / Brother)"
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white"
              />
              <input
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                placeholder="Emergency Contact Phone"
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Key Trade Skills (Comma Separated)
            </label>
            <input
              type="text"
              value={formData.skillsInput}
              onChange={(e) => setFormData({ ...formData, skillsInput: e.target.value })}
              placeholder="e.g. Scaffolding Inspection, Fall Protection, Pipe Rigging"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register & Issue Passport</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
