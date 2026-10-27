import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertOctagon,
  Info,
  PauseCircle,
  PlusCircle,
  X,
  HardHat,
  Stethoscope,
  Factory,
  GraduationCap
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function SafetyFatigueMonitor({
  fatigueAlerts = [],
  safetyIncidents = [],
  selectedSector,
  onEnforceRest,
  onReportIncident,
  thresholds = {},
  lang = 'en'
}) {
  const t = translations[lang] || translations.en;
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [incidentForm, setIncidentForm] = useState({
    sector: selectedSector === 'all' ? 'construction' : selectedSector,
    workerName: '',
    incidentType: 'Near-Miss / Slip & Fall',
    severity: 'Medium',
    location: '',
    description: '',
    immediateActionTaken: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Filter incidents
  const filteredIncidents = safetyIncidents.filter(i => {
    return selectedSector === 'all' || i.sector === selectedSector;
  });

  const filteredAlerts = fatigueAlerts.filter(a => {
    return selectedSector === 'all' || a.sector === selectedSector;
  });

  const handleIncidentSubmit = async (e) => {
    e.preventDefault();
    if (!incidentForm.description.trim()) {
      alert('Please describe the incident.');
      return;
    }

    try {
      setSubmitting(true);
      await onReportIncident(incidentForm);
      setShowIncidentModal(false);
      setIncidentForm({
        sector: 'construction',
        workerName: '',
        incidentType: 'Near-Miss / Slip & Fall',
        severity: 'Medium',
        location: '',
        description: '',
        immediateActionTaken: ''
      });
    } catch (err) {
      alert('Failed to report incident: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Incident CTA */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-teal-600" />
            <span>{t.safety.title}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rule-based working-hour fatigue prevention and incident reporting across high-hazard sectors.
          </p>
        </div>

        <button
          onClick={() => setShowIncidentModal(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.safety.reportIncident}</span>
        </button>
      </div>

      {/* Mandatory Non-Medical Disclaimer Box */}
      <div className="p-4 bg-navy-950 text-white rounded-2xl border border-teal-500/40 shadow-sm flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold text-teal-300 uppercase tracking-wider block">
            Statutory Working-Hour Alert Engine (Non-Medical Notice)
          </span>
          <p className="text-slate-300 leading-relaxed">
            {t.safety.fatigueDisclaimer} Working-hour caps are calibrated to statutory labor guidelines: 
            <strong> {thresholds.MAX_DAILY_HOURS || 10}h maximum daily shift</strong>, 
            <strong> {thresholds.WARNING_DAILY_HOURS || 8.5}h warning threshold</strong>, and a mandatory 
            <strong> {thresholds.MIN_REST_HOURS_BETWEEN_SHIFTS || 10}h rest interval</strong> between consecutive shifts.
          </p>
        </div>
      </div>

      {/* Live Fatigue Alerts Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-navy-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Active Fatigue Rule Alerts ({filteredAlerts.length})</span>
          </h3>
          <span className="text-xs text-slate-500">Live shift tracking</span>
        </div>

        {filteredAlerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAlerts.map(alert => {
              const isCritical = alert.severity === 'critical';
              return (
                <div
                  key={alert.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCritical
                      ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-400 shadow-md'
                      : 'bg-amber-50 border-amber-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                          isCritical ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                        }`}>
                          {alert.severity} Risk
                        </span>
                        <span className="text-xs font-semibold capitalize text-slate-600">
                          {alert.sector} Sector
                        </span>
                      </div>
                      <h4 className="font-extrabold text-navy-900 text-base mt-1">
                        {alert.workerName}
                      </h4>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-black text-rose-700 font-mono">
                        {alert.elapsedHours}h
                      </span>
                      <span className="block text-[10px] text-slate-500 font-semibold uppercase">Elapsed</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 space-y-1 my-3 bg-white/80 p-3 rounded-xl border border-slate-200">
                    <p className="font-semibold text-rose-800">
                      ⚠️ Trigger: {alert.ruleTriggered}
                    </p>
                    <p className="text-slate-600">
                      Location: {alert.siteLocation}
                    </p>
                    <p className="text-teal-800 font-medium">
                      Recommended: {alert.recommendedAction}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-[10px] text-slate-500 italic">
                      Statutory Rest Policy Active
                    </span>

                    <button
                      type="button"
                      onClick={() => onEnforceRest(alert.shiftId)}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <PauseCircle className="w-3.5 h-3.5" />
                      <span>{t.safety.enforceRest}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="font-bold text-slate-700 text-sm">All Active Shifts Within Safe Thresholds</p>
            <p className="mt-0.5">No workers currently exceed statutory working-hour limits.</p>
          </div>
        )}
      </div>

      {/* Safety Incidents Log */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-navy-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-teal-600" />
            <span>Safety Incident & Near-Miss Log ({filteredIncidents.length})</span>
          </h3>
          <span className="text-xs text-slate-500">Continuous safety inspection</span>
        </div>

        <div className="space-y-3">
          {filteredIncidents.map(inc => (
            <div
              key={inc.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-teal-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      inc.severity === 'Critical'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : inc.severity === 'High'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-teal-100 text-teal-800 border border-teal-300'
                    }`}>
                      {inc.severity} Severity
                    </span>
                    <span className="text-xs font-bold text-navy-900">{inc.incidentType}</span>
                    <span className="text-xs text-slate-400">• {new Date(inc.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Sector: <strong className="capitalize text-slate-700">{inc.sector}</strong> | Location: {inc.location} | Reporter: {inc.workerName}
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full self-start sm:self-auto capitalize">
                  ✓ {inc.status}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {inc.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-700 block text-[11px] uppercase">Immediate Action Taken:</span>
                  <span className="text-slate-600">{inc.immediateActionTaken}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 block text-[11px] uppercase">Preventive Standard:</span>
                  <span className="text-slate-600">{inc.preventiveMeasure}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Report Incident */}
      {showIncidentModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="bg-rose-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Report Safety Hazard / Near-Miss</h3>
                <p className="text-xs text-rose-200">Protects coworkers and initiates corrective root-cause action</p>
              </div>
              <button
                onClick={() => setShowIncidentModal(false)}
                className="text-rose-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleIncidentSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sector *</label>
                  <select
                    value={incidentForm.sector}
                    onChange={(e) => setIncidentForm({ ...incidentForm, sector: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none capitalize bg-white"
                  >
                    <option value="construction">Construction</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="manufacturing">Manufacturing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Severity *</label>
                  <select
                    value={incidentForm.severity}
                    onChange={(e) => setIncidentForm({ ...incidentForm, severity: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none bg-white font-medium"
                  >
                    <option value="Low">Low (Advisory)</option>
                    <option value="Medium">Medium (Attention required)</option>
                    <option value="High">High (Immediate hazard)</option>
                    <option value="Critical">Critical (Immediate stop-work)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Incident Type *</label>
                <input
                  type="text"
                  required
                  value={incidentForm.incidentType}
                  onChange={(e) => setIncidentForm({ ...incidentForm, incidentType: e.target.value })}
                  placeholder="e.g. Scaffolding clamp slip, Chemical splash, Machine interlock lag"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Site Location *</label>
                <input
                  type="text"
                  required
                  value={incidentForm.location}
                  onChange={(e) => setIncidentForm({ ...incidentForm, location: e.target.value })}
                  placeholder="e.g. Flyover Pier 18, ICU Isolation Unit, Stamping Bay Plant 2"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={incidentForm.description}
                  onChange={(e) => setIncidentForm({ ...incidentForm, description: e.target.value })}
                  placeholder="Clearly describe what happened or the hazardous condition observed..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Immediate Action Taken</label>
                <input
                  type="text"
                  value={incidentForm.immediateActionTaken}
                  onChange={(e) => setIncidentForm({ ...incidentForm, immediateActionTaken: e.target.value })}
                  placeholder="e.g. Area cordoned off, supervisor notified, tool quarantined"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowIncidentModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
                >
                  {submitting ? 'Submitting...' : 'Submit Incident Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
