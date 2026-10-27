import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DemoBanner from './components/DemoBanner';
import LandingView from './components/LandingView';
import WorkerPortal from './components/WorkerPortal';
import EmployerDashboard from './components/EmployerDashboard';
import WageLedger from './components/WageLedger';
import SafetyFatigueMonitor from './components/SafetyFatigueMonitor';
import GrievanceWhistleblower from './components/GrievanceWhistleblower';
import AdminAnalytics from './components/AdminAnalytics';
import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSector, setSelectedSector] = useState('all');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Core Data States
  const [workers, setWorkers] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [wages, setWages] = useState([]);
  const [safetyIncidents, setSafetyIncidents] = useState([]);
  const [fatigueAlerts, setFatigueAlerts] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const [thresholds, setThresholds] = useState({});
  const [storageStatus, setStorageStatus] = useState({ mode: 'demo_memory', label: 'In-Memory / Demo Store' });
  const [personas, setPersonas] = useState([]);
  const [activePersona, setActivePersona] = useState(null);
  const [activeWorkerId, setActiveWorkerId] = useState('w-c1');

  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Initial Load
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);

        // Fetch demo status & personas
        const demoRes = await api.getDemoStatus().catch(() => null);
        if (demoRes && demoRes.personas) {
          setPersonas(demoRes.personas);
          setActivePersona(demoRes.personas[0]);
          if (demoRes.storage) setStorageStatus(demoRes.storage);
        }

        // Fetch core datasets
        const [
          workersRes,
          shiftsRes,
          wagesRes,
          safetyRes,
          fatigueRes,
          grievancesRes,
          analyticsRes,
          thresholdsRes
        ] = await Promise.all([
          api.getWorkers(),
          api.getShifts(),
          api.getWages(),
          api.getSafetyIncidents(),
          api.getFatigueAlerts(),
          api.getGrievances(),
          api.getAnalyticsOverview(),
          api.getThresholds().catch(() => ({ thresholds: {} }))
        ]);

        if (workersRes?.workers) setWorkers(workersRes.workers);
        if (shiftsRes?.shifts) setShifts(shiftsRes.shifts);
        if (wagesRes?.wages) setWages(wagesRes.wages);
        if (safetyRes?.incidents) setSafetyIncidents(safetyRes.incidents);
        if (fatigueRes?.alerts) setFatigueAlerts(fatigueRes.alerts);
        if (grievancesRes?.grievances) setGrievances(grievancesRes.grievances);
        if (analyticsRes) setAnalyticsData(analyticsRes);
        if (thresholdsRes?.thresholds) setThresholds(thresholdsRes.thresholds);

      } catch (err) {
        console.error('Data load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, [refreshTrigger]);

  const reloadData = () => setRefreshTrigger(prev => prev + 1);

  // Persona Switching Handler
  const handleSelectPersona = (persona) => {
    setActivePersona(persona);
    if (persona.role === 'worker') {
      if (persona.workerId) setActiveWorkerId(persona.workerId);
      if (persona.sector && persona.sector !== 'all') setSelectedSector(persona.sector);
      setActiveTab('worker-portal');
    } else if (persona.role === 'employer') {
      setSelectedSector('all');
      setActiveTab('roster');
    } else if (persona.role === 'admin') {
      setSelectedSector('all');
      setActiveTab('admin');
    }
  };

  // Reset Demo Data
  const handleResetDemo = async () => {
    await api.resetDemoData();
    reloadData();
  };

  // Worker Handlers
  const handleWorkerCreated = async (payload) => {
    const res = await api.registerWorker(payload);
    reloadData();
    return res;
  };

  // Shift Check-In / Check-Out
  const handleCheckIn = async (payload) => {
    const res = await api.checkInShift(payload);
    reloadData();
    return res;
  };

  const handleCheckOut = async (shiftId) => {
    const res = await api.checkOutShift(shiftId);
    reloadData();
    return res;
  };

  // Wage Handlers
  const handleCalculateWage = async (form) => {
    const res = await api.calculateWage(form);
    if (res && res.calculation) {
      // Record onto transparent ledger
      await api.createWage(res.calculation);
      reloadData();
    }
    return res;
  };

  const handleDisburseWage = async (wageId) => {
    await api.disburseWage(wageId);
    reloadData();
  };

  const handleExportCsv = (sector) => {
    const url = api.getWageCsvUrl(sector);
    window.open(url, '_blank');
  };

  // Safety Handlers
  const handleEnforceRest = async (shiftId) => {
    await api.enforceRestBreak(shiftId, 'Mandatory shift pause initiated under labor fatigue thresholds.');
    reloadData();
  };

  const handleReportIncident = async (payload) => {
    const res = await api.reportSafetyIncident(payload);
    reloadData();
    return res;
  };

  // Grievance Handlers
  const handleSubmitGrievance = async (payload) => {
    const res = await api.submitGrievance(payload);
    reloadData();
    return res;
  };

  const handleTrackGrievance = async (code) => {
    return await api.trackGrievance(code);
  };

  const handleUpdateGrievanceStatus = async (id, data) => {
    const res = await api.updateGrievance(id, data);
    reloadData();
    return res;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        personas={personas}
        activePersona={activePersona}
        onSelectPersona={handleSelectPersona}
        storageStatus={storageStatus}
      />

      {/* Demo Evaluation Mode Notification Banner */}
      <DemoBanner
        personas={personas}
        activePersona={activePersona}
        onSelectPersona={handleSelectPersona}
        onResetDemo={handleResetDemo}
        lang={currentLanguage}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {loading && workers.length === 0 ? (
          <div className="p-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200">
            <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h3 className="font-bold text-lg text-navy-900">Loading FairWork AI System...</h3>
            <p className="text-xs text-slate-500">Connecting to storage and loading cross-sector workforce data</p>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <LandingView
                setActiveTab={setActiveTab}
                setSelectedSector={setSelectedSector}
                analyticsSummary={analyticsData.summary || {}}
                lang={currentLanguage}
              />
            )}

            {activeTab === 'worker-portal' && (
              <WorkerPortal
                workers={workers}
                shifts={shifts}
                wages={wages}
                activeWorkerId={activeWorkerId}
                setActiveWorkerId={setActiveWorkerId}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                lang={currentLanguage}
              />
            )}

            {activeTab === 'roster' && (
              <EmployerDashboard
                workers={workers}
                shifts={shifts}
                selectedSector={selectedSector}
                setSelectedSector={setSelectedSector}
                onWorkerCreated={handleWorkerCreated}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                lang={currentLanguage}
              />
            )}

            {activeTab === 'wages' && (
              <WageLedger
                wages={wages}
                workers={workers}
                selectedSector={selectedSector}
                onCalculateWage={handleCalculateWage}
                onDisburseWage={handleDisburseWage}
                onExportCsv={handleExportCsv}
                lang={currentLanguage}
              />
            )}

            {activeTab === 'safety' && (
              <SafetyFatigueMonitor
                fatigueAlerts={fatigueAlerts}
                safetyIncidents={safetyIncidents}
                selectedSector={selectedSector}
                onEnforceRest={handleEnforceRest}
                onReportIncident={handleReportIncident}
                thresholds={thresholds}
                lang={currentLanguage}
              />
            )}

            {activeTab === 'grievance' && (
              <GrievanceWhistleblower
                grievances={grievances}
                selectedSector={selectedSector}
                onSubmitGrievance={handleSubmitGrievance}
                onTrackGrievance={handleTrackGrievance}
                onUpdateGrievanceStatus={handleUpdateGrievanceStatus}
                lang={currentLanguage}
              />
            )}

            {activeTab === 'admin' && (
              <AdminAnalytics
                analyticsData={analyticsData}
                selectedSector={selectedSector}
                lang={currentLanguage}
              />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-navy-950 text-slate-400 text-xs py-8 border-t border-navy-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm">FairWork AI</span>
            <span>• Manual Workforce Management Protocol</span>
          </div>
          <div className="text-center sm:text-right text-[11px] text-slate-500">
            Prepared for Google Cloud Run deployment & Firebase Firestore integration • Ready for Hackathon Evaluation
          </div>
        </div>
      </footer>

    </div>
  );
}
