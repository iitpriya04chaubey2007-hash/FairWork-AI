// Storage Adapter for FairWork AI
// Supports Firebase Firestore when credentials are present,
// and gracefully falls back to an In-Memory Demo Store for instant hackathon evaluation.

const {
  initialWorkers,
  initialShifts,
  initialWages,
  initialSafetyIncidents,
  initialGrievances
} = require('../data/seedData');

let isFirestoreActive = false;
let firestoreDb = null;

// Attempt Firebase Firestore initialization if environment credentials exist
try {
  if (process.env.FIREBASE_PROJECT_ID || process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const admin = require('firebase-admin');
    if (!admin.apps.length) {
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
      } else {
        admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID
        });
      }
    }
    firestoreDb = admin.firestore();
    isFirestoreActive = true;
    console.log('[FairWork AI Storage] Connected to Firebase Firestore.');
  }
} catch (err) {
  console.warn('[FairWork AI Storage] Firebase credentials not configured or failed to initialize. Running in In-Memory Demo Mode:', err.message);
  isFirestoreActive = false;
  firestoreDb = null;
}

// In-Memory store container
let memoryStore = {
  workers: JSON.parse(JSON.stringify(initialWorkers)),
  shifts: JSON.parse(JSON.stringify(initialShifts)),
  wages: JSON.parse(JSON.stringify(initialWages)),
  safetyIncidents: JSON.parse(JSON.stringify(initialSafetyIncidents)),
  grievances: JSON.parse(JSON.stringify(initialGrievances))
};

class StorageAdapter {
  static getStorageStatus() {
    return {
      mode: isFirestoreActive ? 'firestore' : 'demo_memory',
      isDemoMode: !isFirestoreActive,
      label: isFirestoreActive ? 'Firebase Firestore (Persistent)' : 'Demo In-Memory Store (Evaluation Mode)',
      lastReset: new Date().toISOString()
    };
  }

  static resetDemoData() {
    memoryStore = {
      workers: JSON.parse(JSON.stringify(initialWorkers)),
      shifts: JSON.parse(JSON.stringify(initialShifts)),
      wages: JSON.parse(JSON.stringify(initialWages)),
      safetyIncidents: JSON.parse(JSON.stringify(initialSafetyIncidents)),
      grievances: JSON.parse(JSON.stringify(initialGrievances))
    };
    return { success: true, message: 'Demo data has been reset to baseline.' };
  }

