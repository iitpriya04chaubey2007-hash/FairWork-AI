import React, { useState } from 'react';
import {
  ShieldCheck,
  HardHat,
  Stethoscope,
  GraduationCap,
  Factory,
  Globe2,
  Users,
  Menu,
  X,
  Layers,
  FileText,
  AlertTriangle,
  MessageSquareWarning,
  BarChart3,
  UserCheck
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, translations } from '../i18n/translations';

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedSector,
  setSelectedSector,
  currentLanguage,
  setCurrentLanguage,
  personas = [],
  activePersona,
  onSelectPersona,
  storageStatus
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLanguage] || translations.en;

  const navItems = [
    { id: 'overview', label: t.nav.overview, icon: Layers },
    { id: 'worker-portal', label: t.nav.workerPortal, icon: UserCheck },
    { id: 'roster', label: t.nav.employerRoster, icon: Users },
    { id: 'wages', label: t.nav.wageLedger, icon: FileText },
    { id: 'safety', label: t.nav.safetyFatigue, icon: AlertTriangle },
    { id: 'grievance', label: t.nav.voiceGrievance, icon: MessageSquareWarning },
    { id: 'admin', label: t.nav.adminTrends, icon: BarChart3 }
  ];

  const sectorList = [
    { id: 'all', label: t.sectors.all, icon: Layers },
    { id: 'construction', label: t.sectors.construction, icon: HardHat },
    { id: 'healthcare', label: t.sectors.healthcare, icon: Stethoscope },
    { id: 'education', label: t.sectors.education, icon: GraduationCap },
    { id: 'manufacturing', label: t.sectors.manufacturing, icon: Factory }
  ];

  return (
    <header className="sticky top-0 z-40 bg-navy-950 text-white border-b border-navy-800 shadow-lg">
      
      {/* Top Utility Strip: Language, Persona & Demo Badge */}
      <div className="bg-navy-900 border-b border-navy-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Persona selector quick trigger */}
          <div className="flex items-center gap-2">
            <span className="text-teal-400 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Persona:</span>
            </span>
            <select
              value={activePersona?.id || 'worker-construction'}
              onChange={(e) => {
                const found = personas.find(p => p.id === e.target.value);
                if (found) onSelectPersona(found);
              }}
              className="bg-navy-950 text-teal-300 text-xs rounded border border-navy-700 px-2 py-0.5 outline-none font-medium focus:border-teal-500"
            >
              {personas.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            {/* Storage / Demo Mode Indicator */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-navy-950 border border-teal-500/30 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="text-slate-300 font-mono">
                {storageStatus?.label || 'In-Memory / Demo Store'}
              </span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-teal-400" />
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="bg-navy-950 text-white text-xs rounded border border-navy-700 px-2 py-0.5 outline-none focus:border-teal-500"
                aria-label="Select Language"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native} ({lang.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center text-navy-950 shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  FairWork<span className="text-teal-400"> AI</span>
                </span>
                <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold tracking-wider bg-teal-900/60 text-teal-300 border border-teal-500/40 rounded">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs font-medium">
                Fair, Safe & Transparent Manual Labor
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-navy-900/60 p-1 rounded-xl border border-navy-800">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-navy-900 text-slate-300 hover:text-white border border-navy-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Sector Filter Bar */}
        <div className="mt-2.5 pt-2 border-t border-navy-850 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-[11px] uppercase font-bold text-slate-400 mr-1 shrink-0">
              {t.common.filter}:
            </span>
            {sectorList.map(sec => {
              const Icon = sec.icon;
              const isSelected = selectedSector === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSector(sec.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full whitespace-nowrap transition-all font-medium ${
                    isSelected
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-400/50 shadow-xs'
                      : 'bg-navy-900/80 text-slate-400 hover:text-slate-200 border border-navy-800'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900 border-b border-navy-800 px-4 py-3 space-y-2 animate-in slide-in-from-top-3">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                <Icon className="w-4 h-4 text-teal-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

    </header>
  );
}
