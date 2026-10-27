# FairWork AI 🛡️
> **Making Manual Workforce Management Fairer, Safer, and Truly Transparent**  
> *Built for Hackathon Evaluation • Multi-Sector: Construction, Healthcare, Education, and Manufacturing*

---

## 📌 Executive Summary & Problem Statement

Manual workers in critical sectors—construction scaffolders, hospital sanitation teams, campus facility caretakers, and factory stamping machinists—often face:
1. **Opaque Wages & Unpaid Overtime**: Verbal agreements or paper muster rolls that lead to wage theft and delayed settlements.
2. **Dangerous Fatigue & Site Incidents**: Excessive consecutive shifts without statutory rest, increasing fatal accident risks.
3. **Lack of Portable Proof of Experience**: Informal workers lose their work history and safety credentials when moving between contractors.
4. **Fear of Retaliation**: Workers hesitate to report abusive conditions or safety hazards without guaranteed anonymity.

**FairWork AI** solves this by establishing a verifiable, transparent labor protocol:
- **Verifiable Worker Skill Passport**: Portable digital credentials with QR verification, verified hours, and accredited safety certifications.
- **Rule-Based Fatigue Prevention Engine**: Calibrated to statutory labor thresholds (**>10h daily shift triggers critical alert & rest enforcement**; *no medical claims*).
- **Transparent Wage Ledger**: Real-time breakdown of standard hours, statutory 1.5x overtime, and sector hazard differentials (+25% construction, +20% healthcare/manufacturing, +5% education), with instant CSV audit exports and printable vouchers.
- **100% Anonymous Whistleblower Safe Haven**: Workers file grievances anonymously and track investigation progress via an unlinked ticket code (e.g. `FW-GRV-7101`).
- **High-Accessibility & Regional Languages**: 8 regional languages (**English, Hindi, Tamil, Telugu, Bengali, Kannada, Marathi, Spanish**) with **Voice Readout (Text-to-Speech)** for manual workers with low literacy.

---

## 🏗️ Architecture & Tech Stack

```
+---------------------------------------------------------------------------------+
|                                 CLIENT LAYER                                    |
|  React 18 + Vite + Tailwind CSS + Lucide Icons + Web Speech Audio Engine       |
|  - Navy Blue (#0F172A / #0B192C) + Crisp White + Vibrant Teal (#0D9488)        |
|  - 8-Language i18n Engine (EN, HI, TA, TE, BN, KN, MR, ES)                     |
|  - Role Quick Switcher: Worker Portal, Employer Roster, Inspector Admin         |
+---------------------------------------------------------------------------------+
                                       |
                              HTTP REST API (/api)
                                       v
+---------------------------------------------------------------------------------+
|                                 SERVER LAYER                                    |
|  Node.js + Express (Listening on process.env.PORT || 8080 for Cloud Run)        |
|  - Rule-based Fatigue Threshold Engine (>10h max shift, 10h min rest)           |
|  - Transparent Wage Calculator (1.5x Overtime & Sector Hazard Differentials)    |
|  - Anonymous Whistleblower Ticket Registry & CSV Audit Generator                |
+---------------------------------------------------------------------------------+
                                       |
                       Dual Storage Adapter (Zero-Config)
                       +---------------+---------------+
                       |                               |
                       v                               v
             Firebase Firestore               In-Memory / Local Store
       (When credentials provided)        (Default Zero-Config Demo Mode)
```

---

## ⚙️ Sector-Specific Standards

| Sector | Common Manual Roles | Critical Hazards Monitored | Hazard Pay Rate | Mandatory PPE |
| :--- | :--- | :--- | :--- | :--- |
| **🏗️ Construction** | Scaffolder, Mason, Welder, Rebar Worker | Falls from height, Heat exhaustion, Structural load | **+25%** | Hard Hat, Steel-toe Boots, Safety Harness |
| **🏥 Healthcare** | Sanitation Staff, Orderlies, Linen Sterilizers | Biohazards, Needle sticks, Night shift fatigue | **+20%** | N95 Mask, Nitrile Gloves, Face Shield |
| **🏫 Education** | Groundskeeper, Chemical Custodian, Facilities | Chemical fumes, Heavy mowers, High-voltage | **+5%** | Safety Goggles, Work Gloves, Sun Hat |
| **🏭 Manufacturing** | Stamping Press Operator, CNC Machinist, Forklift | Machinery pinch, Entrapment, Toxic dust | **+20%** | Ear Defenders, Cut-proof Gloves, LOTO |

---

## 🚀 Quickstart: Running Locally

### Prerequisites
- Node.js (v18, v20, or v24)
- npm (v9+)

### 1. Clone & Enter Project Directory
```bash
git clone <repo-url>
cd FairWork-AI
```

### 2. Install Dependencies
Dependencies for both client and server are installed automatically:
```bash
# Install server dependencies
cd server && npm install
cd ..

# Install client dependencies
cd client && npm install
cd ..
```

### 3. Build & Run (Single Command Production Mode)
This builds the React Vite frontend and starts the Express backend on `http://localhost:8080`, serving both the API and client:
```bash
npm run build
npm start
```
Now open **http://localhost:8080** in your web browser.

---

### Alternative: Development Mode (Hot Reload)
To run with live front-end hot-reloading:
- **Terminal 1 (Backend)**:
  ```bash
  npm run server:dev
  # API active on http://localhost:8080
  ```
- **Terminal 2 (Frontend)**:
  ```bash
  npm run client
  # Vite dev server active on http://localhost:5173 (proxied to 8080)
  ```