  // --- WORKERS ---
  static async getWorkers(filters = {}) {
    if (isFirestoreActive) {
      let query = firestoreDb.collection('workers');
      if (filters.sector && filters.sector !== 'all') {
        query = query.where('sector', '==', filters.sector);
      }
      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    let results = [...memoryStore.workers];
    if (filters.sector && filters.sector !== 'all') {
      results = results.filter(w => w.sector === filters.sector);
    }
    if (filters.status && filters.status !== 'all') {
      results = results.filter(w => w.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.trade.toLowerCase().includes(q) ||
        (w.passport?.passportNumber && w.passport.passportNumber.toLowerCase().includes(q))
      );
    }
    return results;
  }

  static async getWorkerById(id) {
    if (isFirestoreActive) {
      const doc = await firestoreDb.collection('workers').doc(id).get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }
    return memoryStore.workers.find(w => w.id === id) || null;
  }

  static async createWorker(workerData) {
    const id = workerData.id || `w-${Date.now()}`;
    const newWorker = {
      id,
      status: 'off_duty',
      currentShiftId: null,
      createdAt: new Date().toISOString(),
      ...workerData,
      passport: {
        passportNumber: `FW-PASS-${Math.floor(1000 + Math.random() * 9000)}`,
        issuedDate: new Date().toISOString().split('T')[0],
        safetyScore: 95,
        verifiedHours: 0,
        certifications: workerData.certifications || [],
        skills: workerData.skills || [workerData.trade],
        employerReviews: []
      }
    };

    if (isFirestoreActive) {
      await firestoreDb.collection('workers').doc(id).set(newWorker);
      return newWorker;
    }

    memoryStore.workers.unshift(newWorker);
    return newWorker;
  }

  static async updateWorker(id, updates) {
    if (isFirestoreActive) {
      await firestoreDb.collection('workers').doc(id).update(updates);
      return this.getWorkerById(id);
    }
    const idx = memoryStore.workers.findIndex(w => w.id === id);
    if (idx === -1) return null;
    memoryStore.workers[idx] = { ...memoryStore.workers[idx], ...updates };
    return memoryStore.workers[idx];
  }

  // --- SHIFTS & ATTENDANCE ---
  static async getShifts(filters = {}) {
    if (isFirestoreActive) {
      let query = firestoreDb.collection('shifts');
      if (filters.sector && filters.sector !== 'all') {
        query = query.where('sector', '==', filters.sector);
      }
      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    let results = [...memoryStore.shifts];
    if (filters.sector && filters.sector !== 'all') {
      results = results.filter(s => s.sector === filters.sector);
    }
    if (filters.workerId) {
      results = results.filter(s => s.workerId === filters.workerId);
    }
    if (filters.status && filters.status !== 'all') {
      results = results.filter(s => s.status === filters.status);
    }
    return results;
  }

  static async createShift(shiftData) {
    const id = shiftData.id || `shift-${Date.now()}`;
    const newShift = {
      id,
      startTime: new Date().toISOString(),
      endTime: null,
      hoursWorkedSoFar: 0,
      status: 'active',
      fatigueRisk: 'normal',
      ...shiftData
    };

    if (isFirestoreActive) {
      await firestoreDb.collection('shifts').doc(id).set(newShift);
      if (shiftData.workerId) {
        await firestoreDb.collection('workers').doc(shiftData.workerId).update({
          status: 'on_shift',
          currentShiftId: id
        });
      }
      return newShift;
    }

    memoryStore.shifts.unshift(newShift);
    if (shiftData.workerId) {
      const worker = memoryStore.workers.find(w => w.id === shiftData.workerId);
      if (worker) {
        worker.status = 'on_shift';
        worker.currentShiftId = id;
      }
    }
    return newShift;
  }

  static async updateShift(id, updates) {
    if (isFirestoreActive) {
      await firestoreDb.collection('shifts').doc(id).update(updates);
      const doc = await firestoreDb.collection('shifts').doc(id).get();
      return { id: doc.id, ...doc.data() };
    }
    const idx = memoryStore.shifts.findIndex(s => s.id === id);
    if (idx === -1) return null;
    memoryStore.shifts[idx] = { ...memoryStore.shifts[idx], ...updates };
    return memoryStore.shifts[idx];
  }

  // --- WAGES ---
  static async getWages(filters = {}) {
    if (isFirestoreActive) {
      let query = firestoreDb.collection('wages');
      if (filters.sector && filters.sector !== 'all') {
        query = query.where('sector', '==', filters.sector);
      }
      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    let results = [...memoryStore.wages];
    if (filters.sector && filters.sector !== 'all') {
      results = results.filter(w => w.sector === filters.sector);
    }
    if (filters.workerId) {
      results = results.filter(w => w.workerId === filters.workerId);
    }
    if (filters.paymentStatus && filters.paymentStatus !== 'all') {
      results = results.filter(w => w.paymentStatus === filters.paymentStatus);
    }
    return results;
  }

  static async createWage(wageData) {
    const id = wageData.id || `wage-${Date.now()}`;
    const newWage = {
      id,
      createdAt: new Date().toISOString(),
      paymentStatus: 'under_review',
      transactionRef: null,
      disbursedDate: null,
      ...wageData
    };

    if (isFirestoreActive) {
      await firestoreDb.collection('wages').doc(id).set(newWage);
      return newWage;
    }

    memoryStore.wages.unshift(newWage);
    return newWage;
  }

  static async updateWage(id, updates) {
    if (isFirestoreActive) {
      await firestoreDb.collection('wages').doc(id).update(updates);
      const doc = await firestoreDb.collection('wages').doc(id).get();
      return { id: doc.id, ...doc.data() };
    }
    const idx = memoryStore.wages.findIndex(w => w.id === id);
    if (idx === -1) return null;
    memoryStore.wages[idx] = { ...memoryStore.wages[idx], ...updates };
    return memoryStore.wages[idx];
  }

  // --- SAFETY INCIDENTS ---
  static async getSafetyIncidents(filters = {}) {
    if (isFirestoreActive) {
      let query = firestoreDb.collection('safetyIncidents');
      if (filters.sector && filters.sector !== 'all') {
        query = query.where('sector', '==', filters.sector);
      }
      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    let results = [...memoryStore.safetyIncidents];
    if (filters.sector && filters.sector !== 'all') {
      results = results.filter(i => i.sector === filters.sector);
    }
    if (filters.severity && filters.severity !== 'all') {
      results = results.filter(i => i.severity.toLowerCase() === filters.severity.toLowerCase());
    }
    return results;
  }

  static async createSafetyIncident(incidentData) {
    const id = incidentData.id || `inc-${Date.now()}`;
    const newIncident = {
      id,
      timestamp: new Date().toISOString(),
      status: 'under_investigation',
      ...incidentData
    };

    if (isFirestoreActive) {
      await firestoreDb.collection('safetyIncidents').doc(id).set(newIncident);
      return newIncident;
    }

    memoryStore.safetyIncidents.unshift(newIncident);
    return newIncident;
  }

  // --- GRIEVANCES & UNFAIR TREATMENT REPORTS ---
  static async getGrievances(filters = {}) {
    if (isFirestoreActive) {
      let query = firestoreDb.collection('grievances');
      if (filters.sector && filters.sector !== 'all') {
        query = query.where('sector', '==', filters.sector);
      }
      const snapshot = await query.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    let results = [...memoryStore.grievances];
    if (filters.sector && filters.sector !== 'all') {
      results = results.filter(g => g.sector === filters.sector);
    }
    if (filters.status && filters.status !== 'all') {
      results = results.filter(g => g.status === filters.status);
    }
    return results;
  }

  static async getGrievanceByTrackingCode(trackingCode) {
    if (isFirestoreActive) {
      const snapshot = await firestoreDb.collection('grievances')
        .where('trackingCode', '==', trackingCode.toUpperCase())
        .limit(1)
        .get();
      if (snapshot.empty) return null;
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
    return memoryStore.grievances.find(
      g => g.trackingCode.toUpperCase() === trackingCode.toUpperCase()
    ) || null;
  }

  static async createGrievance(grievanceData) {
    const randCode = `FW-GRV-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = grievanceData.id || `grv-${Date.now()}`;
    const newGrievance = {
      id,
      trackingCode: randCode,
      timestamp: new Date().toISOString(),
      status: 'under_investigation',
      officialNotes: 'Grievance recorded. Assigned to independent worker advocate.',
      resolutionDate: null,
      ...grievanceData
    };

    if (isFirestoreActive) {
      await firestoreDb.collection('grievances').doc(id).set(newGrievance);
      return newGrievance;
    }

    memoryStore.grievances.unshift(newGrievance);
    return newGrievance;
  }

  static async updateGrievance(id, updates) {
    if (isFirestoreActive) {
      await firestoreDb.collection('grievances').doc(id).update(updates);
      const doc = await firestoreDb.collection('grievances').doc(id).get();
      return { id: doc.id, ...doc.data() };
    }
    const idx = memoryStore.grievances.findIndex(g => g.id === id);
    if (idx === -1) return null;
    memoryStore.grievances[idx] = { ...memoryStore.grievances[idx], ...updates };
    return memoryStore.grievances[idx];
  }
}

module.exports = StorageAdapter;
