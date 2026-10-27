// Seed demo data for FairWork AI (Focused exclusively on 2 Sectors: Construction & Healthcare)

const initialWorkers = [
  // --- CONSTRUCTION SECTOR ---
  {
    id: 'w-c1',
    name: 'Rajesh Kumar',
    sector: 'construction',
    trade: 'Scaffolding & Rigging',
    experienceYears: 7,
    phone: '+91 98765 43210',
    nationalIdMasked: 'XXXX-XXXX-4819',
    dailyBaseRate: 850,
    hourlyRate: 106.25,
    preferredLanguage: 'hi',
    emergencyContact: { name: 'Sunita Kumar (Spouse)', phone: '+91 98765 43211' },
    passport: {
      passportNumber: 'FW-PASS-C109',
      issuedDate: '2024-01-15',
      safetyScore: 98,
      verifiedHours: 2450,
      certifications: [
        { name: 'Heavy Scaffolding Safety Level 2', issuer: 'National Skill Development Corp', date: '2023-04-10', validUntil: '2026-04-10', status: 'verified' },
        { name: 'Working at Heights & Fall Arrest Systems', issuer: 'Apex Safety Council', date: '2024-02-18', validUntil: '2027-02-18', status: 'verified' }
      ],
      skills: ['Tube & Fitting Scaffolding', 'Mobile Tower Assembly', 'Fall Protection Systems', 'Rigging Safety Checks'],
      employerReviews: [
        { employer: 'Metro Infra Consortium', rating: 5, comment: 'Exceptional safety discipline on high-rise blocks.' }
      ]
    },
    status: 'on_shift',
    currentShiftId: 'shift-live-1'
  },
  {
    id: 'w-c2',
    name: 'Manoj Verma',
    sector: 'construction',
    trade: 'Master Mason',
    experienceYears: 10,
    phone: '+91 98111 22334',
    nationalIdMasked: 'XXXX-XXXX-9021',
    dailyBaseRate: 900,
    hourlyRate: 112.50,
    preferredLanguage: 'hi',
    emergencyContact: { name: 'Geeta Verma', phone: '+91 98111 22335' },
    passport: {
      passportNumber: 'FW-PASS-C110',
      issuedDate: '2023-11-05',
      safetyScore: 94,
      verifiedHours: 3200,
      certifications: [
        { name: 'Precision Structural Masonry', issuer: 'Construction Skill Council', date: '2022-08-14', validUntil: '2026-08-14', status: 'verified' }
      ],
      skills: ['Stone Masonry', 'Reinforced Brickwork', 'Plastering & Levelling', 'Site Quality Inspection'],
      employerReviews: [
        { employer: 'Skyline Urban Developers', rating: 4.8, comment: 'Consistent quality and zero masonry rework.' }
      ]
    },
    status: 'off_duty',
    currentShiftId: null
  },
  {
    id: 'w-c3',
    name: 'Anil Soren',
    sector: 'construction',
    trade: 'Structural Welder',
    experienceYears: 5,
    phone: '+91 97222 33445',
    nationalIdMasked: 'XXXX-XXXX-3341',
    dailyBaseRate: 880,
    hourlyRate: 110.00,
    preferredLanguage: 'bn',
    emergencyContact: { name: 'Muni Soren', phone: '+91 97222 33446' },
    passport: {
      passportNumber: 'FW-PASS-C111',
      issuedDate: '2024-03-01',
      safetyScore: 89,
      verifiedHours: 1850,
      certifications: [
        { name: 'MIG/TIG Welder Arc Certified', issuer: 'Welding Institute', date: '2023-01-20', validUntil: '2026-01-20', status: 'verified' }
      ],
      skills: ['Structural Steel Jointing', 'Oxygen-Acetylene Cutting', 'Heat Shield Handling'],
      employerReviews: []
    },
    status: 'flagged_fatigue', // 10.5h logged today
    currentShiftId: 'shift-live-3'
  },
  {
    id: 'w-c4',
    name: 'Selvam Perumal',
    sector: 'construction',
    trade: 'Rebar & Bar Bending',
    experienceYears: 4,
    phone: '+91 96333 44556',
    nationalIdMasked: 'XXXX-XXXX-8120',
    dailyBaseRate: 800,
    hourlyRate: 100.00,
    preferredLanguage: 'ta',
    emergencyContact: { name: 'Kavitha Selvam', phone: '+91 96333 44557' },
    passport: {
      passportNumber: 'FW-PASS-C112',
      issuedDate: '2024-04-12',
      safetyScore: 96,
      verifiedHours: 1200,
      certifications: [
        { name: 'Reinforcement Steel Bending & Tying', issuer: 'National Skill Development Corp', date: '2023-09-01', validUntil: '2026-09-01', status: 'verified' }
      ],
      skills: ['Rebar Detailing', 'Hydraulic Bender Operation', 'Foundation Caging'],
      employerReviews: []
    },
    status: 'on_shift',
    currentShiftId: 'shift-live-4'
  },
  {
    id: 'w-c5',
    name: 'Dinesh Gurjar',
    sector: 'construction',
    trade: 'Concrete Pump & Pouring Specialist',
    experienceYears: 6,
    phone: '+91 95555 12345',
    nationalIdMasked: 'XXXX-XXXX-5519',
    dailyBaseRate: 840,
    hourlyRate: 105.00,
    preferredLanguage: 'hi',
    emergencyContact: { name: 'Pooja Gurjar', phone: '+91 95555 12346' },
    passport: {
      passportNumber: 'FW-PASS-C113',
      issuedDate: '2023-12-05',
      safetyScore: 95,
      verifiedHours: 2100,
      certifications: [
        { name: 'High-Volume Concrete Placement & Vibrator Safety', issuer: 'Infrastructure Skill Council', date: '2023-05-18', validUntil: '2026-05-18', status: 'verified' }
      ],
      skills: ['Boom Pump Rigging', 'Slump Testing', 'Slab Screeding', 'Cold Joint Prevention'],
      employerReviews: []
    },
    status: 'off_duty',
    currentShiftId: null
  },

  // --- HEALTHCARE SECTOR ---
  {
    id: 'w-h1',
    name: 'Maria Santos',
    sector: 'healthcare',
    trade: 'Sanitation Lead & Biohazard Handler',
    experienceYears: 6,
    phone: '+91 95444 55667',
    nationalIdMasked: 'XXXX-XXXX-6512',
    dailyBaseRate: 820,
    hourlyRate: 102.50,
    preferredLanguage: 'en',
    emergencyContact: { name: 'David Santos', phone: '+91 95444 55668' },
    passport: {
      passportNumber: 'FW-PASS-H201',
      issuedDate: '2023-06-20',
      safetyScore: 99,
      verifiedHours: 2800,
      certifications: [
        { name: 'Hospital Infection Control & Bio-waste Protocols', issuer: 'National Health Mission', date: '2023-05-15', validUntil: '2026-05-15', status: 'verified' },
        { name: 'ICU & Isolation Ward Chemical Sterilization', issuer: 'Healthcare Sector Skill Council', date: '2024-01-10', validUntil: '2027-01-10', status: 'verified' }
      ],
      skills: ['Red/Yellow Bag Sorting', 'Autoclave Operation', 'Spill Kit Decontamination', 'Terminal Cleaning'],
      employerReviews: [
        { employer: 'Metro City Apex Hospital', rating: 5, comment: 'Flawless adherence to sterilisation and PPE.' }
      ]
    },
    status: 'on_shift',
    currentShiftId: 'shift-live-5'
  },
  {
    id: 'w-h2',
    name: 'Prakash Patil',
    sector: 'healthcare',
    trade: 'Patient Care Attendant / Orderly',
    experienceYears: 4,
    phone: '+91 94555 66778',
    nationalIdMasked: 'XXXX-XXXX-9134',
    dailyBaseRate: 750,
    hourlyRate: 93.75,
    preferredLanguage: 'mr',
    emergencyContact: { name: 'Lata Patil', phone: '+91 94555 66779' },
    passport: {
      passportNumber: 'FW-PASS-H202',
      issuedDate: '2024-02-10',
      safetyScore: 95,
      verifiedHours: 1900,
      certifications: [
        { name: 'Ergonomic Patient Lift & Transfer', issuer: 'Healthcare Safety Board', date: '2023-03-12', validUntil: '2026-03-12', status: 'verified' }
      ],
      skills: ['Wheelchair Transfer', 'Stretcher Gurney Transit', 'Oxygen Cylinder Handling', 'CPR Basics'],
      employerReviews: []
    },
    status: 'off_duty',
    currentShiftId: null
  },
  {
    id: 'w-h3',
    name: 'Lakshmi Narayana',
    sector: 'healthcare',
    trade: 'Laundry & Linen Sanitizer',
    experienceYears: 8,
    phone: '+91 93666 77889',
    nationalIdMasked: 'XXXX-XXXX-1049',
    dailyBaseRate: 720,
    hourlyRate: 90.00,
    preferredLanguage: 'te',
    emergencyContact: { name: 'Ravi Narayana', phone: '+91 93666 77890' },
    passport: {
      passportNumber: 'FW-PASS-H203',
      issuedDate: '2023-09-15',
      safetyScore: 92,
      verifiedHours: 3100,
      certifications: [
        { name: 'High-Temperature Chemical Disinfection', issuer: 'State Health Council', date: '2023-08-20', validUntil: '2026-08-20', status: 'verified' }
      ],
      skills: ['Linen Sterilization', 'Hazardous Soiled Linen Sorting', 'Boiler Laundry Operations'],
      employerReviews: []
    },
    status: 'on_shift',
    currentShiftId: 'shift-live-6'
  },
  {
    id: 'w-h4',
    name: 'Deepak Mondal',
    sector: 'healthcare',
    trade: 'General Ward Sanitizer',
    experienceYears: 3,
    phone: '+91 92777 88990',
    nationalIdMasked: 'XXXX-XXXX-4422',
    dailyBaseRate: 700,
    hourlyRate: 87.50,
    preferredLanguage: 'bn',
    emergencyContact: { name: 'Bina Mondal', phone: '+91 92777 88991' },
    passport: {
      passportNumber: 'FW-PASS-H204',
      issuedDate: '2024-05-18',
      safetyScore: 88,
      verifiedHours: 1100,
      certifications: [
        { name: 'General Ward Hygiene Protocols', issuer: 'Healthcare Skill Council', date: '2024-04-10', validUntil: '2027-04-10', status: 'verified' }
      ],
      skills: ['Floor Buffing', 'Antiseptic Fogging', 'Waste Disposal Bagging'],
      employerReviews: []
    },
    status: 'flagged_fatigue', // 11.2h shift logged
    currentShiftId: 'shift-live-7'
  },
  {
    id: 'w-h5',
    name: 'Sunita Mehra',
    sector: 'healthcare',
    trade: 'Pathology & Sterile Supply Attendant',
    experienceYears: 5,
    phone: '+91 91666 99887',
    nationalIdMasked: 'XXXX-XXXX-7140',
    dailyBaseRate: 780,
    hourlyRate: 97.50,
    preferredLanguage: 'hi',
    emergencyContact: { name: 'Alok Mehra', phone: '+91 91666 99888' },
    passport: {
      passportNumber: 'FW-PASS-H205',
      issuedDate: '2024-01-25',
      safetyScore: 97,
      verifiedHours: 2350,
      certifications: [
        { name: 'Pathology Specimen Safe Transit', issuer: 'Health Skill Council', date: '2023-07-15', validUntil: '2026-07-15', status: 'verified' }
      ],
      skills: ['Sharps Container Disposal', 'Specimen Tube Centrifuge Transit', 'Cold Chain Bag Logistics'],
      employerReviews: []
    },
    status: 'off_duty',
    currentShiftId: null
  }
];

