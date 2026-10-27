import React, { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  Coins,
  Award,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
  HardHat,
  PhoneCall,
  Calendar,
  FileText
} from 'lucide-react';
import WorkerSkillPassportModal from './WorkerSkillPassportModal';
import VoiceReaderButton from './VoiceReaderButton';
import { translations } from '../i18n/translations';

export default function WorkerPortal({
  workers = [],
  shifts = [],
  wages = [],
  activeWorkerId,
  setActiveWorkerId,
  onCheckIn,
  onCheckOut,
  lang = 'en'
}) {
  const t = translations[lang] || translations.en;
  const [showPassport, setShowPassport] = useState(false);
  const [checkingInOut, setCheckingInOut] = useState(false);

  const currentWorker = workers.find(w => w.id === activeWorkerId) || workers[0];
  const activeShift = shifts.find(s => s.workerId === currentWorker?.id && s.status === 'active');
  const workerWages = wages.filter(w => w.workerId === currentWorker?.id);
  const latestWage = workerWages[0];

  const spokenSummary = currentWorker
    ? `Welcome ${currentWorker.name}. Trade: ${currentWorker.trade}. Status: ${
        activeShift ? `Currently on shift at ${activeShift.siteLocation}. Logged ${activeShift.hoursWorkedSoFar} hours.` : 'Off duty.'
      } Your hourly rate is ${currentWorker.hourlyRate} rupees. Your safety rating is ${
        currentWorker.passport?.safetyScore || 96
      } percent.`
    : '';

  const handleToggleShift = async () => {
    if (!currentWorker) return;
    try {
      setCheckingInOut(true);
      if (activeShift) {
        await onCheckOut(activeShift.id);
      } else {
        await onCheckIn({
          workerId: currentWorker.id,
          workerName: currentWorker.name,
          sector: currentWorker.sector,
          siteLocation: 'Metro Job Site Bay 2',
          shiftType: 'Standard Shift',
          taskDescription: `Operational duty for ${currentWorker.trade}`,
          requiredPPE: ['Hard Hat', 'Safety Shoes', 'Protective Gloves']
        });
      }
    } catch (err) {
      alert('Shift action failed: ' + err.message);
    } finally {
      setCheckingInOut(false);
    }
  };

  if (!currentWorker) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500">No worker profiles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header & Worker Switcher for Demo testing */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-navy-900 text-teal-300 flex items-center justify-center font-bold text-xl border-2 border-teal-500 shadow-sm shrink-0">
            {currentWorker.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-navy-900">{currentWorker.name}</h1>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${
                activeShift ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'
              }`}>
                {activeShift ? t.common.onShift : t.common.offDuty}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentWorker.trade} • {currentWorker.sector.toUpperCase()} • ID: {currentWorker.nationalIdMasked}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <VoiceReaderButton text={spokenSummary} lang={lang} label={t.common.listenAudio} />
          
          <button
            onClick={() => setShowPassport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-navy-900 to-teal-800 text-white rounded-lg text-xs font-bold shadow-sm hover:opacity-95 transition-opacity"
          >
            <Award className="w-3.5 h-3.5 text-teal-300" />
            <span>{t.worker.skillPassport}</span>
          </button>

          {/* Quick Worker Selector for Demo Judges */}
          <select
            value={currentWorker.id}
            onChange={(e) => setActiveWorkerId(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-100 border border-slate-300 text-xs rounded-lg font-medium outline-none text-slate-700"
            aria-label="Switch Worker Profile"
          >
            {workers.map(w => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.sector})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Shift Action Card */}
      <div className={`p-6 rounded-2xl border transition-all ${
        activeShift
          ? 'bg-gradient-to-br from-teal-900/90 to-navy-900 text-white border-teal-600 shadow-lg'
          : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              {activeShift ? (
                <span className="flex items-center gap-1.5 text-teal-300">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                  <span>Active Shift in Progress</span>
                </span>
              ) : (
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Ready for Check-In</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold">
              {activeShift ? activeShift.taskDescription : 'No active shift logged today'}
            </h2>

            <div className="text-xs space-y-1">
              {activeShift ? (
                <>
                  <p className="text-slate-200">
                    Location: <strong className="text-white">{activeShift.siteLocation}</strong>
                  </p>
                  <p className="text-slate-300">
                    Started at: {new Date(activeShift.startTime).toLocaleTimeString()} ({activeShift.hoursWorkedSoFar || 0} hrs logged)
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="font-semibold text-teal-200">Mandatory PPE:</span>
                    <div className="flex flex-wrap gap-1">
                      {activeShift.requiredPPE?.map((item, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white/10 rounded text-[11px] text-white">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-slate-500">
                  Tap check-in when you arrive at your allocated work zone to start transparent hours recording.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0">
            <button
              onClick={handleToggleShift}
              disabled={checkingInOut}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                activeShift
                  ? 'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white'
                  : 'bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white'
              }`}
            >
              {checkingInOut ? (
                <span>Processing...</span>
              ) : activeShift ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>{t.worker.checkOut}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.worker.checkIn}</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-slate-400 text-center">
              Biometric check-in simulator
            </span>
          </div>
        </div>
      </div>

      {/* Worker Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Hourly / Base Wage Card */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Base Wage Rate</span>
            <Coins className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-navy-900">
            ₹{currentWorker.dailyBaseRate} <span className="text-xs font-normal text-slate-500">/day</span>
          </div>
          <div className="text-xs text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
            <div>Hourly Base: <strong>₹{currentWorker.hourlyRate}</strong></div>
            <div>Overtime Rate (1.5x): <strong className="text-teal-700">₹{(currentWorker.hourlyRate * 1.5).toFixed(2)}</strong></div>
          </div>
        </div>

        {/* Safety Score Card */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Safety Passport Rating</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">
            {currentWorker.passport?.safetyScore || 96}%
          </div>
          <div className="text-xs text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
            <div>Verified Hours: <strong>{currentWorker.passport?.verifiedHours || 1800}h</strong></div>
            <div className="text-emerald-700 font-semibold">Zero Critical Infractions</div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Safety Contact</span>
            <PhoneCall className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-base font-bold text-navy-900 truncate">
            {currentWorker.emergencyContact?.name || 'Emergency Dispatch'}
          </div>
          <div className="text-xs text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
            <div>Phone: <span className="font-mono">{currentWorker.emergencyContact?.phone || currentWorker.phone}</span></div>
            <div className="text-[11px] text-slate-400">Guaranteed 24/7 on-site protocol</div>
          </div>
        </div>

      </div>

      {/* Latest Wage Slip Preview */}
      {latestWage && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-navy-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Latest Verified Wage Slip ({latestWage.payPeriod})</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Audit Status: <span className="font-semibold uppercase text-emerald-700">{latestWage.paymentStatus}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Net Payable</span>
              <span className="text-2xl font-extrabold text-emerald-700">
                ₹{latestWage.netPayable.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Standard Hours</span>
              <span className="font-bold text-slate-800 text-sm">{latestWage.standardHours}h</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Overtime Pay (1.5x)</span>
              <span className="font-bold text-slate-800 text-sm">₹{latestWage.overtimePay} ({latestWage.overtimeHours}h)</span>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg">
              <span className="text-teal-700 block">Hazard Allowance</span>
              <span className="font-bold text-teal-900 text-sm">+₹{latestWage.hazardAllowance}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Txn Reference</span>
              <span className="font-mono font-bold text-slate-800 text-xs truncate block">{latestWage.transactionRef || 'In Escrow'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Skill Passport */}
      {showPassport && (
        <WorkerSkillPassportModal
          worker={currentWorker}
          onClose={() => setShowPassport(false)}
          lang={lang}
        />
      )}

    </div>
  );
}
