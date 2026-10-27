import React, { useState } from 'react';
import { Sparkles, RotateCcw, Check, Users, Info } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function DemoBanner({
  personas = [],
  activePersona,
  onSelectPersona,
  onResetDemo,
  lang = 'en'
}) {
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const t = translations[lang] || translations.en;

  const handleReset = async () => {
    try {
      setResetting(true);
      await onResetDemo();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2500);
    } catch (err) {
      alert('Failed to reset demo: ' + err.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-900 via-navy-900 to-navy-950 border-b border-teal-800/40 text-white px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Banner Info */}
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-teal-500/20 text-teal-300 border border-teal-400/30">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <span className="font-bold text-teal-300 mr-2 tracking-wide uppercase text-[11px]">
              {t.demoModeActive}:
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Preloaded with 16+ workers, live shifts, transparent wage calculations, and fatigue alerts across 4 sectors.
            </span>
          </div>
        </div>

        {/* Quick Persona Pills + Reset Button */}
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
            <span className="text-slate-400 text-[11px] font-medium mr-1 hidden lg:inline">
              Switch View:
            </span>
            {personas.map(p => {
              const isActive = activePersona?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPersona(p)}
                  className={`px-2 py-0.5 text-xs rounded-full font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-teal-500 text-navy-950 font-bold shadow-xs'
                      : 'bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-700'
                  }`}
                >
                  {p.name.split('(')[0].trim()}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleReset}
            disabled={resetting}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-semibold rounded-lg text-xs transition-colors border border-white/20 shadow-xs"
          >
            {resetSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Reset Done!</span>
              </>
            ) : (
              <>
                <RotateCcw className={`w-3.5 h-3.5 text-teal-300 ${resetting ? 'animate-spin' : ''}`} />
                <span>{t.resetDemo}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