---

## 🧪 Running Automated Tests

Run the full unified test suite (covers backend API endpoints, fatigue logic, wage formulas, and i18n dictionaries):
```bash
npm test
```
All **13/13 test cases pass**:
- `✔ API: Health Check returns healthy status and Cloud Run config`
- `✔ API: Sectors endpoint returns all 4 required sectors with metadata`
- `✔ API: Workers endpoint lists workers and filters by sector`
- `✔ API: Worker Registration creates new worker with digital passport`
- `✔ API: Wage calculation correctly applies 1.5x overtime and hazard differential`
- `✔ API: Safety Rule-Based Fatigue evaluation flags shifts > 10 hours`
- `✔ API: Anonymous Grievance submission generates tracking code and supports lookup`
- `✔ API: Wage CSV export returns standard CSV formatted stream`
- `✔ API: Demo reset restores baseline state`
- `✔ i18n: Supports all 8 required regional languages`
- `✔ i18n: Language keys have navigation items and common labels`
- `✔ Rules: Fatigue thresholds logic enforces statutory limits without medical claim`
- `✔ Wage Logic: Standard 48h base + 1.5x overtime + 25% hazard allowance`

---

## 🔍 Judge & Evaluator Walkthrough Guide

The app loads pre-configured demo data across all 4 sectors. To explore:

1. **Top Banner (Demo Mode Switcher)**:
   - Click **"Rajesh Kumar (Construction Worker)"** to view a scaffolder's portal, shift check-in, and Skill Passport.
   - Click **"Maria Santos (Sanitation Lead)"** to view a healthcare biohazard worker's hazard differential and ICU infection control passport.
   - Click **"Site Operations Manager"** to access the employer roster and shift assigner.
   - Click **"Labor Inspector & Auditor"** to review cross-sector trends and anonymous complaints.
   - Click **"Reset Demo Data"** at any time to restore the clean baseline state.
2. **Worker Skill Passport**:
   - In the Worker Portal, click **"Skill Passport"** to view verified lifetime hours, safety score (98%), accredited certifications, and cryptographic QR verification hash.
   - Click **"Read Aloud"** to hear the audio speech readout.
3. **Transparent Wage Ledger & CSV Export**:
   - Navigate to **"Wage Records"**.
   - Review transparent overtime (1.5x) and hazard pay (+25% / +20%).
   - Click **"Download CSV Audit"** to download an auditable CSV ledger directly.
   - Click the eye icon next to any record to view and print the official pay slip.
   - Click **"Disburse Funds"** to generate a verifiable transaction hash (`TXN-FW-XXXXXX`).
4. **Safety & Rule-Based Fatigue Monitor**:
   - Navigate to **"Safety & Fatigue"**.
   - Notice the **Critical Fatigue Alert** for workers exceeding 10 hours on shift (e.g. Anil Soren at 10.5h or Suresh Naidu at 12.0h).
   - Click **"Enforce Rest Break"** to trigger a mandatory rest period.
   - Click **"Report Safety Incident"** to log a hazard or near-miss.
5. **Worker Voice & Whistleblower Portal**:
   - Navigate to **"Worker Voice & Grievance"**.
   - Check the **"Submit 100% Anonymously"** box and submit a complaint.
   - Note the generated tracking ticket (e.g. `FW-GRV-8492`).
   - Use the **"Track Grievance with Ticket"** box on the right to look up official investigation notes without logging in.
6. **Language Switcher**:
   - Switch languages in the top right to **हिंदी (Hindi), தமிழ் (Tamil), తెలుగు (Telugu), বাংলা (Bengali), ಕನ್ನಡ (Kannada), मराठी (Marathi), or Español (Spanish)** to see full regional localization.

---

## ☁️ Google Cloud Run Deployment

FairWork AI is containerized with a production multi-stage `Dockerfile` and configured to listen on the dynamic port supplied by Google Cloud Run (`process.env.PORT || 8080`).

### Deployment Steps (Manual Execution)
```bash
# 1. Set your Google Cloud Project
gcloud config set project YOUR_PROJECT_ID

# 2. Build the container image using Cloud Build
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/fairwork-ai

# 3. Deploy to Google Cloud Run
gcloud run deploy fairwork-ai \
  --image gcr.io/YOUR_PROJECT_ID/fairwork-ai \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```
> **Notice**: As per hackathon guidelines, cloud resources are not created automatically.

---

## 🔒 Firebase Firestore & Security Rules

When Firebase credentials are provided via `.env` (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`), the app securely binds to Google Cloud Firestore. If credentials are not present, it seamlessly operates in the In-Memory Demo Store without crashing.

The included [`firestore.rules`](file:///c:/Users/priya/Downloads/FairWork-AI/firestore.rules) defines access controls:
- **Workers**: Public read for roster; verified write validation.
- **Wages & Shifts**: Transparent read; restricted mutation to authorized handlers.
- **Anonymous Grievances**: Public creation without credential leakage; public tracking access filtered strictly by unique ticket code.

---

## ⚖️ Ethical AI & Fatigue Safety Notice

> **Important Disclosure**:  
> FairWork AI does **NOT** claim to detect fatigue biologically or medically. The fatigue alert engine strictly evaluates **labor policy and statutory shift duration thresholds** (consecutive shift hours >10h, weekly hours >50h, rest interval <10h) based on logged shift timestamps to support humane labor management and safety intervention.

---

## 📄 License
MIT License. Created for the Manual Workforce Management Hackathon Challenge.
