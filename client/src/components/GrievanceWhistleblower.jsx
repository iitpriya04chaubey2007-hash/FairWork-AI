import React, { useState } from 'react';
import {
  MessageSquareWarning,
  ShieldCheck,
  Search,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Send,
  Eye,
  FileText
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function GrievanceWhistleblower({
  grievances = [],
  selectedSector,
  onSubmitGrievance,
  onTrackGrievance,
  onUpdateGrievanceStatus,
  lang = 'en'
}) {
  const t = translations[lang] || translations.en;
  
  // Submit Form state
  const [formData, setFormData] = useState({
    sector: selectedSector === 'all' ? 'construction' : selectedSector,
    category: 'OVERTIME_COERCION',
    priority: 'High',
    description: '',
    location: '',
    isAnonymous: true,
    workerName: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState(null);

  // Tracking Lookup state
  const [trackingCodeInput, setTrackingCodeInput] = useState('');
  const [trackedGrievance, setTrackedGrievance] = useState(null);
  const [trackingError, setTrackingError] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Resolution Notes Modal
  const [selectedForResolution, setSelectedForResolution] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  // Filter list
  const filteredGrievances = grievances.filter(g => {
    return selectedSector === 'all' || g.sector === selectedSector;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      alert('Please describe your grievance.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await onSubmitGrievance(formData);
      if (res && res.trackingCode) {
        setSubmittedCode(res.trackingCode);
      }
      setFormData({
        sector: 'construction',
        category: 'OVERTIME_COERCION',
        priority: 'High',
        description: '',
        location: '',
        isAnonymous: true,
        workerName: ''
      });
    } catch (err) {
      alert('Submission failed: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!trackingCodeInput.trim()) return;

    try {
      setTrackingLoading(true);
      setTrackingError(null);
      const res = await onTrackGrievance(trackingCodeInput.trim());
      if (res && res.grievance) {
        setTrackedGrievance(res.grievance);
      } else {
        setTrackingError('No grievance record found with this code.');
      }
    } catch (err) {
      setTrackingError(err.message || 'Tracking lookup failed.');
      setTrackedGrievance(null);
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleResolveGrievance = async (e) => {
    e.preventDefault();
    if (!selectedForResolution) return;

    try {
      await onUpdateGrievanceStatus(selectedForResolution.id, {
        status: 'resolved',
        officialNotes: resolutionNotes || 'Resolved through labor compliance intervention.'
      });
      setSelectedForResolution(null);
      setResolutionNotes('');
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <MessageSquareWarning className="w-5 h-5 text-teal-600" />
            <span>{t.grievances.title}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Safe, confidential whistleblowing and grievance management. Zero tolerance for retaliation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 self-start md:self-auto">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted Anonymous Channel Active</span>
        </div>
      </div>

      {/* Two-Column Grid: Submit Grievance & Anonymous Tracking Lookup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form: File Grievance (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-navy-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>{t.grievances.fileGrievance}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{t.grievances.anonymousNote}</p>
            </div>
          </div>

          {submittedCode && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Grievance Filed Successfully!</span>
              </div>
              <p className="text-xs text-emerald-700">
                Your private tracking code is:
              </p>
              <div className="p-2.5 bg-white rounded-lg border border-emerald-200 font-mono text-base font-extrabold text-navy-950 flex items-center justify-between">
                <span>{submittedCode}</span>
                <span className="text-[10px] text-slate-400 font-sans">Save this code</span>
              </div>
              <p className="text-[11px] text-slate-500">
                You can look up official investigation notes anytime using this code without revealing your name.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Anonymous Toggle Pill */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className={`w-4 h-4 ${formData.isAnonymous ? 'text-teal-600' : 'text-slate-400'}`} />
                <div>
                  <span className="text-xs font-bold text-navy-900 block">
                    Submit 100% Anonymously
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Your name and identity will NOT be attached to this complaint.
                  </span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
              />
            </div>

            {!formData.isAnonymous && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name (Optional)</label>
                <input
                  type="text"
                  value={formData.workerName}
                  onChange={(e) => setFormData({ ...formData, workerName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sector *</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none capitalize bg-white"
                >
                  <option value="construction">Construction</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Priority Level</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none bg-white font-medium"
                >
                  <option value="Low">Low - Welfare / Facilities</option>
                  <option value="Medium">Medium - Payment Inconsistency</option>
                  <option value="High">High - Wage Delay / Coercion</option>
                  <option value="Critical">Critical - Safety Hazard / Abuse</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none bg-white font-medium"
              >
                <option value="OVERTIME_COERCION">Forced Overtime / Extreme Fatigue</option>
                <option value="WAGE_DELAY">Wage Delay / Non-payment</option>
                <option value="UNDERPAYMENT">Unfair Wage Cut / Minimum Wage Breach</option>
                <option value="UNSAFE_CONDITIONS">Hazardous Conditions / Missing PPE</option>
                <option value="HARASSMENT">Verbal Abuse / Harassment / Discrimination</option>
                <option value="OTHER">General Welfare / Facilities Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location / Site Details</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Pier 19 Basement, Hospital Central Laundry, Bay 3"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description of Unfair Treatment *</label>
              <textarea
                rows="4"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what occurred, dates, involved supervisors, or conditions..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting Securely...' : 'Submit Grievance Securely'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Tracking Code Lookup & Whistleblower Safe Haven (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Tracking Search Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-teal-600" />
              <h3 className="font-bold text-sm text-navy-900">{t.grievances.trackingLookup}</h3>
            </div>
            <p className="text-xs text-slate-500">
              Enter your ticket code to view real-time investigation findings without disclosing your identity.
            </p>

            <form onSubmit={handleTrackSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={trackingCodeInput}
                onChange={(e) => setTrackingCodeInput(e.target.value)}
                placeholder="e.g. FW-GRV-7101"
                className="w-full px-3 py-2 font-mono text-sm border border-slate-300 rounded-xl outline-none uppercase focus:border-teal-500"
              />

              <button
                type="submit"
                disabled={trackingLoading}
                className="w-full py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-1.5"
              >
                <span>{trackingLoading ? 'Checking...' : t.grievances.trackButton}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {trackingError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{trackingError}</span>
              </div>
            )}

            {trackedGrievance && (
              <div className="p-4 bg-slate-50 border border-teal-200 rounded-xl space-y-2 text-xs animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-navy-900">{trackedGrievance.trackingCode}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    trackedGrievance.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {trackedGrievance.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="text-slate-600 space-y-1 pt-1 border-t border-slate-200">
                  <div>Category: <strong className="text-slate-800">{trackedGrievance.category}</strong></div>
                  <div>Filed: {new Date(trackedGrievance.timestamp).toLocaleDateString()}</div>
                </div>

                <div className="p-2.5 bg-white rounded border border-slate-200 text-slate-700">
                  <span className="font-bold text-navy-900 block mb-0.5">Official Inspector Notes:</span>
                  <p className="italic text-slate-600">{trackedGrievance.officialNotes || 'Assigned to compliance officer.'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Whistleblower Rights Callout */}
          <div className="bg-gradient-to-br from-navy-950 to-navy-900 text-white p-5 rounded-2xl border border-navy-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-teal-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Statutory Whistleblower Protections</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Under FairWork AI protocol, any report submitted anonymously has its origin IP stripped and is cryptographically hashed. 
              Employers face audit sanctions if punitive actions are attempted.
            </p>
          </div>

        </div>

      </div>

      {/* Active Grievances Ledger & Inspector Resolution */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-navy-900 flex items-center gap-2">
            <MessageSquareWarning className="w-4 h-4 text-teal-600" />
            <span>Grievances & Audits ({filteredGrievances.length})</span>
          </h3>
          <span className="text-xs text-slate-500">Compliance officer dashboard</span>
        </div>

        <div className="space-y-3">
          {filteredGrievances.map(g => {
            const isResolved = g.status === 'resolved';
            return (
              <div
                key={g.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-teal-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                      {g.trackingCode}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded capitalize">
                      {g.sector}
                    </span>
                    <span className="text-xs font-bold text-navy-900">{g.category.replace(/_/g, ' ')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${
                      isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {g.status.replace(/_/g, ' ')}
                    </span>
                    {!isResolved && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedForResolution(g);
                          setResolutionNotes('');
                        }}
                        className="px-2.5 py-1 bg-navy-900 hover:bg-navy-800 text-white text-[11px] font-bold rounded-lg transition-colors"
                      >
                        Resolve / Update
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {g.description}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                  <span className="font-bold text-navy-900 block">Investigation Status & Audit Findings:</span>
                  <p className="text-slate-600">{g.officialNotes || 'Under inspection.'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Resolve / Update Grievance */}
      {selectedForResolution && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="bg-navy-900 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Update Grievance Ticket</h3>
                <p className="text-xs text-teal-300 font-mono">{selectedForResolution.trackingCode}</p>
              </div>
              <button
                onClick={() => setSelectedForResolution(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleResolveGrievance} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Investigation & Resolution Notes *
                </label>
                <textarea
                  rows="3"
                  required
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Record corrective actions taken, retroactive payments credited, or policy adjustments..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedForResolution(null)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  Mark as Resolved & Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
