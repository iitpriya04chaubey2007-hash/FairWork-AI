import React from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Coins,
  AlertTriangle,
  Users,
  CheckCircle2,
  HardHat,
  Stethoscope,
  GraduationCap,
  Factory
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function AdminAnalytics({
  analyticsData = {},
  selectedSector,
  lang = 'en'
}) {
  const t = translations[lang] || translations.en;
  const summary = analyticsData.summary || {};
  const sectorStats = analyticsData.sectorStats || [];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            <span>Workforce Analytics & Labor Inspector Trends</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-sector compliance, wage fairness index, and working-hour fatigue governance.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span className="text-xs font-bold text-teal-900">
            Fairness Index: {summary.overallFairnessScore || 94.6}%
          </span>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Enrolled Workers</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-navy-900">{summary.totalWorkers || 16}</div>
          <p className="text-[11px] text-teal-700 font-medium mt-1">
            {summary.activeOnDuty || 8} currently on duty
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Disbursed Wages</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">
            ₹{summary.totalDisbursed?.toLocaleString() || '36,161'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            ₹{summary.totalPending?.toLocaleString() || '16,377'} pending approval
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Safety Incidents</span>
            <ShieldCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-navy-900">{summary.totalSafetyIncidents || 4}</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">
            {summary.resolvedSafetyCount || 4} resolved & investigated
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Grievance Resolution</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-700">
            {summary.grievanceResolutionRate || 75}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {summary.resolvedGrievancesCount || 3} of {summary.totalGrievances || 4} resolved
          </p>
        </div>
      </div>

      {/* Visual Analytics Grid: SVG Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Sector Distribution & Active Duty */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-navy-900">Workforce Allocation by Sector</h3>
              <p className="text-xs text-slate-500">Total enrolled vs active on duty</p>
            </div>
            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              Active Roster
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {sectorStats.map((sec, idx) => {
              const maxWorkers = 5;
              const percent = Math.min(100, Math.round((sec.totalWorkers / maxWorkers) * 100));
              const activePercent = Math.min(100, Math.round((sec.activeOnDuty / maxWorkers) * 100));

              return (
                <div key={sec.sector} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 capitalize flex items-center gap-1.5">
                      {sec.sector === 'construction' && <HardHat className="w-3.5 h-3.5 text-amber-600" />}
                      {sec.sector === 'healthcare' && <Stethoscope className="w-3.5 h-3.5 text-teal-600" />}
                      <span>{sec.sector}</span>
                    </span>
                    <span className="font-mono text-slate-600">
                      <strong>{sec.activeOnDuty}</strong> on duty / {sec.totalWorkers} total
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${activePercent}%` }}
                      className="bg-teal-500 h-full rounded-l-full"
                      title={`${sec.activeOnDuty} active on shift`}
                    ></div>
                    <div
                      style={{ width: `${percent - activePercent}%` }}
                      className="bg-navy-900/40 h-full rounded-r-full"
                      title={`${sec.totalWorkers - sec.activeOnDuty} off duty`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <span>Active On-Shift</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-navy-900/40"></span>
              <span>Off-Duty</span>
            </span>
          </div>
        </div>

        {/* Chart 2: Average Wage Rates & Hazard Allowance */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-navy-900">Average Hourly Rate & Hazard Multiplier</h3>
              <p className="text-xs text-slate-500">Statutory base rate vs hazard differential</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Wage Equity
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {sectorStats.map((sec) => {
              const baseRate = sec.averageHourlyRate || 100;
              const mult = sec.metadata?.hazardMultiplier || 1.0;
              const hazardRate = Math.round(baseRate * mult);

              return (
                <div key={sec.sector} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 capitalize">
                      {sec.sector}
                    </span>
                    <span className="font-mono text-slate-700">
                      Base: ₹{baseRate}/h → <strong className="text-teal-700">₹{hazardRate}/h</strong> (+{Math.round((mult - 1) * 100)}%)
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${Math.min(100, (baseRate / 140) * 100)}%` }}
                      className="bg-navy-800 h-full rounded-l-full"
                    ></div>
                    <div
                      style={{ width: `${Math.min(40, ((hazardRate - baseRate) / 140) * 100)}%` }}
                      className="bg-emerald-500 h-full rounded-r-full"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-navy-800"></span>
              <span>Base Hourly</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Hazard Differential</span>
            </span>
          </div>
        </div>

      </div>

      {/* Sector Compliance Scorecard */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-navy-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Sector Safety & Compliance Scorecard</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectorStats.map(sec => (
            <div key={sec.sector} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-navy-900">{sec.sector}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                  {sec.complianceScore}% Safe
                </span>
              </div>
              <div className="text-xs text-slate-500 space-y-0.5">
                <div>PPE Compliance: <strong className="text-slate-700">100%</strong></div>
                <div>Fatigue Infractions: <strong className="text-slate-700">{sec.safetyIncidentsCount > 1 ? '1 Alert' : '0 Alerts'}</strong></div>
                <div>Avg Payout Speed: <strong className="text-slate-700">&lt; 24h</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