const initialShifts = [
  // Live on-shift records
  {
    id: 'shift-live-1',
    workerId: 'w-c1',
    workerName: 'Rajesh Kumar',
    sector: 'construction',
    shiftType: 'Day Shift',
    siteLocation: 'Metro Rail Line-3 Tower C',
    taskDescription: 'Scaffolding erection for 14th floor exterior facade',
    hazardRating: 'High',
    requiredPPE: ['Hard Hat', 'Safety Harness (Double Lanyard)', 'Steel-toe Boots'],
    startTime: new Date(Date.now() - 6.5 * 3600 * 1000).toISOString(),
    endTime: null,
    hoursWorkedSoFar: 6.5,
    status: 'active',
    fatigueRisk: 'normal'
  },
  {
    id: 'shift-live-3',
    workerId: 'w-c3',
    workerName: 'Anil Soren',
    sector: 'construction',
    shiftType: 'Extended Welding Overtime',
    siteLocation: 'Flyover Pier 18',
    taskDescription: 'Girder beam joint re-welding on structural span',
    hazardRating: 'High',
    requiredPPE: ['Welding Helmet', 'Leather Apron', 'Heat Gloves', 'Steel-toe Boots'],
    startTime: new Date(Date.now() - 10.5 * 3600 * 1000).toISOString(), // 10.5h! Exceeds 10h cap
    endTime: null,
    hoursWorkedSoFar: 10.5,
    status: 'active',
    fatigueRisk: 'critical'
  },
  {
    id: 'shift-live-4',
    workerId: 'w-c4',
    workerName: 'Selvam Perumal',
    sector: 'construction',
    shiftType: 'Day Shift',
    siteLocation: 'Metro Rail Pier 22',
    taskDescription: 'Rebar tying for concrete pile cap',
    hazardRating: 'Medium',
    requiredPPE: ['Hard Hat', 'Grip Gloves', 'Safety Glasses'],
    startTime: new Date(Date.now() - 4.0 * 3600 * 1000).toISOString(),
    endTime: null,
    hoursWorkedSoFar: 4.0,
    status: 'active',
    fatigueRisk: 'normal'
  },
  {
    id: 'shift-live-5',
    workerId: 'w-h1',
    workerName: 'Maria Santos',
    sector: 'healthcare',
    shiftType: 'Morning Ward Shift',
    siteLocation: 'General Hospital Block B (Infectious Diseases)',
    taskDescription: 'Terminal decontamination of isolation rooms and biomedical waste transfer',
    hazardRating: 'High',
    requiredPPE: ['N95 Respirator', 'Biohazard Apron', 'Nitrile Gloves', 'Face Visor'],
    startTime: new Date(Date.now() - 5.0 * 3600 * 1000).toISOString(),
    endTime: null,
    hoursWorkedSoFar: 5.0,
    status: 'active',
    fatigueRisk: 'normal'
  },
  {
    id: 'shift-live-6',
    workerId: 'w-h3',
    workerName: 'Lakshmi Narayana',
    sector: 'healthcare',
    shiftType: 'Central Laundry Shift',
    siteLocation: 'Basement Sterilisation Plant',
    taskDescription: 'Soiled surgical drapery high-temp wash cycle',
    hazardRating: 'Medium',
    requiredPPE: ['Chemical Apron', 'Thermal Gloves', 'Goggles'],
    startTime: new Date(Date.now() - 7.5 * 3600 * 1000).toISOString(),
    endTime: null,
    hoursWorkedSoFar: 7.5,
    status: 'active',
    fatigueRisk: 'warning' // approaching 8.5h
  },
  {
    id: 'shift-live-7',
    workerId: 'w-h4',
    workerName: 'Deepak Mondal',
    sector: 'healthcare',
    shiftType: 'Double Night-into-Morning',
    siteLocation: 'Emergency Care Unit Wing A',
    taskDescription: 'Emergency room floor bio-spill sanitisation and trauma ward turnover',
    hazardRating: 'High',
    requiredPPE: ['N95 Mask', 'Biohazard Gloves', 'Protective Booties'],
    startTime: new Date(Date.now() - 11.2 * 3600 * 1000).toISOString(), // 11.2 hours!
    endTime: null,
    hoursWorkedSoFar: 11.2,
    status: 'active',
    fatigueRisk: 'critical'
  }
];

