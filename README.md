# 🗳️ Voter Mitra – AI Powered Smart Voting System

## 📌 Overview

Voter Mitra is an AI-powered digital voting platform designed to improve election transparency, security, accessibility, and voter engagement.

The system combines:

* Facial Recognition Authentication
* Liveness Detection
* Secure Voting
* Complaint Management
* AI Election Assistant
* Election News Analysis
* Interactive Election Map
* Real-Time Election Information

The project aims to reduce voter fraud, increase transparency, and provide citizens with reliable election-related information.

---

# 🚀 Features

## 👤 Biometric Voter Authentication

* Face registration using FaceAPI
* Facial embedding generation
* Duplicate voter prevention
* Secure voter verification

### Liveness Detection

To prevent spoofing attacks:

* Head Left Detection
* Head Right Detection
* Multi-step random verification
* Real-time face landmark tracking

---

## 🗳️ Secure Voting System

After successful verification:

1. Face matched against database
2. JWT Token generated
3. Voter redirected to voting booth
4. Vote recorded securely
5. Multiple voting prevented

---

## 🤖 Voter Mitra AI Chatbot

Powered by:

* Ollama
* Llama 3.2

Capabilities:

* Voter registration guidance
* EPIC card information
* Polling booth assistance
* Electoral roll search help
* Election Commission information
* EVM & NOTA explanation

The chatbot only answers election-related questions.

---

## 📰 Election News Hub

Features:

* Live election news
* AI-generated news explanations
* Real-time news updates
* News summarization
* Easy-to-understand election coverage

---

## 📢 Complaint Management System

Anonymous complaint submission:

* Booth-related complaints
* Election malpractice reporting
* Location tagging
* Secure complaint storage

---

## 🗺️ Interactive Election Map

Built using:

* React Leaflet
* GeoJSON
* OpenStreetMap

Features:

* State-wise political party visualization
* Chief Minister information
* Interactive popups
* Election analytics dashboard

---

# 🏗️ System Architecture

## High Level Architecture

```text
 ┌─────────────────────┐
 │     React Frontend  │
 └──────────┬──────────┘
            │
            ▼
 ┌─────────────────────┐
 │    Express Server   │
 └──────────┬──────────┘
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼

Face API  MongoDB    Ollama AI
           │           │
           ▼           ▼

 Voter DB   Complaints AI Chat
```

---

# 🔄 Voting Workflow

## Registration Phase

```text
User
  │
  ▼
Camera Capture
  │
  ▼
Face Detection
  │
  ▼
Face Embedding Creation
  │
  ▼
Duplicate Check
  │
  ▼
MongoDB Storage
```

---

## Verification Phase

```text
User
  │
  ▼
Face Scan
  │
  ▼
Liveness Detection
  │
  ▼
Face Embedding
  │
  ▼
Database Match
  │
  ▼
JWT Token
  │
  ▼
Voting Booth Access
```

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Tailwind CSS
* React Router
* Axios
* FaceAPI.js
* React Leaflet
* Lucide React

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Ollama API

---

## AI & ML

* Face Recognition
* Face Embeddings
* KNN Matching
* Liveness Detection
* Llama 3.2
* Ollama

---

# 📂 Project Structure

```text
Voter-Mitra/
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Assets/
│   │   ├── Data/
│   │   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── README.md
└── package.json
```

---

# 🔐 Security Features

## Authentication

* JWT Token Generation
* Protected Voting Routes
* Session Validation

## Face Security

* Facial Embeddings
* Duplicate Prevention
* Liveness Detection

## Database Security

* Secure MongoDB Storage
* Validation Middleware
* Input Sanitization

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/voter-mitra.git
```

```bash
cd voter-mitra
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=8000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret_key

OLLAMA_URL=http://localhost:11434

OLLAMA_MODEL=llama3.2
```

Run backend

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Run frontend

```bash
npm run dev
```

---

# 📸 Major Modules

## Face Registration

Stores:

* User Name
* Voter ID
* Face Embedding

---

## Face Verification

Verifies:

* Registered voter
* Live person
* Voting eligibility

---

## Election News

Provides:

* Latest election updates
* AI explanations
* Live summaries

---

## Complaint Portal

Allows:

* Anonymous reporting
* Booth issue reporting
* Transparency enhancement

---

## AI Assistant

Provides:

* Election guidance
* Voting help
* Registration support

---

# 🎯 Future Enhancements

* Aadhaar Integration
* Blockchain Voting Ledger
* Multi-language Support
* Voice Assistant
* Election Analytics Dashboard
* Mobile Application
* Real-Time Result Monitoring
* Cloud Deployment

---

# 👨‍💻 Authors

### Satyam Shivhare

B.Tech (2023–2027)

IMS Engineering College, Ghaziabad

Passionate about:

* Artificial Intelligence
* Data Science
* Full Stack Development
* Election Technology

---

# 📜 License

This project is developed for educational, research, and innovation purposes.

© 2026 Voter Mitra. All Rights Reserved.
