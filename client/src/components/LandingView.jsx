import React from 'react';
import {
  ShieldCheck,
  HardHat,
  Stethoscope,
  GraduationCap,
  Factory,
  ArrowRight,
  Clock,
  Coins,
  AlertTriangle,
  Award,
  CheckCircle,
  TrendingUp,
  FileCheck2,
  Users
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function LandingView({
  setActiveTab,
  setSelectedSector,
  analyticsSummary = {},
  lang = 'en'
}) {
  const t = translations[lang] || translations.en;

  const sectors = [
    {
      id: 'construction',
      name: 'Construction & Civil Works',
      icon: HardHat,
      color: 'border-amber-500/40 bg-amber-50/50',
      tagColor: 'bg-amber-100 text-amber-900',
      description: 'Protects scaffolders, masons, and riggers. Monitors fall hazards, high-elevation safety harness compliance, and applies +25% statutory hazard allowance.',
      workersCount: 5,
      hazard: '+25% Hazard Pay'
    },
    {
      id: 'healthcare',
      name: 'Hospitals & Healthcare Facilities',
      icon: Stethoscope,
      color: 'border-teal-500/40 bg-teal-50/50',
      tagColor: 'bg-teal-100 text-teal-900',
      description: 'Supports sanitation teams, biohazard handlers, and ward orderlies. Enforces infection control PPE, sterile disposal, and applies +20% biohazard pay.',
      workersCount: 5,
      hazard: '+20% Biohazard Pay'
    }
  ];

  const comparisons = [
    {
      problem: 'Unclear Wage Calculations & Delayed Payments',
      solution: 'Automated Transparent Ledger with 1.5x Overtime & Sector Hazard Differentials',
      icon: Coins
    },
    {
      problem: 'Dangerous Fatigue Overload & Site Accidents',
      solution: 'Rule-based Working-Hour Fatigue Engine (>10h Shift Auto-Intervention)',
      icon: AlertTriangle
    },
    {
      problem: 'Manual Workers Have No Portable Proof of Experience',
      solution: 'Verifiable Digital Skill Passport with Verified Hours & QR Verification',
      icon: Award
    },
    {
      problem: 'Workers Fear Retaliation When Reporting Abuses',
      solution: '100% Anonymous Whistleblower Portal with Public Ticket Code Tracking',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950 text-white p-8 sm:p-12 shadow-2xl border border-navy-800">
        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Problem Statement: Manual Workforce Management</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Making manual work <span className="text-teal-400 underline decoration-teal-500/50 decoration-wavy">fairer</span>, safer, and truly transparent.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            A dedicated platform empowering manual workers and employers across 
            <strong> Construction & Civil Works</strong> and <strong>Hospitals & Healthcare Facilities</strong> with portable skill passports, 
            transparent wage audits, and rule-based fatigue prevention.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('worker-portal')}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-navy-950 font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-teal-500/20 flex items-center gap-2 group"
            >
              <span>Explore Worker Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('roster')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-semibold rounded-xl text-sm transition-colors border border-white/20 flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-teal-300" />
              <span>Employer Roster</span>
            </button>

            <button
              onClick={() => setActiveTab('wages')}
              className="px-6 py-3 bg-navy-800 hover:bg-navy-700 active:bg-navy-600 text-teal-300 font-semibold rounded-xl text-sm transition-colors border border-navy-700 flex items-center gap-2"
            >
              <Coins className="w-4 h-4" />
              <span>Wage Ledger & CSV</span>
            </button>
          </div>

        </div>

        {/* Decorative backdrop glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute left-1/2 bottom-0 w-80 h-80 bg-navy-700/20 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Live Impact Counters */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Workers Protected</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-navy-900">
            {analyticsSummary.totalWorkers || 16}
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 4 industrial sectors</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>On-Duty Shifts</span>
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-teal-700">
            {analyticsSummary.activeOnDuty || 8}
          </div>
          <p className="text-xs text-slate-500 mt-1">Active biometric monitoring</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Wages Disbursed</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700">
            ₹{analyticsSummary.totalDisbursed?.toLocaleString() || '36,161'}
          </div>
          <p className="text-xs text-slate-500 mt-1">100% on-time transparent payout</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Fatigue Interventions</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600">
            {analyticsSummary.flaggedFatigueCount || 3}
          </div>
          <p className="text-xs text-slate-500 mt-1">&gt;10h shifts safely intervened</p>
        </div>
      </section>

      {/* Sector Breakdown & Tailored Workflows */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-navy-900 tracking-tight">
              Supported Sectors & Tailored Hazard Standards
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Every sector has distinct physical hazards, statutory PPE mandates, and fair differential rates.
            </p>
          </div>
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 self-start">
            Rule-Based Statutory Compliance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sectors.map(sec => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                className={`p-6 rounded-2xl border ${sec.color} bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-navy-900 text-teal-300 rounded-xl shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-navy-900">{sec.name}</h3>
                        <span className="text-xs font-medium text-slate-500">{sec.workersCount} Demo Workers Enrolled</span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${sec.tagColor}`}>
                      {sec.hazard}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {sec.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedSector(sec.id);
                      setActiveTab('roster');
                    }}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 transition-colors"
                  >
                    <span>View {sec.name.split('&')[0].trim()} Roster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSector(sec.id);
                      setActiveTab('safety');
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Safety Protocols →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Problem vs FairWork AI Solution */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-teal-400 block mb-1">
            System Design & Innovation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Traditional Manual Workforce vs. FairWork AI
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            How FairWork AI replaces informal verbal agreements and paper muster rolls with an auditable, humane workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisons.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-teal-400">
                  <Icon className="w-5 h-5" />
                  <span className="font-bold text-sm">Core Pillar #{i + 1}</span>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-rose-950/40 border border-rose-800/40 rounded-xl text-rose-200">
                    <span className="font-bold block text-rose-400 mb-0.5">⚠️ Traditional Failure:</span>
                    {c.problem}
                  </div>
                  <div className="p-3 bg-teal-950/40 border border-teal-700/50 rounded-xl text-teal-100">
                    <span className="font-bold block text-teal-300 mb-0.5">✓ FairWork AI Standard:</span>
                    {c.solution}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