const initialWages = [
  {
    id: 'wage-rec-101',
    workerId: 'w-c1',
    workerName: 'Rajesh Kumar',
    sector: 'construction',
    payPeriod: '2026-W42 (Oct 19 - Oct 25)',
    standardHours: 48,
    overtimeHours: 6,
    baseHourlyRate: 106.25,
    basePay: 5100.00,
    overtimePay: 956.25, // 1.5x
    hazardAllowance: 637.50, // +25% construction hazard differential
    deductions: 0.00,
    netPayable: 6693.75,
    paymentStatus: 'disbursed',
    transactionRef: 'TXN-FW-893011',
    disbursedDate: '2026-10-26T14:30:00Z',
    notes: 'Approved by Site Manager; verified via biometric logs'
  },
  {
    id: 'wage-rec-102',
    workerId: 'w-c2',
    workerName: 'Manoj Verma',
    sector: 'construction',
    payPeriod: '2026-W42 (Oct 19 - Oct 25)',
    standardHours: 48,
    overtimeHours: 2,
    baseHourlyRate: 112.50,
    basePay: 5400.00,
    overtimePay: 337.50,
    hazardAllowance: 675.00,
    deductions: 0.00,
    netPayable: 6412.50,
    paymentStatus: 'disbursed',
    transactionRef: 'TXN-FW-893012',
    disbursedDate: '2026-10-26T14:35:00Z',
    notes: 'Completed brickwork milestone on time'
  },
  {
    id: 'wage-rec-103',
    workerId: 'w-c3',
    workerName: 'Anil Soren',
    sector: 'construction',
    payPeriod: '2026-W42 (Oct 19 - Oct 25)',
    standardHours: 48,
    overtimeHours: 14, // Excessive overtime flagged
    baseHourlyRate: 110.00,
    basePay: 5280.00,
    overtimePay: 2310.00,
    hazardAllowance: 660.00,
    deductions: 0.00,
    netPayable: 8250.00,
    paymentStatus: 'approved_pending_transfer',
    transactionRef: null,
    disbursedDate: null,
    notes: 'Overtime compensation audit completed. Awaiting escrow disbursement.'
  },
  {
    id: 'wage-rec-104',
    workerId: 'w-h1',
    workerName: 'Maria Santos',
    sector: 'healthcare',
    payPeriod: '2026-W42 (Oct 19 - Oct 25)',
    standardHours: 48,
    overtimeHours: 4,
    baseHourlyRate: 102.50,
    basePay: 4920.00,
    overtimePay: 615.00,
    hazardAllowance: 984.00, // Biohazard allowance +20%
    deductions: 0.00,
    netPayable: 6519.00,
    paymentStatus: 'disbursed',
    transactionRef: 'TXN-FW-893013',
    disbursedDate: '2026-10-26T15:00:00Z',
    notes: 'ICU infection control bonus included'
  },
  {
    id: 'wage-rec-105',
    workerId: 'w-h4',
    workerName: 'Deepak Mondal',
    sector: 'healthcare',
    payPeriod: '2026-W42 (Oct 19 - Oct 25)',
    standardHours: 48,
    overtimeHours: 8,
    baseHourlyRate: 87.50,
    basePay: 4200.00,
    overtimePay: 1050.00,
    hazardAllowance: 840.00,
    deductions: 0.00,
    netPayable: 6090.00,
    paymentStatus: 'under_review',
    transactionRef: null,
    disbursedDate: null,
    notes: 'Worker filed inquiry regarding night-differential calculation'
  }
];

