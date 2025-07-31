# HopeLink – Volunteer Opportunity Platform

HopeLink is a web platform that connects volunteers with charitable opportunities posted by organizations. Built using **React**, **Firebase Realtime Database**, and **Firebase Auth**, this project allows users to browse, apply, and manage volunteer opportunities in real time.

---

## 🔧 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend/Database**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **Icons**: Font Awesome

---

## 🚀 Features

### 🔒 Authentication
- Secure login with Firebase Authentication.
- Each user has a profile stored under `users/{uid}`.

### 📢 Opportunities Listing
- All opportunities are stored globally under `opportunities`.
- Each opportunity includes title, location, time frame, applicant limit, and status.

### 📬 Volunteer Application System
- Users can apply for opportunities if they're open.
- Once the `appliedCount` reaches the `applicants` limit, the opportunity is marked as "closed".
- Each application is stored under:
  - `applications_flat/{opportunityId}/{userId}`
  - `users/{userId}/volunteers/{opportunityId}`

### 📊 Real-Time Updates
- Opportunities and applications update in real time using Firebase listeners.
- Volunteer count is updated atomically using Firebase transactions.

### ✅ Popup Feedback
- Informative popups provide immediate feedback on user actions (e.g., apply success, already applied, opportunity full, etc.)

---

## 🛠️ Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/hopelink.git
   cd hopelink

2. **install dependencies**
   ```bash
   npm install

3️. **Configure Firebase**

1. Go to [Firebase Console](https://console.firebase.google.com) and create a new project.  
2. Enable **Firebase Authentication** (e.g., Email/Password).  
3. In **Realtime Database**, create a database and set your security rules.  
4. Copy your Firebase config object and replace the placeholder in `src/firebase.js`:

   ```js
   // src/firebase.js
   import { initializeApp } from "firebase/app";
   
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     databaseURL: "YOUR_DATABASE_URL",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   
   initializeApp(firebaseConfig);


4. **run the app**
   ```bash
   npm run start
   


