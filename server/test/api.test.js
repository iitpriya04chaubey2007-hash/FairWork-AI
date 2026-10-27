process.env.NODE_ENV = 'test';
const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../index');

let server;
let baseUrl;

test.before(async () => {
  await new Promise(resolve => {
    server = http.createServer(app).listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });
});

test.after(async () => {
  if (server) {
    if (typeof server.closeAllConnections === 'function') {
      server.closeAllConnections();
    }
    await new Promise(resolve => server.close(resolve));
  }
});

async function api(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    return { status: res.status, data, res };
  }
  const text = await res.text();
  return { status: res.status, text, res };
}

test('API: Health Check returns healthy status and Cloud Run config', async () => {
  const { status, data } = await api('/api/health');
  assert.strictEqual(status, 200);
  assert.strictEqual(data.status, 'healthy');
  assert.strictEqual(data.app, 'FairWork AI');
  assert.ok(data.storageMode);
});

test('API: Sectors endpoint returns both focused sectors with metadata', async () => {
  const { status, data } = await api('/api/sectors');
  assert.strictEqual(status, 200);
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.sectors.length, 2);
  assert.ok(data.sectors.includes('construction'));
  assert.ok(data.sectors.includes('healthcare'));
  assert.strictEqual(data.metadata.construction.hazardMultiplier, 1.25);
  assert.strictEqual(data.metadata.healthcare.hazardMultiplier, 1.20);
});

test('API: Workers endpoint lists workers and filters by sector', async () => {
  const { status, data } = await api('/api/workers');
  assert.strictEqual(status, 200);
  assert.strictEqual(data.success, true);
  assert.ok(data.workers.length >= 10);

  const constrRes = await api('/api/workers?sector=construction');
  assert.ok(constrRes.data.workers.every(w => w.sector === 'construction'));
});

test('API: Worker Registration creates new worker with digital passport', async () => {
  const payload = {
    name: 'Dev Test Worker',
    sector: 'construction',
    trade: 'Scaffolding Inspector',
    experienceYears: 4,
    phone: '+91 99999 88888',
    dailyBaseRate: 850
  };

  const { status, data } = await api('/api/workers', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  assert.strictEqual(status, 201);
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.worker.name, 'Dev Test Worker');
  assert.ok(data.worker.passport.passportNumber.startsWith('FW-PASS-'));
});

test('API: Wage calculation correctly applies 1.5x overtime and hazard differential', async () => {
  const payload = {
    workerId: 'w-c1',
    standardHours: 40,
    overtimeHours: 10
  };

  const { status, data } = await api('/api/wages/calculate', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  assert.strictEqual(status, 200);
  const calc = data.calculation;
  assert.strictEqual(calc.standardHours, 40);
  assert.strictEqual(calc.overtimeHours, 10);
  // Construction hazard multiplier is 1.25 (+25%)
  assert.strictEqual(calc.hazardDifferentialPercent, 25);
  assert.ok(calc.overtimePay > 0);
  assert.ok(calc.hazardAllowance > 0);
  assert.strictEqual(calc.netPayable, calc.basePay + calc.overtimePay + calc.hazardAllowance);
});

test('API: Safety Rule-Based Fatigue evaluation flags shifts > 10 hours', async () => {
  const { status, data } = await api('/api/safety/fatigue-alerts');
  assert.strictEqual(status, 200);
  assert.strictEqual(data.success, true);
  assert.ok(data.alerts.length > 0);
  assert.ok(data.disclaimer.includes('Labor policy rule-based alert'));

  // Ensure critical alert exists for seeded > 10h shift
  const critical = data.alerts.find(a => a.severity === 'critical');
  assert.ok(critical);
  assert.ok(critical.elapsedHours >= 10);
});

test('API: Anonymous Grievance submission generates tracking code and supports lookup', async () => {
  const payload = {
    sector: 'healthcare',
    category: 'UNSAFE_CONDITIONS',
    priority: 'High',
    description: 'Ventilation filter needs replacement in ICU wing',
    isAnonymous: true
  };

  const { status, data } = await api('/api/grievances', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  assert.strictEqual(status, 201);
  assert.strictEqual(data.success, true);
  assert.ok(data.trackingCode.startsWith('FW-GRV-'));

  // Lookup by tracking code
  const trackRes = await api(`/api/grievances/track/${data.trackingCode}`);
  assert.strictEqual(trackRes.status, 200);
  assert.strictEqual(trackRes.data.grievance.isAnonymous, true);
  assert.strictEqual(trackRes.data.grievance.category, 'UNSAFE_CONDITIONS');
});

test('API: Wage CSV export returns standard CSV formatted stream', async () => {
  const { status, text, res } = await api('/api/wages/export/csv');
  assert.strictEqual(status, 200);
  assert.ok(res.headers.get('content-type').includes('text/csv'));
  assert.ok(text.includes('Wage Record ID,Worker ID,Worker Name,Sector'));
});

test('API: Demo reset restores baseline state', async () => {
  const { status, data } = await api('/api/demo/reset', { method: 'POST' });
  assert.strictEqual(status, 200);
  assert.strictEqual(data.success, true);
});