const initialSafetyIncidents = [
  {
    id: 'inc-001',
    sector: 'construction',
    workerId: 'w-c1',
    workerName: 'Rajesh Kumar',
    incidentType: 'Near-Miss / Fall Hazard',
    severity: 'High',
    location: 'Metro Rail Tower C - Level 12',
    timestamp: '2026-10-25T11:15:00Z',
    description: 'Scaffolding anchor hook clamp was loose. Worker caught it during pre-climb safety harness check before stepping onto plank.',
    immediateActionTaken: 'Work stopped immediately. Clamp replaced and entire row re-torqued.',
    preventiveMeasure: 'Mandatory two-person signoff on all cantilever scaffold anchors before shift commencement.',
    status: 'resolved',
    investigatedBy: 'Chief Safety Inspector Patel'
  },
  {
    id: 'inc-002',
    sector: 'healthcare',
    workerId: 'w-h1',
    workerName: 'Maria Santos',
    incidentType: 'PPE Non-Compliance / Defective Stock',
    severity: 'Medium',
    location: 'Hospital Central Supply & ICU Wing',
    timestamp: '2026-10-24T09:40:00Z',
    description: 'Batch of nitrile biohazard gloves showed micro-tears under stretch test prior to isolation ward cleaning.',
    immediateActionTaken: 'Quarantined 20 boxes of batch lot #BG-9912. Replaced with heavy-duty medical grade stock.',
    preventiveMeasure: 'Supplier defect logged. Direct inspection checkpoint added to hospital intake dock.',
    status: 'resolved',
    investigatedBy: 'Dr. Aris Thorne (Infection Control)'
  },
  {
    id: 'inc-003',
    sector: 'construction',
    workerId: 'w-c4',
    workerName: 'Selvam Perumal',
    incidentType: 'Pinch Point / Heavy Rebar Shift',
    severity: 'Medium',
    location: 'Pier 22 Foundation Trench',
    timestamp: '2026-10-26T14:10:00Z',
    description: 'Rebar bundle shifted slightly during crane unhooking. Worker was wearing cut-proof gloves; no skin puncture occurred.',
    immediateActionTaken: 'Added timber chocks to all ground storage staging cradles.',
    preventiveMeasure: 'Pre-unhooking inspection protocol re-enforced for all rigging crews.',
    status: 'resolved',
    investigatedBy: 'Site Engineer Reddy'
  }
];

