# 📊 Interactive Traffic Dashboard

A fullstack web application built with **React**, **Firebase Firestore**, **Firebase Authentication**, and a custom **Node.js (Express) backend** deployed on **Render**. The dashboard visualizes and manages traffic data in both table and chart formats, with support for filtering, sorting, and secure backend integration.

---

## 🚀 Features

- 🔐 **Authentication** (Email/Password or Google Sign-In via Firebase)
- 📈 **Chart View** with daily/weekly/monthly toggle
- 📋 **Sortable and Filterable Table** of traffic stats
- ➕ **Add, Edit, and Delete** traffic entries (only for “editor” users)
- ⚙️ **Role-Based Access** (viewers can only read)
- ☁️ **Secure Express.js Backend** (no direct Firestore access from frontend)
- 🌐 Frontend deployed on **Vercel**, backend on **Render**

---

## 🌍 Live Demo

Frontend (Vercel):  
🔗 [https://interactive-dashboard-firebase.vercel.app](https://interactive-dashboard-firebase.vercel.app)

Backend (Render):  
🔗 https://interactive-dashboard-firebase.onrender.com/api

---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

- **Node.js** v18 or higher

### 📦 Setup

Clone the repository:

```bash
git clone https://github.com/arielzamir/interactive-dashboard-firebase.git
cd interactive-dashboard-firebase
```

### 🔧 Environment Variables

Frontend (.env)

VITE_API_BASE_URL=http://localhost:8080/api

### ▶️ Run Locally

Frontend

cd frontend
npm install
npm run dev

Backend (Express + Firestore)

cd backend
npm install
npm run build
npm start

### 🧠 Tech Stack

Frontend

- React

- TypeScript

- Vite

- Recharts

- React-Table

- React-Hook-Form

- Date-FNS

- Zod

- MUI (Material-UI)

Backend

- Express.js (Node.js)

- Firebase Admin SDK

- Deployed on Render

Database

- Firebase Firestore

Auth

- Firebase Authentication (Email/Password or Google)

### 📦 Example Data Format

{
"date": "2025-04-01",
"visits": 120
}

### 📝 Seed Firestore with Sample Data

Run the following script to populate Firestore with sample traffic data:

npx ts-node scripts/uploadTrafficStats.ts

### 🙋‍♂️ Author

Ariel Zamir
📧 arielzamir100@gmail.com
🔗 GitHub: arielzamir
