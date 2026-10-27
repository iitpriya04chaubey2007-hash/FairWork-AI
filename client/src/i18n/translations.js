// Multilingual Dictionary for FairWork AI
// Supporting English, Hindi, Tamil, Telugu, Bengali, Kannada, Marathi, Spanish

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'es', label: 'Spanish', native: 'Español' }
];

export const translations = {
  en: {
    appName: 'FairWork AI',
    tagline: 'Fair, Safe & Transparent Manual Workforce Management',
    demoModeActive: 'DEMO EVALUATION MODE',
    resetDemo: 'Reset Demo Data',
    switchPersona: 'Quick Persona',
    sectors: {
      all: 'All Sectors',
      construction: 'Construction',
      healthcare: 'Healthcare',
      education: 'Education',
      manufacturing: 'Manufacturing'
    },
    nav: {
      overview: 'Overview',
      workerPortal: 'Worker Portal',
      employerRoster: 'Worker Roster',
      wageLedger: 'Wage Records',
      safetyFatigue: 'Safety & Fatigue',
      voiceGrievance: 'Worker Voice & Grievance',
      adminTrends: 'Admin & Trends'
    },
    common: {
      search: 'Search worker, skill, ID...',
      filter: 'Filter',
      status: 'Status',
      actions: 'Actions',
      cancel: 'Cancel',
      submit: 'Submit',
      save: 'Save',
      loading: 'Loading data...',
      active: 'Active',
      onShift: 'On Shift',
      offDuty: 'Off Duty',
      flaggedFatigue: 'Fatigue Alert',
      disbursed: 'Disbursed',
      pending: 'Pending',
      underReview: 'Under Review',
      critical: 'Critical',
      warning: 'Warning',
      normal: 'Normal',
      resolved: 'Resolved',
      underInvestigation: 'Investigating',
      anonymous: 'Anonymous',
      listenAudio: 'Read Aloud'
    },
    worker: {
      title: 'Worker Digital Space',
      registerWorker: 'Register Worker',
      skillPassport: 'Skill Passport',
      checkIn: 'Check-In to Shift',
      checkOut: 'Check-Out (End Shift)',
      verifiedHours: 'Verified Hours',
      safetyScore: 'Safety Score',
      hazardPay: 'Hazard Allowance',
      overtime: 'Overtime Rate (1.5x)',
      certifications: 'Certifications',
      experience: 'Experience'
    },
    wages: {
      title: 'Transparent Wage Ledger',
      downloadCsv: 'Download CSV Audit',
      calculateWage: 'Calculate Wage Slip',
      standardHours: 'Standard Hours',
      overtimeHours: 'Overtime Hours',
      baseRate: 'Hourly Base',
      hazardDifferential: 'Hazard Pay',
      netPayable: 'Net Payable',
      disburseWage: 'Disburse Funds',
      viewSlip: 'View Pay Slip'
    },
    safety: {
      title: 'Safety Incidents & Fatigue Alerts',
      reportIncident: 'Report Safety Incident',
      fatigueDisclaimer: 'Configurable labor policy threshold engine based on logged shift hours and statutory rest guidelines; does NOT constitute medical diagnosis.',
      enforceRest: 'Enforce Rest Break',
      hoursLogged: 'Hours Logged',
      maxDailyCap: 'Max 10h Daily Cap'
    },
    grievances: {
      title: 'Voice of Workers & Grievances',
      fileGrievance: 'Submit Grievance',
      anonymousNote: '100% Anonymous whistleblower mode available. Your identity is never stored without consent.',
      trackingLookup: 'Track Grievance with Ticket',
      trackingCode: 'Tracking Code',
      trackButton: 'Lookup Status'
    }
  },

  hi: {
    appName: 'फेयरवर्क AI',
    tagline: 'श्रमिकों के लिए निष्पक्ष, सुरक्षित और पारदर्शी कार्य प्रबंधन',
    demoModeActive: 'डेमो मूल्यांकन मोड',
    resetDemo: 'डेमो डेटा रीसेट करें',
    switchPersona: 'डेमो उपयोगकर्ता बदलें',
    sectors: {
      all: 'सभी क्षेत्र',
      construction: 'निर्माण (कंस्ट्रक्शन)',
      healthcare: 'स्वास्थ्य सेवा (अस्पताल)',
      education: 'शिक्षा (कॉलेज / स्कूल)',
      manufacturing: 'विनिर्माण (फैक्ट्री)'
    },
    nav: {
      overview: 'अवलोकन',
      workerPortal: 'श्रमिक पोर्टल',
      employerRoster: 'श्रमिक रोस्टर',
      wageLedger: 'मजदूरी रिकॉर्ड',
      safetyFatigue: 'सुरक्षा और थकान अलर्ट',
      voiceGrievance: 'श्रमिक शिकायत पोर्टल',
      adminTrends: 'प्रशासक विश्लेषण'
    },
    common: {
      search: 'श्रमिक, कौशल या आईडी खोजें...',
      filter: 'फ़िल्टर',
      status: 'स्थिति',
      actions: 'कार्रवाई',
      cancel: 'रद्द करें',
      submit: 'जमा करें',
      save: 'सहेजें',
      loading: 'डेटा लोड हो रहा है...',
      active: 'सक्रिय',
      onShift: 'कार्य पर उपस्थित',
      offDuty: 'ड्यूटी समाप्त',
      flaggedFatigue: 'थकान चेतावनी',
      disbursed: 'भुगतान पूर्ण',
      pending: 'लंबित',
      underReview: 'समीक्षाधीन',
      critical: 'गंभीर',
      warning: 'चेतावनी',
      normal: 'सामान्य',
      resolved: 'समाधान हो गया',
      underInvestigation: 'जांच जारी',
      anonymous: 'गुमनाम (गोपनीय)',
      listenAudio: 'बोलकर सुनाएं'
    },
    worker: {
      title: 'श्रमिक डिजिटल पहचान',
      registerWorker: 'नया श्रमिक पंजीकरण',
      skillPassport: 'कौशल पासपोर्ट',
      checkIn: 'काम पर उपस्थिति दर्ज करें',
      checkOut: 'शिफ्ट समाप्त करें',
      verifiedHours: 'प्रमाणित कार्य घंटे',
      safetyScore: 'सुरक्षा स्कोर',
      hazardPay: 'जोखिम भत्ता',
      overtime: 'ओवरटाइम दर (1.5x)',
      certifications: 'प्रमाणपत्र',
      experience: 'अनुभव'
    },
    wages: {
      title: 'पारदर्शी मजदूरी खाता',
      downloadCsv: 'ऑडिट CSV डाउनलोड करें',
      calculateWage: 'मजदूरी की गणना करें',
      standardHours: 'सामान्य घंटे',
      overtimeHours: 'ओवरटाइम घंटे',
      baseRate: 'प्रति घंटा दर',
      hazardDifferential: 'जोखिम भत्ता',
      netPayable: 'कुल देय राशि',
      disburseWage: 'भुगतान जारी करें',
      viewSlip: 'पे स्लिप देखें'
    },
    safety: {
      title: 'सुरक्षा घटनाएं और कार्य थकान अलर्ट',
      reportIncident: 'सुरक्षा घटना की रिपोर्ट करें',
      fatigueDisclaimer: 'यह प्रणाली कार्य घंटों और श्रम कानूनों के नियमों पर आधारित है; यह कोई चिकित्सकीय जांच नहीं है।',
      enforceRest: 'अनिवार्य विश्राम लागू करें',
      hoursLogged: 'कार्य घंटे दर्ज',
      maxDailyCap: 'अधिकतम 10 घंटे सीमा'
    },
    grievances: {
      title: 'श्रमिक आवाज और निष्पक्ष व्यवहार शिकायत',
      fileGrievance: 'शिकायत दर्ज करें',
      anonymousNote: '100% गोपनीय व्हिसलब्लोअर मोड उपलब्ध है। आपकी पहचान पूरी तरह गुप्त रखी जाएगी।',
      trackingLookup: 'टिकट संख्या से जांचें',
      trackingCode: 'ट्रैकिंग कोड',
      trackButton: 'स्थिति देखें'
    }
  },

  ta: {
    appName: 'ஃபேர்வொர்க் AI',
    tagline: 'தொழிலாளர்களுக்கான நியாயமான, பாதுகாப்பான பணி மேலாண்மை',
    demoModeActive: 'டெமோ பயன்முறை',
    resetDemo: 'டெமோ தரவை மீட்டமை',
    switchPersona: 'பயனரை மாற்றுக',
    sectors: {
      all: 'அனைத்து துறைகள்',
      construction: 'கட்டுமானம்',
      healthcare: 'மருத்துவமனை',
      education: 'கல்விக்கூடங்கள்',
      manufacturing: 'தொழிற்சாலைகள்'
    },
    nav: {
      overview: 'கண்ணோட்டம்',
      workerPortal: 'தொழிலாளர் தளம்',
      employerRoster: 'தொழிலாளர் பட்டியல்',
      wageLedger: 'ஊதிய பதிவேடு',
      safetyFatigue: 'பாதுகாப்பு & சோர்வு எச்சரிக்கை',
      voiceGrievance: 'குறைதீர்ப்பு தளம்',
      adminTrends: 'நிர்வாக புள்ளிவிவரம்'
    },
    common: {
      search: 'தொழிலாளர் பெயர், திறனைத் தேடு...',
      filter: 'வடிகட்டு',
      status: 'நிலை',
      actions: 'செயல்கள்',
      cancel: 'ரத்து செய்',
      submit: 'சமர்ப்பி',
      save: 'சேமி',
      loading: 'ஏற்றுகிறது...',
      active: 'செயலில்',
      onShift: 'பணியில்',
      offDuty: 'பணி நிறைவு',
      flaggedFatigue: 'சோர்வு எச்சரிக்கை',
      disbursed: 'வழங்கப்பட்டது',
      pending: 'நிலுவையில்',
      underReview: 'பரிசீலனையில்',
      critical: 'அவசரம்',
      warning: 'எச்சரிக்கை',
      normal: 'இயல்பானது',
      resolved: 'தீர்க்கப்பட்டது',
      underInvestigation: 'விசாரணையில்',
      anonymous: 'பெயரற்ற ரகசியம்',
      listenAudio: 'ஒலிக்கேட்கவும்'
    },
    worker: {
      title: 'தொழிலாளர் சுயவிவரம்',
      registerWorker: 'தொழிலாளர் பதிவு',
      skillPassport: 'திறன் பாஸ்போர்ட்',
      checkIn: 'பணி தொடங்கு',
      checkOut: 'பணி முடி',
      verifiedHours: 'சரிபார்க்கப்பட்ட நேரம்',
      safetyScore: 'பாதுகாப்பு மதிப்பீடு',
      hazardPay: 'ஆபத்துப்படி',
      overtime: 'கூடுதல் நேர ஊதியம் (1.5x)',
      certifications: 'சான்றிதழ்கள்',
      experience: 'அனுபவம்'
    },
    wages: {
      title: 'வெளிப்படையான ஊதிய பதிவு',
      downloadCsv: 'CSV பதிவிறக்கம்',
      calculateWage: 'ஊதியம் கணக்கிடு',
      standardHours: 'வழக்கமான நேரம்',
      overtimeHours: 'கூடுதல் நேரம்',
      baseRate: 'அடிப்படை விகிதம்',
      hazardDifferential: 'ஆபத்துப்படி',
      netPayable: 'மொத்த ஊதியம்',
      disburseWage: 'வழங்குதல்',
      viewSlip: 'சீட்டை காண்க'
    },
    safety: {
      title: 'பாதுகாப்பு மற்றும் சோர்வு எச்சரிக்கை',
      reportIncident: 'சம்பவத்தை பதிவு செய்',
      fatigueDisclaimer: 'இது வேலை நேர கொள்கை அடிப்படையிலானது; மருத்துவ மதிப்பீடு அல்ல.',
      enforceRest: 'ஓய்வு அளிக்க உத்தரவிடு',
      hoursLogged: 'வேலை நேரம்',
      maxDailyCap: 'அதிகபட்சம் 10 மணி நேரம்'
    },
    grievances: {
      title: 'தொழிலாளர் குரல் & புகார்கள்',
      fileGrievance: 'புகார் அளிக்கவும்',
      anonymousNote: '100% ரகசியமாக புகார் அளிக்கலாம்.',
      trackingLookup: 'குறியீடு மூலம் அறிய',
      trackingCode: 'கண்காணிப்பு குறியீடு',
      trackButton: 'நிலை அறிதல்'
    }
  },

  te: {
    appName: 'ఫెయిర్‌వర్క్ AI',
    tagline: 'కార్మికుల కోసం న్యాయమైన, సురక్షితమైన పని నిర్వహణ',
    demoModeActive: 'డెమో మూల్యాంకనం మోడ్',
    resetDemo: 'డేటాను రీసెట్ చేయండి',
    switchPersona: 'వినియోగదారుని మార్చండి',
    sectors: {
      all: 'అన్ని రంగాలు',
      construction: 'భవన నిర్మాణం',
      healthcare: 'ఆరోగ్య సంరక్షణ',
      education: 'విద్యా సంస్థలు',
      manufacturing: 'కర్మాగారాలు'
    },
    nav: {
      overview: 'అవలోకనం',
      workerPortal: 'కార్మిక పోర్టల్',
      employerRoster: 'కార్మికుల జాబితా',
      wageLedger: 'వేతన రికార్డులు',
      safetyFatigue: 'భద్రత & అలసట హెచ్చరిక',
      voiceGrievance: 'ఫిర్యాదుల విభాగం',
      adminTrends: 'అడ్మిన్ విశ్లేషణ'
    },
    common: {
      search: 'శోధించండి...',
      filter: 'ఫిల్టర్',
      status: 'స్థితి',
      actions: 'చర్యలు',
      cancel: 'రద్దు చేయి',
      submit: 'సమర్పించు',
      save: 'భద్రపరచు',
      loading: 'లోడ్ అవుతోంది...',
      active: 'క్రియాశీల',
      onShift: 'పనిలో ఉన్నారు',
      offDuty: 'విధులలో లేరు',
      flaggedFatigue: 'అలసట హెచ్చరిక',
      disbursed: 'చెల్లించబడింది',
      pending: 'పెండింగ్‌లో ఉంది',
      underReview: 'పరిశీలనలో ఉంది',
      critical: 'తీవ్రమైనది',
      warning: 'హెచ్చరిక',
      normal: 'సాధారణం',
      resolved: 'పరిష్కరించబడింది',
      underInvestigation: 'విచారణలో ఉంది',
      anonymous: 'గోప్యమైనది',
      listenAudio: 'వినండి'
    },
    worker: {
      title: 'కార్మిక వివరాలు',
      registerWorker: 'నమోదు చేసుకోండి',
      skillPassport: 'నైపుణ్య పాస్‌పోర్ట్',
      checkIn: 'హాజరు నమోదు చేయండి',
      checkOut: 'షిఫ్ట్ ముగించండి',
      verifiedHours: 'ధృవీకరించబడిన గంటలు',
      safetyScore: 'భద్రతా స్కోరు',
      hazardPay: 'ప్రమాద భత్యం',
      overtime: 'ఓవర్‌టైమ్ (1.5x)',
      certifications: 'ధృవపత్రాలు',
      experience: 'అనుభవం'
    },
    wages: {
      title: 'పారదర్శక వేతన రికార్డు',
      downloadCsv: 'CSV డౌన్‌లోడ్',
      calculateWage: 'వేతనం లెక్కించు',
      standardHours: 'సాధారణ గంటలు',
      overtimeHours: 'ఓవర్‌టైమ్ గంటలు',
      baseRate: 'గంటల రేటు',
      hazardDifferential: 'ప్రమాద భత్యం',
      netPayable: 'మొత్తం వేతనం',
      disburseWage: 'చెల్లింపు చేయండి',
      viewSlip: 'స్లిప్ చూడండి'
    },
    safety: {
      title: 'భద్రత మరియు అలసట నిర్వహణ',
      reportIncident: 'సమస్యను నివేదించండి',
      fatigueDisclaimer: 'ఇది నియమ నిబంధనల ఆధారిత హెచ్చరిక మాత్రమే; వైద్య నిర్ధారణ కాదు.',
      enforceRest: 'విశ్రాంతి కల్పించండి',
      hoursLogged: 'పని గంటలు',
      maxDailyCap: 'రోజుకు గరిష్టంగా 10 గంటలు'
    },
    grievances: {
      title: 'కార్మికుల మనోభావాలు & ఫిర్యాదులు',
      fileGrievance: 'ఫిర్యాదు నమోదు చేయండి',
      anonymousNote: '100% గోప్యంగా ఉంచబడుతుంది.',
      trackingLookup: 'కోడ్ ద్వారా ట్రాక్ చేయండి',
      trackingCode: 'ట్రాకింగ్ కోడ్',
      trackButton: 'స్థితి తనిఖీ'
    }
  },

  bn: {
    appName: 'ফেয়ারওয়ার্ক এআই',
    tagline: 'শ্রমিকদের জন্য ন্যায্য, নিরাপদ ও স্বচ্ছ কর্মপরিচালনা',
    demoModeActive: 'ডেমো মূল্যায়ন মোড',
    resetDemo: 'ডেমো ডেটা রিসেট করুন',
    switchPersona: 'ব্যবহারকারী পরিবর্তন করুন',
    sectors: {
      all: 'সব সেক্টর',
      construction: 'নির্মাণ শিল্প',
      healthcare: 'স্বাস্থ্যসেবা (হাসপাতাল)',
      education: 'শিক্ষা প্রতিষ্ঠান',
      manufacturing: 'কারখানা ও শিল্প'
    },
    nav: {
      overview: 'সারসংক্ষেপ',
      workerPortal: 'শ্রমিক পোর্টাল',
      employerRoster: 'শ্রমিক তালিকা',
      wageLedger: 'মজুরি খতিয়ান',
      safetyFatigue: 'নিরাপত্তা ও ক্লান্তি সতর্কতা',
      voiceGrievance: 'অভিযোগ ও মতামত',
      adminTrends: 'অ্যাডমিন বিশ্লেষণ'
    },
    common: {
      search: 'অনুসন্ধান করুন...',
      filter: 'ফিল্টার',
      status: 'অবস্থা',
      actions: 'পদক্ষেপ',
      cancel: 'বাতিল',
      submit: 'জমা দিন',
      save: 'সংরক্ষণ',
      loading: 'লোড হচ্ছে...',
      active: 'সক্রিয়',
      onShift: 'কাজে উপস্থিত',
      offDuty: 'ছুটি',
      flaggedFatigue: 'ক্লান্তি সতর্কতা',
      disbursed: 'প্রদত্ত হয়েছে',
      pending: 'মুলতুবি',
      underReview: 'পর্যালোচনাধীন',
      critical: 'জরুরি',
      warning: 'সতর্কতা',
      normal: 'স্বাভাবিক',
      resolved: 'মীমাংসিত',
      underInvestigation: 'তদন্তাধীন',
      anonymous: 'গোপনীয়',
      listenAudio: 'শুনুন'
    },
    worker: {
      title: 'শ্রমিক ডিজিটাল পরিচয়পত্র',
      registerWorker: 'শ্রমিক নিবন্ধন',
      skillPassport: 'দক্ষতা পাসপোর্ট',
      checkIn: 'কাজে প্রবেশ করুন',
      checkOut: 'কাজ সমাপ্ত করুন',
      verifiedHours: 'যাচাইকৃত কাজের সময়',
      safetyScore: 'নিরাপত্তা স্কোর',
      hazardPay: 'ঝুঁকি ভাতা',
      overtime: 'ওভারটাইম রেট (১.৫ গুণ)',
      certifications: 'সনদপত্র',
      experience: 'অভিজ্ঞতা'
    },
    wages: {
      title: 'স্বচ্ছ মজুরি হিসাব',
      downloadCsv: 'সিএসভি ডাউনলোড',
      calculateWage: 'মজুরি হিসাব করুন',
      standardHours: 'সাধারণ ঘণ্টা',
      overtimeHours: 'ওভারটাইম ঘণ্টা',
      baseRate: 'ঘণ্টাপ্রতি হার',
      hazardDifferential: 'ঝুঁকি ভাতা',
      netPayable: 'মোট প্রদেয় টাকা',
      disburseWage: 'মজুরি প্রদান করুন',
      viewSlip: 'রসিদ দেখুন'
    },
    safety: {
      title: 'কর্মক্ষেত্র নিরাপত্তা ও ক্লান্তি পরিমাপক',
      reportIncident: 'ঘটনার রিপোর্ট করুন',
      fatigueDisclaimer: 'এটি শ্রম আইন ও কাজের সময়ের নিয়মভিত্তিক সতর্কতা; কোনো চিকিৎসাগত রোগ নির্ণয় নয়।',
      enforceRest: 'অবশ্যই বিশ্রাম দিন',
      hoursLogged: 'কাজের ঘণ্টা',
      maxDailyCap: 'সর্বোচ্চ ১০ ঘণ্টা দৈনিক সীমা'
    },
    grievances: {
      title: 'শ্রমিকদের মতামত ও অভিযোগ কেন্দ্র',
      fileGrievance: 'অভিযোগ দাখিল করুন',
      anonymousNote: '১০০% পরিচয় গোপন রেখে অভিযোগ করা যায়।',
      trackingLookup: 'টিকিট দিয়ে অবস্থা দেখুন',
      trackingCode: 'ট্র্যাকিং কোড',
      trackButton: 'যাচাই করুন'
    }
  },

  kn: {
    appName: 'ಫೇರ್‌ವರ್ಕ್ ಎಐ',
    tagline: 'ಕಾರ್ಮಿಕರಿಗೆ ನ್ಯಾಯಯುತ ಮತ್ತು ಸುರಕ್ಷಿತ ಕೆಲಸದ ವ್ಯವಸ್ಥೆ',
    demoModeActive: 'ಡೆಮೊ ಮೌಲ್ಯಮಾಪನ ಮೋಡ್',
    resetDemo: 'ಡೆಮೊ ಮರುಹೊಂದಿಸಿ',
    switchPersona: 'ಬಳಕೆದಾರರನ್ನು ಬದಲಾಯಿಸಿ',
    sectors: {
      all: 'ಎಲ್ಲಾ ವಲಯಗಳು',
      construction: 'ಕಟ್ಟಡ ನಿರ್ಮಾಣ',
      healthcare: 'ಆರೋಗ್ಯ ಸೇವೆ',
      education: 'ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳು',
      manufacturing: 'ಕಾರ್ಖಾನೆಗಳು'
    },
    nav: {
      overview: 'ಅವಲೋಕನ',
      workerPortal: 'ಕಾರ್ಮಿಕರ ಪೋರ್ಟಲ್',
      employerRoster: 'ಕಾರ್ಮಿಕರ ಪಟ್ಟಿ',
      wageLedger: 'ಕೂಲಿ ದಾಖಲೆಗಳು',
      safetyFatigue: 'ಸುರಕ್ಷತೆ & ಆಯಾಸ ಎಚ್ಚರಿಕೆ',
      voiceGrievance: 'ದೂರು ನಿವಾರಣಾ ವಿಭಾಗ',
      adminTrends: 'ಅಡ್ಮಿನ್ ಅಂಕಿಅಂಶ'
    },
    common: {
      search: 'ಹುಡುಕಿ...',
      filter: 'ಫಿಲ್ಟರ್',
      status: 'ಸ್ಥಿತಿ',
      actions: 'ಕ್ರಿಯೆಗಳು',
      cancel: 'ರದ್ದುಮಾಡಿ',
      submit: 'ಸಲ್ಲಿಸಿ',
      save: 'ಉಳಿಸಿ',
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      active: 'ಸಕ್ರಿಯ',
      onShift: 'ಕೆಲಸದಲ್ಲಿದ್ದಾರೆ',
      offDuty: 'ಕೆಲಸ ಮುಗಿದಿದೆ',
      flaggedFatigue: 'ಆಯಾಸದ ಎಚ್ಚರಿಕೆ',
      disbursed: 'ಪಾವತಿಸಲಾಗಿದೆ',
      pending: 'ಬಾಕಿ ಇದೆ',
      underReview: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ',
      critical: 'ತುರ್ತು',
      warning: 'ಎಚ್ಚರಿಕೆ',
      normal: 'ಸಾಮಾನ್ಯ',
      resolved: 'ಪರಿಹರಿಸಲಾಗಿದೆ',
      underInvestigation: 'ತನಿಖೆಯಲ್ಲಿದೆ',
      anonymous: 'ಅನಾಮಧೇಯ',
      listenAudio: 'ಆಲಿಸಿ'
    },
    worker: {
      title: 'ಕಾರ್ಮಿಕರ ಪ್ರೊಫೈಲ್',
      registerWorker: 'ಕಾರ್ಮಿಕರ ನೋಂದಣಿ',
      skillPassport: 'ಕೌಶಲ್ಯ ಪಾಸ್‌ಪೋರ್ಟ್',
      checkIn: 'ಹಾಜರಾತಿ ಹಾಕಿ',
      checkOut: 'ಶಿಫ್ಟ್ ಮುಕ್ತಾಯ',
      verifiedHours: 'ದೃಢೀಕರಿಸಿದ ಗಂಟೆಗಳು',
      safetyScore: 'ಸುರಕ್ಷತಾ ಅಂಕಗಳು',
      hazardPay: 'ಅಪಾಯ ಭತ್ಯೆ',
      overtime: 'ಹೆಚ್ಚುವರಿ ಸಮಯ (1.5x)',
      certifications: 'ಪ್ರಮಾಣಪತ್ರಗಳು',
      experience: 'ಅನುಭವ'
    },
    wages: {
      title: 'ಪಾರದರ್ಶಕ ಕೂಲಿ ಖಾತೆ',
      downloadCsv: 'CSV ಡೌನ್‌ಲೋಡ್',
      calculateWage: 'ಕೂಲಿ ಲೆಕ್ಕಾಚಾರ',
      standardHours: 'ನಿಯಮಿತ ಗಂಟೆಗಳು',
      overtimeHours: 'ಹೆಚ್ಚುವರಿ ಗಂಟೆಗಳು',
      baseRate: 'ಪ್ರತಿ ಗಂಟೆಯ ದರ',
      hazardDifferential: 'ಅಪಾಯ ಭತ್ಯೆ',
      netPayable: 'ಒಟ್ಟು ಪಾವತಿ',
      disburseWage: 'ಪಾವತಿ ಮಾಡಿ',
      viewSlip: 'ರಶೀದಿ ವೀಕ್ಷಿಸಿ'
    },
    safety: {
      title: 'ಸುರಕ್ಷತೆ ಮತ್ತು ಆಯಾಸ ನಿರ್ವಹಣೆ',
      reportIncident: 'ಘಟನೆ ವರದಿ ಮಾಡಿ',
      fatigueDisclaimer: 'ಇದು ಕೆಲಸದ ಸಮಯದ ನಿಯಮಗಳನ್ನು ಆಧರಿಸಿದ ಎಚ್ಚರಿಕೆಯಾಗಿದೆ; ವೈದ್ಯಕೀಯ ಪರೀಕ್ಷೆಯಲ್ಲ.',
      enforceRest: 'ವಿಶ್ರಾಂತಿ ನೀಡಿ',
      hoursLogged: 'ಕೆಲಸ ಮಾಡಿದ ಸಮಯ',
      maxDailyCap: 'ದಿನಕ್ಕೆ ಗರಿಷ್ಠ 10 ಗಂಟೆ'
    },
    grievances: {
      title: 'ಕಾರ್ಮಿಕರ ಧ್ವನಿ ಮತ್ತು ದೂರುಗಳು',
      fileGrievance: 'ದೂರು ದಾಖಲಿಸಿ',
      anonymousNote: '100% ಅನಾಮಧೇಯವಾಗಿ ದೂರು ನೀಡಬಹುದು.',
      trackingLookup: 'ಕೋಡ್‌ನೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿ',
      trackingCode: 'ಟ್ರ್ಯಾಕಿಂಗ್ ಕೋಡ್',
      trackButton: 'ಸ್ಥಿತಿ ನೋಡಿ'
    }
  },

  mr: {
    appName: 'फेअरवर्क AI',
    tagline: 'कामगारांसाठी न्याय्य, सुरक्षित आणि पारदर्शक कार्य व्यवस्थापन',
    demoModeActive: 'डेमो मूल्यांकन मोड',
    resetDemo: 'डेटा रीसेट करा',
    switchPersona: 'वापरकर्ता बदला',
    sectors: {
      all: 'सर्व क्षेत्रे',
      construction: 'बांधकाम',
      healthcare: 'आरोग्य सेवा',
      education: 'शैक्षणिक संस्था',
      manufacturing: 'कारखाने / मॅन्युفॅक्चरिंग'
    },
    nav: {
      overview: 'आढावा',
      workerPortal: 'कामगार पोर्टल',
      employerRoster: 'कामगार यादी',
      wageLedger: 'मजुरी नोंदी',
      safetyFatigue: 'सुरक्षा आणि थकवा सूचना',
      voiceGrievance: 'तक्रार निवारण',
      adminTrends: 'प्रशासक आकडेवारी'
    },
    common: {
      search: 'शोधा...',
      filter: 'फिल्टर',
      status: 'स्थिती',
      actions: 'कृती',
      cancel: 'रद्द करा',
      submit: 'सादर करा',
      save: 'जतन करा',
      loading: 'लोड होत आहे...',
      active: 'सक्रिय',
      onShift: 'कामावर उपस्थित',
      offDuty: 'कामावर नाही',
      flaggedFatigue: 'थकवा इशारा',
      disbursed: 'भरणा पूर्ण',
      pending: 'प्रलंबित',
      underReview: 'तपासणी सुरू',
      critical: 'गंभीर',
      warning: 'चेतावणी',
      normal: 'सामान्य',
      resolved: 'निराकरण झाले',
      underInvestigation: 'चौकशी सुरू',
      anonymous: 'निनावी',
      listenAudio: 'ऐका'
    },
    worker: {
      title: 'कामगार डिजिटल प्रोफाईल',
      registerWorker: 'कामगार नोंदणी',
      skillPassport: 'कौशल्य पासपोर्ट',
      checkIn: 'कामावर हजेरी लावा',
      checkOut: 'शिफ्ट पूर्ण करा',
      verifiedHours: 'प्रमाणित कामाचे तास',
      safetyScore: 'सुरक्षा गुण',
      hazardPay: 'धोका भत्ता',
      overtime: 'ओव्हरटाईम दर (1.5x)',
      certifications: 'प्रमाणपत्रे',
      experience: 'अनुभव'
    },
    wages: {
      title: 'पारदर्शक मजुरी नोंदवही',
      downloadCsv: 'CSV डाउनलोड करा',
      calculateWage: 'मजुरी मोजा',
      standardHours: 'नेहमीचे तास',
      overtimeHours: 'ओव्हरटाईम तास',
      baseRate: 'ताशी दर',
      hazardDifferential: 'धोका भत्ता',
      netPayable: 'एकूण देय रक्कम',
      disburseWage: 'पैसे जमा करा',
      viewSlip: 'स्लिप पहा'
    },
    safety: {
      title: 'कामाची सुरक्षा आणि थकवा व्यवस्थापन',
      reportIncident: 'घटनेची तक्रार नोंदवा',
      fatigueDisclaimer: 'हा इशारा केवळ कामाच्या तासांच्या नियमांवर आधारित आहे; वैद्यकीय चाचणी नाही.',
      enforceRest: 'अनिवार्य विश्रांती द्या',
      hoursLogged: 'नोंदवलेले तास',
      maxDailyCap: 'दररोज कमाल 10 तास'
    },
    grievances: {
      title: 'कामगारांचा आवाज व तक्रारी',
      fileGrievance: 'तक्रार नोंदवा',
      anonymousNote: '100% निनावी तक्रार करता येते.',
      trackingLookup: 'कोडद्वारे स्थिती तपासा',
      trackingCode: 'ट्रॅकिंग कोड',
      trackButton: 'स्थिती पहा'
    }
  },

  es: {
    appName: 'FairWork AI',
    tagline: 'Gestión Laboral Justa, Segura y Transparente para Trabajadores',
    demoModeActive: 'MODO DE EVALUACIÓN DEMO',
    resetDemo: 'Restablecer Datos Demo',
    switchPersona: 'Cambiar Persona',
    sectors: {
      all: 'Todos los Sectores',
      construction: 'Construcción',
      healthcare: 'Salud y Hospitales',
      education: 'Educación',
      manufacturing: 'Fábricas y Manufactura'
    },
    nav: {
      overview: 'Inicio',
      workerPortal: 'Portal del Trabajador',
      employerRoster: 'Lista de Trabajadores',
      wageLedger: 'Registro de Salarios',
      safetyFatigue: 'Seguridad y Fatiga',
      voiceGrievance: 'Voz del Trabajador',
      adminTrends: 'Panel y Tendencias'
    },
    common: {
      search: 'Buscar trabajador, oficio...',
      filter: 'Filtrar',
      status: 'Estado',
      actions: 'Acciones',
      cancel: 'Cancelar',
      submit: 'Enviar',
      save: 'Guardar',
      loading: 'Cargando datos...',
      active: 'Activo',
      onShift: 'En Turno',
      offDuty: 'Fuera de Turno',
      flaggedFatigue: 'Alerta de Fatiga',
      disbursed: 'Pagado',
      pending: 'Pendiente',
      underReview: 'En Revisión',
      critical: 'Crítico',
      warning: 'Advertencia',
      normal: 'Normal',
      resolved: 'Resuelto',
      underInvestigation: 'En Investigación',
      anonymous: 'Anónimo',
      listenAudio: 'Escuchar'
    },
    worker: {
      title: 'Espacio Digital del Trabajador',
      registerWorker: 'Registrar Trabajador',
      skillPassport: 'Pasaporte de Habilidades',
      checkIn: 'Registrar Entrada',
      checkOut: 'Registrar Salida',
      verifiedHours: 'Horas Verificadas',
      safetyScore: 'Puntaje de Seguridad',
      hazardPay: 'Compensación por Riesgo',
      overtime: 'Horas Extras (1.5x)',
      certifications: 'Certificaciones',
      experience: 'Experiencia'
    },
    wages: {
      title: 'Libro Transparente de Salarios',
      downloadCsv: 'Descargar Auditoría CSV',
      calculateWage: 'Calcular Boleta',
      standardHours: 'Horas Estándar',
      overtimeHours: 'Horas Extras',
      baseRate: 'Tarifa por Hora',
      hazardDifferential: 'Bono de Riesgo',
      netPayable: 'Total a Pagar',
      disburseWage: 'Desembolsar Pago',
      viewSlip: 'Ver Recibo'
    },
    safety: {
      title: 'Incidentes y Alertas de Fatiga',
      reportIncident: 'Reportar Incidente',
      fatigueDisclaimer: 'Motor de reglas basado en horas de turno y normativas laborales; NO constituye un diagnóstico médico.',
      enforceRest: 'Aplicar Descanso Obligatorio',
      hoursLogged: 'Horas Registradas',
      maxDailyCap: 'Tope Diario de 10 Horas'
    },
    grievances: {
      title: 'Voz del Trabajador y Quejas',
      fileGrievance: 'Presentar Queja',
      anonymousNote: 'Modo denunciante 100% anónimo disponible.',
      trackingLookup: 'Consultar Estado con Código',
      trackingCode: 'Código de Rastreo',
      trackButton: 'Consultar'
    }
  }
};
