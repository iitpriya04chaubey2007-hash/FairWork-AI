// API client for FairWork AI

const BASE_URL = '/api';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type') || '';

    if (!response.ok) {
      let errorMsg = `Server error (${response.status})`;
      if (contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMsg = errorData.message || errorMsg;
      } else {
        errorMsg = await response.text();
      }
      throw new Error(errorMsg);
    }

    if (contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (err) {
    console.error(`[API Error ${endpoint}]:`, err.message);
    throw err;
  }
}

export const api = {
  // Health & Storage status
  getHealth: () => request('/health'),
  getDemoStatus: () => request('/demo/status'),
  resetDemoData: () => request('/demo/reset', { method: 'POST' }),

  // Sectors
  getSectors: () => request('/sectors'),

  // Workers
  getWorkers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/workers${query ? `?${query}` : ''}`);
  },
  getWorkerById: (id) => request(`/workers/${id}`),
  registerWorker: (data) => request('/workers', { method: 'POST', body: JSON.stringify(data) }),
  updateWorker: (id, data) => request(`/workers/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Shifts
  getShifts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/shifts${query ? `?${query}` : ''}`);
  },
  checkInShift: (data) => request('/shifts/check-in', { method: 'POST', body: JSON.stringify(data) }),
  checkOutShift: (id) => request(`/shifts/${id}/check-out`, { method: 'POST' }),

  // Wages
  getWages: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/wages${query ? `?${query}` : ''}`);
  },
  calculateWage: (data) => request('/wages/calculate', { method: 'POST', body: JSON.stringify(data) }),
  createWage: (data) => request('/wages', { method: 'POST', body: JSON.stringify(data) }),
  disburseWage: (id, customRef) => request(`/wages/${id}/disburse`, { method: 'POST', body: JSON.stringify({ customRef }) }),
  getWageCsvUrl: (sector) => `${BASE_URL}/wages/export/csv${sector && sector !== 'all' ? `?sector=${sector}` : ''}`,

  // Safety & Fatigue
  getSafetyIncidents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/safety/incidents${query ? `?${query}` : ''}`);
  },
  reportSafetyIncident: (data) => request('/safety/incidents', { method: 'POST', body: JSON.stringify(data) }),
  getFatigueAlerts: () => request('/safety/fatigue-alerts'),
  enforceRestBreak: (shiftId, notes) => request(`/safety/fatigue-alerts/${shiftId}/rest`, { method: 'POST', body: JSON.stringify({ notes }) }),
  getThresholds: () => request('/safety/thresholds'),

  // Grievances
  getGrievances: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/grievances${query ? `?${query}` : ''}`);
  },
  submitGrievance: (data) => request('/grievances', { method: 'POST', body: JSON.stringify(data) }),
  trackGrievance: (trackingCode) => request(`/grievances/track/${encodeURIComponent(trackingCode)}`),
  updateGrievance: (id, data) => request(`/grievances/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Analytics
  getAnalyticsOverview: (sector) => request(`/analytics/overview${sector && sector !== 'all' ? `?sector=${sector}` : ''}`)
};
