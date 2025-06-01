# 📊 Interactive Traffic Dashboard

A fullstack web application built with **React**, **Firebase Firestore**, **Firebase Cloud Functions**, and **Firebase Authentication**. The dashboard visualizes and manages traffic data in both table and chart formats, with support for filtering, sorting, and secure backend integration.

---

## 🚀 Features

- 🔐 **Authentication** (Email/Password or Google Sign-In)
- 📈 **Chart View** with daily/weekly/monthly toggle
- 📋 **Sortable and Filterable Table** of traffic stats
- ➕ **Add, Edit, and Delete** traffic entries (only for “editor” users)
- ⚙️ **Role-Based Access** (viewers can only read)
- ☁️ **Firebase Cloud Functions** as a secure backend API
- 🔒 No direct Firestore access from the frontend
- 🌐 Deployed on Firebase Hosting (optional)

---

## 🌍 Live Demo

🔗 [https://interactive-dashboard-firebase.vercel.app](https://interactive-dashboard-firebase.vercel.app)

## 🧑‍💻 Getting Started

### ✅ Prerequisites

- **Node.js** v18 or higher
- **Firebase CLI** installed globally

```bash
npm install -g firebase-tools
```

🔐 Firebase Setup
Create a new project in the Firebase Console.

Enable Firestore, Functions, and Email/Password or Google Authentication in your Firebase project.

In both your frontend and backend, set the following configuration values:

Frontend (.env):

# For local development

VITE_API_BASE_URL=http://127.0.0.1:5001/interactive-dashboard-firebase/europe-west1/trafficStats/api

# For production (Vercel)

Set VITE_API_BASE_URL in your Vercel dashboard to:
https://europe-west1-fir-project-d9b5e.cloudfunctions.net/trafficStats/api

Backend (Cloud Functions):
Ensure that your functions/src/index.ts (or equivalent) correctly initializes with the same project ID and region.

⚙️ Run Locally

Frontend
Navigate into the frontend folder:
cd frontend
Install dependencies:
npm install
Start the development server:
npm run dev

Backend (Cloud Functions)
Navigate into the functions folder:
cd functions
Install dependencies:
npm install
Build the TypeScript source:
npm run build
Start the Firebase emulator (Functions only):
firebase emulators:start --only functions

## 🧠 Tech Stack

Frontend:

React

TypeScript

Vite

Recharts (for charts)

React-Table (for tables)

React-Hook-Form (for forms)

Date-FNS (for date manipulation)

Zod (for schema validation)

MUI (Material-UI for styling)

Backend:

Firebase Cloud Functions (with Express)

Database:

Firebase Firestore

Authentication:

Firebase Authentication (Email/Password or Google Sign-In)

Hosting (Optional):

Firebase Hosting

📦 Example Data Format
All traffic entries should conform to the following JSON structure:

{
"date": "2025-04-01",
"visits": 120
}
📝 Script: Uploading Traffic Stats
To seed your Firestore database with example traffic data, run the following script:

npx ts-node scripts/uploadTrafficStats.ts
This will read a predefined list of { date, visits } objects and write them to your Firestore collection (trafficStats by default).

🙋‍♂️ Author
Ariel Zamir

Email: arielzamir100@gmail.com

GitHub: github.com/arielzamir

```

```
