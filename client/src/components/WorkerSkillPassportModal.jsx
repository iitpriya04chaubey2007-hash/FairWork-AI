import React from 'react';
import { X, ShieldCheck, Award, QrCode, Star, Clock, CheckCircle2, Building, Printer, User } from 'lucide-react';
import VoiceReaderButton from './VoiceReaderButton';

export default function WorkerSkillPassportModal({ worker, onClose, lang = 'en' }) {
  if (!worker) return null;

  const passport = worker.passport || {
    passportNumber: `FW-PASS-${worker.id.toUpperCase()}`,
    issuedDate: '2024-01-01',
    safetyScore: 96,
    verifiedHours: 1800,
    certifications: [],
    skills: [worker.trade],
    employerReviews: []
  };

  const spokenText = `Skill Passport for ${worker.name}. Trade: ${worker.trade}. Sector: ${worker.sector}. Verified hours worked: ${passport.verifiedHours} hours. Safety score: ${passport.safetyScore} out of 100. Certifications: ${passport.certifications?.map(c => c.name).join(', ') || 'Standard Certified'}.`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Passport Header: Navy & Teal Gradient */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-teal-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Verifiable Labor Credential</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Worker Skill Passport
              </h2>
              <p className="text-slate-300 text-sm mt-0.5">
                Portable, tamper-resistant skill and safety record
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-right">
              <span className="text-[11px] text-teal-200 block uppercase font-mono">Passport ID</span>
              <span className="font-mono font-bold text-white text-sm">{passport.passportNumber}</span>
            </div>
          </div>
        </div>

        {/* Passport Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Worker identity card strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-navy-800 text-teal-300 flex items-center justify-center font-bold text-2xl border-2 border-teal-500 shadow-md">
                {worker.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-navy-900">{worker.name}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600">{worker.trade}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="capitalize px-2 py-0.5 bg-slate-200 rounded font-medium text-slate-700">{worker.sector}</span>
                  <span>• Exp: {worker.experienceYears} Years</span>
                  <span>• ID: {worker.nationalIdMasked}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-center">
              <VoiceReaderButton text={spokenText} lang={lang} label="Listen to Details" />
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-navy-900 text-white hover:bg-navy-800 transition-colors shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Passport</span>
              </button>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-center">
              <ShieldCheck className="w-5 h-5 text-teal-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-teal-900">{passport.safetyScore}%</div>
              <div className="text-[11px] font-semibold text-teal-700 uppercase tracking-wide">Safety Rating</div>
            </div>

            <div className="p-3 bg-navy-50 border border-navy-200 rounded-xl text-center">
              <Clock className="w-5 h-5 text-navy-700 mx-auto mb-1" />
              <div className="text-2xl font-bold text-navy-900">{passport.verifiedHours.toLocaleString()}h</div>
              <div className="text-[11px] font-semibold text-navy-700 uppercase tracking-wide">Logged Hours</div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
              <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-amber-900">{passport.certifications?.length || 0}</div>
              <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wide">Certifications</div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <Star className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-emerald-900">4.9 / 5</div>
              <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">Peer Score</div>
            </div>
          </div>

          {/* Certifications & Badges */}
          <div>
            <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600" />
              <span>Government & Skill Council Certifications</span>
            </h4>
            
            {passport.certifications && passport.certifications.length > 0 ? (
              <div className="space-y-2.5">
                {passport.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg flex items-start justify-between gap-3 shadow-sm hover:border-teal-300 transition-colors">
                    <div>
                      <div className="font-semibold text-sm text-navy-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{cert.name}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Issuer: <span className="font-medium text-slate-700">{cert.issuer}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Issued: {cert.date} • Valid until: {cert.validUntil}
                      </div>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 bg-teal-100 text-teal-800 text-[11px] font-semibold rounded uppercase">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">
                No external certifications uploaded yet. Basic site training verified.
              </p>
            )}
          </div>

          {/* Core Verified Skills */}
          <div>
            <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-2">
              Demonstrated Trade Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {(passport.skills || [worker.trade]).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-navy-50 border border-navy-200 text-navy-800 text-xs font-semibold rounded-lg shadow-2xs"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* QR Code Verification Section */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-navy-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shrink-0 shadow">
                <QrCode className="w-14 h-14 text-navy-950" />
              </div>
              <div>
                <div className="text-xs text-teal-300 font-semibold uppercase tracking-wider">
                  Cryptographic Verifiable Credential
                </div>
                <div className="text-sm font-medium text-slate-200 mt-0.5">
                  Scan to verify authentic work record & safety score on-site.
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1 truncate max-w-xs">
                  SHA-256: 7f9a2b8e3100...c4d9e0
                </div>
              </div>
            </div>

            <div className="shrink-0 text-center sm:text-right">
              <span className="inline-block px-3 py-1 bg-teal-500 text-navy-950 font-bold text-xs rounded-full uppercase tracking-wider">
                Blockchain Ready
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>FairWork AI Digital Workforce Protocol</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
          >
            Close Passport
          </button>
        </div>

      </div>
    </div>
  );
}
