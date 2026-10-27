// Configuration and constants for FairWork AI (Focused exclusively on 2 Sectors: Construction & Healthcare)

const SECTORS = {
  CONSTRUCTION: 'construction',
  HEALTHCARE: 'healthcare'
};

const SECTOR_METADATA = {
  [SECTORS.CONSTRUCTION]: {
    id: 'construction',
    name: 'Construction & Civil Works',
    icon: 'HardHat',
    color: 'amber',
    standardDailyHours: 8,
    hazardMultiplier: 1.25, // +25% hazard allowance
    mandatoryPPE: ['Hard Hat', 'Steel-toe Boots', 'High-Vis Vest', 'Safety Harness (High Alt)'],
    highRiskTrades: ['Scaffolding & Rigging', 'Master Masonry', 'Structural Welding', 'Rebar Detailing']
  },
  [SECTORS.HEALTHCARE]: {
    id: 'healthcare',
    name: 'Hospitals & Healthcare Facilities',
    icon: 'Stethoscope',
    color: 'teal',
    standardDailyHours: 8,
    hazardMultiplier: 1.20, // +20% biohazard allowance
    mandatoryPPE: ['Medical Scrubs', 'N95 Respirator', 'Biohazard Gloves', 'Face Visor'],
    highRiskTrades: ['Biohazard Sanitization', 'Orderly Patient Transit', 'Central Laundry Disinfection', 'Ward Bio-spill Turnover']
  }
};

// Configurable labor policy thresholds (NOT a medical diagnostic system)
const FATIGUE_THRESHOLDS = {
  MAX_DAILY_HOURS: 10,        // Flag when single shift exceeds 10 hours
  WARNING_DAILY_HOURS: 8.5,   // Alert advisory at 8.5 hours
  MAX_WEEKLY_HOURS: 50,       // Max safe weekly working hours
  MIN_REST_HOURS_BETWEEN_SHIFTS: 10, // Minimum recovery interval required
  MAX_CONSECUTIVE_DAYS: 6     // Mandatory rest day after 6 consecutive shifts
};

const GRIEVANCE_CATEGORIES = [
  { id: 'WAGE_DELAY', label: 'Wage Delay / Non-payment' },
  { id: 'UNDERPAYMENT', label: 'Unfair Wage Cut / Minimum Wage Breach' },
  { id: 'OVERTIME_COERCION', label: 'Forced Overtime / Extreme Fatigue' },
  { id: 'UNSAFE_CONDITIONS', label: 'Hazardous Conditions / Missing PPE' },
  { id: 'HARASSMENT', label: 'Verbal Abuse / Harassment / Discrimination' },
  { id: 'OTHER', label: 'General Welfare / Facilities Issue' }
];

module.exports = {
  SECTORS,
  SECTOR_METADATA,
  FATIGUE_THRESHOLDS,
  GRIEVANCE_CATEGORIES
};
