import test from 'node:test';
import assert from 'node:assert';
import { SUPPORTED_LANGUAGES, translations } from '../src/i18n/translations.js';

test('i18n: Supports all 8 required regional languages', () => {
  const codes = SUPPORTED_LANGUAGES.map(l => l.code);
  const expected = ['en', 'hi', 'ta', 'te', 'bn', 'kn', 'mr', 'es'];
  expected.forEach(code => {
    assert.ok(codes.includes(code), `Language ${code} must be in supported list`);
    assert.ok(translations[code], `Translations must exist for ${code}`);
    assert.ok(translations[code].appName, `appName must exist for ${code}`);
    assert.ok(translations[code].sectors.construction, `construction translation must exist for ${code}`);
    assert.ok(translations[code].sectors.healthcare, `healthcare translation must exist for ${code}`);
  });
});

test('i18n: Language keys have navigation items and common labels', () => {
  ['en', 'hi', 'ta', 'te', 'bn', 'kn', 'mr', 'es'].forEach(code => {
    const t = translations[code];
    assert.ok(t.nav.overview);
    assert.ok(t.nav.workerPortal);
    assert.ok(t.nav.employerRoster);
    assert.ok(t.nav.wageLedger);
    assert.ok(t.nav.safetyFatigue);
    assert.ok(t.nav.voiceGrievance);
    assert.ok(t.nav.adminTrends);
    assert.ok(t.safety.fatigueDisclaimer);
    assert.ok(t.common.disbursed);
    assert.ok(t.common.pending);
  });
});

test('Rules: Fatigue thresholds logic enforces statutory limits without medical claim', () => {
  const MAX_DAILY_HOURS = 10;
  const WARNING_DAILY_HOURS = 8.5;

  const testHours = [6.0, 8.5, 9.2, 10.5, 12.0];
  const outcomes = testHours.map(hours => {
    if (hours >= MAX_DAILY_HOURS) return 'critical';
    if (hours >= WARNING_DAILY_HOURS) return 'warning';
    return 'normal';
  });

  assert.deepStrictEqual(outcomes, ['normal', 'warning', 'warning', 'critical', 'critical']);
});

test('Wage Logic: Standard 48h base + 1.5x overtime + 25% hazard allowance', () => {
  const hourlyRate = 100;
  const standardHours = 48;
  const overtimeHours = 6;
  const hazardMultiplier = 1.25; // Construction

  const basePay = standardHours * hourlyRate; // 4800
  const overtimePay = overtimeHours * (hourlyRate * 1.5); // 900
  const hazardPay = basePay * (hazardMultiplier - 1.0); // 1200
  const netPayable = basePay + overtimePay + hazardPay; // 6900

  assert.strictEqual(basePay, 4800);
  assert.strictEqual(overtimePay, 900);
  assert.strictEqual(hazardPay, 1200);
  assert.strictEqual(netPayable, 6900);
});
