import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  HardHat,
  Stethoscope,
  GraduationCap,
  Factory,
  ShieldCheck,
  AlertTriangle,
  Play,
  Award,
  Clock,
  CheckCircle2,
  Phone,
  Filter
} from 'lucide-react';
import WorkerSkillPassportModal from './WorkerSkillPassportModal';
import WorkerRegistrationModal from './WorkerRegistrationModal';
import { translations } from '../i18n/translations';

export default function EmployerDashboard({
  workers = [],
  shifts = [],
  selectedSector,
  setSelectedSector,
  onWorkerCreated,
  onCheckIn,
  onCheckOut,
  lang = 'en'
}) {
  const t = translations[lang] || translations.en;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedWorkerForPassport, setSelectedWorkerForPassport] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [workerToAssignShift, setWorkerToAssignShift] = useState(null);

  // Shift assignment state
  const [shiftForm, setShiftForm] = useState({
    shiftType: 'Day Shift',
    siteLocation: 'Main Zone B',
    taskDescription: '',
    hazardRating: 'Medium',
    requiredPPE: ['Hard Hat', 'Safety Shoes', 'Protective Gloves']
  });

  // Filter workers
  const filteredWorkers = workers.filter(w => {
    const matchesSector = selectedSector === 'all' || w.sector === selectedSector;
    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q ||
      w.name.toLowerCase().includes(q) ||
      w.trade.toLowerCase().includes(q) ||
      (w.passport?.passportNumber && w.passport.passportNumber.toLowerCase().includes(q));
    return matchesSector && matchesStatus && matchesSearch;
  });

  const getSectorIcon = (sector) => {
    switch (sector) {
      case 'construction': return HardHat;
      case 'healthcare': return Stethoscope;
      case 'education': return GraduationCap;
      case 'manufacturing': return Factory;
      default: return Users;
    }
  };

  const handleOpenShiftModal = (worker) => {
    setWorkerToAssignShift(worker);
    setShiftForm({
      shiftType: 'Day Shift',
      siteLocation: worker.sector === 'construction' ? 'Metro Pier Tower C' : worker.sector === 'healthcare' ? 'Emergency Isolation Wing' : 'Main Campus Area',
      taskDescription: `Operational duty for ${worker.trade}`,
      hazardRating: 'Medium',
      requiredPPE: ['Hard Hat', 'Safety Shoes', 'Protective Gloves']
    });
    setShowShiftModal(true);
  };

  const handleAssignShiftSubmit = async (e) => {
    e.preventDefault();
    if (!workerToAssignShift) return;

    try {
      await onCheckIn({
        workerId: workerToAssignShift.id,
        workerName: workerToAssignShift.name,
        sector: workerToAssignShift.sector,
        shiftType: shiftForm.shiftType,
        siteLocation: shiftForm.siteLocation,
        taskDescription: shiftForm.taskDescription || `Duty for ${workerToAssignShift.trade}`,
        hazardRating: shiftForm.hazardRating,
        requiredPPE: shiftForm.requiredPPE
      });
      setShowShiftModal(false);
      setWorkerToAssignShift(null);
    } catch (err) {
      alert('Failed to assign shift: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls: Search, Filters & Action Button */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            <span>Worker Management & Roster</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status, skill passports, shift allocations & compliance across all 4 sectors.
          </p>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t.worker.registerWorker}</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.common.search}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-300 text-xs rounded-xl font-medium outline-none text-slate-700 shadow-2xs"
          >
            <option value="all">All Statuses</option>
            <option value="on_shift">On Shift</option>
            <option value="off_duty">Off Duty</option>
            <option value="flagged_fatigue">Fatigue Alert</option>
          </select>
        </div>
      </div>

      {/* Worker Cards Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkers.map(worker => {
          const SectorIcon = getSectorIcon(worker.sector);
          const isFatigued = worker.status === 'flagged_fatigue';
          const isOnShift = worker.status === 'on_shift';
          const activeShift = shifts.find(s => s.workerId === worker.id && s.status === 'active');

          return (
            <div
              key={worker.id}
              className={`p-5 bg-white rounded-2xl border transition-all shadow-sm hover:shadow-md flex flex-col justify-between ${
                isFatigued
                  ? 'border-rose-400 bg-rose-50/20 ring-1 ring-rose-400'
                  : isOnShift
                  ? 'border-teal-300'
                  : 'border-slate-200'
              }`}
            >
              <div>
                {/* Header: Sector badge & Status badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 capitalize">
                    <SectorIcon className="w-3 h-3 text-teal-600" />
                    <span>{worker.sector}</span>
                  </span>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isFatigued
                      ? 'bg-rose-100 text-rose-800 animate-pulse'
                      : isOnShift
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isFatigued ? (
                      <>
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        <span>Fatigue Flag (&gt;10h)</span>
                      </>
                    ) : isOnShift ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                        <span>On Shift</span>
                      </>
                    ) : (
                      <span>Off Duty</span>
                    )}
                  </span>
                </div>

                {/* Worker Identity */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-teal-300 font-bold text-lg flex items-center justify-center shrink-0 border border-teal-500/40 shadow-xs">
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-base">{worker.name}</h3>
                    <p className="text-xs font-semibold text-teal-800">{worker.trade}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Exp: {worker.experienceYears} yrs • {worker.phone}
                    </p>
                  </div>
                </div>

                {/* Rates & Safety Score */}
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl text-xs mb-3">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Daily Wage</span>
                    <span className="font-extrabold text-navy-900">₹{worker.dailyBaseRate}</span>
                    <span className="text-[10px] text-slate-400 block">(₹{worker.hourlyRate}/h)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Safety Score</span>
                    <span className="font-extrabold text-emerald-700">
                      {worker.passport?.safetyScore || 95}%
                    </span>
                    <span className="text-[10px] text-slate-400 block">{worker.passport?.verifiedHours || 1200}h verified</span>
                  </div>
                </div>

                {/* Active Shift Details if present */}
                {activeShift && (
                  <div className="p-2.5 bg-teal-50/70 border border-teal-200/60 rounded-xl text-xs text-teal-900 space-y-1 mb-3">
                    <div className="font-bold flex items-center justify-between">
                      <span>Shift: {activeShift.shiftType}</span>
                      <span className="text-[11px] font-mono text-teal-700">{activeShift.hoursWorkedSoFar || 0}h logged</span>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate">{activeShift.siteLocation}</div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedWorkerForPassport(worker)}
                  className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-teal-600" />
                  <span>Passport</span>
                </button>

                {isOnShift && activeShift ? (
                  <button
                    type="button"
                    onClick={() => onCheckOut(activeShift.id)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-lg transition-colors"
                  >
                    End Shift
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenShiftModal(worker)}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Assign Shift</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-base">No workers match this filter</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search criteria or register a new manual worker.
          </p>
        </div>
      )}

      {/* Modal: Skill Passport */}
      {selectedWorkerForPassport && (
        <WorkerSkillPassportModal
          worker={selectedWorkerForPassport}
          onClose={() => setSelectedWorkerForPassport(null)}
          lang={lang}
        />
      )}

      {/* Modal: Worker Registration */}
      {showRegisterModal && (
        <WorkerRegistrationModal
          onClose={() => setShowRegisterModal(false)}
          onWorkerCreated={onWorkerCreated}
          lang={lang}
        />
      )}

      {/* Modal: Assign Shift */}
      {showShiftModal && workerToAssignShift && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="bg-navy-900 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Assign Shift & Task</h3>
                <p className="text-xs text-teal-300">{workerToAssignShift.name} ({workerToAssignShift.trade})</p>
              </div>
              <button
                onClick={() => setShowShiftModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssignShiftSubmit} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Shift Type</label>
                <select
                  value={shiftForm.shiftType}
                  onChange={(e) => setShiftForm({ ...shiftForm, shiftType: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                >
                  <option value="Day Shift">Day Shift (08:00 - 16:30)</option>
                  <option value="Evening Shift">Evening Shift (16:00 - 00:00)</option>
                  <option value="Night Shift">Night Shift (00:00 - 08:00)</option>
                  <option value="Overtime Span">Overtime Extended Run</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Site / Work Location</label>
                <input
                  type="text"
                  required
                  value={shiftForm.siteLocation}
                  onChange={(e) => setShiftForm({ ...shiftForm, siteLocation: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Task Assignment</label>
                <textarea
                  rows="2"
                  value={shiftForm.taskDescription}
                  onChange={(e) => setShiftForm({ ...shiftForm, taskDescription: e.target.value })}
                  placeholder={`Describe duties for ${workerToAssignShift.trade}...`}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hazard Level</label>
                <select
                  value={shiftForm.hazardRating}
                  onChange={(e) => setShiftForm({ ...shiftForm, hazardRating: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none"
                >
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk (Requires PPE Double Check)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowShiftModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm"
                >
                  Confirm & Dispatch Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
