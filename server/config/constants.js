// Configuration and constants for FairWork AI

const SECTORS = {
  CONSTRUCTION: 'construction',
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  MANUFACTURING: 'manufacturing'
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
    highRiskTrades: ['Scaffolding', 'Welding', 'Crane Rigging', 'Deep Trenching']
  },
  [SECTORS.HEALTHCARE]: {
    id: 'healthcare',
    name: 'Hospitals & Healthcare Facilities',
    icon: 'Stethoscope',
    color: 'teal',
    standardDailyHours: 8,
    hazardMultiplier: 1.20, // +20% biohazard allowance
    mandatoryPPE: ['Medical Scrubs', 'N95 Respirator', 'Biohazard Gloves', 'Face Shield'],
    highRiskTrades: ['Bio-waste Disposal', 'Sanitation Staff', 'Orderly Patient Transfer', 'Isolation Ward Maintenance']
  },
  [SECTORS.EDUCATION]: {
    id: 'education',
    name: 'Colleges & Educational Campuses',
    icon: 'GraduationCap',
    color: 'indigo',
    standardDailyHours: 8,
    hazardMultiplier: 1.05, // +5% chemical/heavy equipment allowance
    mandatoryPPE: ['Work Gloves', 'Slip-resistant Shoes', 'Safety Goggles'],
    highRiskTrades: ['Chemical Lab Caretaking', 'Groundskeeping / Heavy Mower', 'High-voltage Maintenance']
  },
  [SECTORS.MANUFACTURING]: {
    id: 'manufacturing',
    name: 'Factories & Industrial Manufacturing',
    icon: 'Factory',
    color: 'blue',
    standardDailyHours: 8,
    hazardMultiplier: 1.20, // +20% machinery/heat allowance
    mandatoryPPE: ['Ear Defenders', 'Cut-resistant Gloves', 'Steel-toe Shoes', 'Eye Protection'],
    highRiskTrades: ['Sheet Metal Stamping', 'Smelter Tending', 'Chemical Mixing', 'Forklift Operations']
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