const initialGrievances = [
  {
    id: 'grv-7101',
    trackingCode: 'FW-GRV-7101',
    sector: 'construction',
    isAnonymous: true,
    reportedBy: 'Anonymous Worker',
    category: 'OVERTIME_COERCION',
    priority: 'High',
    timestamp: '2026-10-24T18:30:00Z',
    description: 'Sub-contractor supervisor threatened deduction of 2 days pay if rebar team did not stay past 10 hours for night pour.',
    location: 'Pier 19 Foundations',
    status: 'under_investigation',
    officialNotes: 'Grievance received. Labor compliance officer assigned to conduct unannounced night visit. Subcontractor issued formal inquiry.',
    resolutionDate: null
  },
  {
    id: 'grv-7103',
    trackingCode: 'FW-GRV-7103',
    sector: 'healthcare',
    isAnonymous: false,
    reportedBy: 'Deepak Mondal',
    workerId: 'w-h4',
    category: 'WAGE_DELAY',
    priority: 'Medium',
    timestamp: '2026-10-22T10:00:00Z',
    description: 'Night shift hazard allowance for the previous cycle was omitted from the automated payroll summary.',
    location: 'Emergency Wing',
    status: 'resolved',
    officialNotes: 'Payroll audit verified 8 hours of eligible bio-hazard night shift. Supplementary credit added to week 42 disbursement.',
    resolutionDate: '2026-10-24T11:00:00Z'
  }
];

module.exports = {
  initialWorkers,
  initialShifts,
  initialWages,
  initialSafetyIncidents,
  initialGrievances
};
