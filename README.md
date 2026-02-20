# 💼 MatchHire — Full Stack Job Portal & Recruitment Platform

![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=flat&logo=express)
![React](https://img.shields.io/badge/React.js-Frontend-61DAFB?style=flat&logo=react)
![Node](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat&logo=node.js)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat&logo=redux)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens)
![Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=flat&logo=render)

> A comprehensive full-stack job portal connecting job seekers with employers — featuring dual dashboards, JWT authentication, role-based access control, and real-time application tracking. Built with the **MERN Stack**.

🚀 **Live Demo:** [matchhire-job-hunting-recruitment.onrender.com](https://matchhire-job-hunting-recruitment.onrender.com/)  
🐙 **GitHub:** [DishaDewangan/MatchHire](https://github.com/DishaDewangan/MatchHire----Job-Hunting-Recruitment-Platform)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Project Pipeline](#project-pipeline)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Deployment](#deployment)
- [Key Implementations](#key-implementations)

---

## 📖 Overview

**MatchHire** is a production-ready job hunting and recruitment platform built from scratch using the MERN stack. It provides two distinct dashboards — one for job seekers and one for employers/admins — with secure JWT-based authentication, resume upload via Multer, cloud image storage via Cloudinary, and smooth UI powered by ShadCN and Framer Motion.

---

## ✨ Features

### 👤 For Job Seekers
- Browse and search job listings with advanced filters (location, salary, job type)
- Apply to jobs with resume upload
- Track application status in real time
- Update profile and resume anytime
- View complete application history

### 🏢 For Employers / Admins
- Post and manage job listings
- Create and manage company profiles
- View, filter, and manage applicants
- Update application status (Accepted / Rejected / Pending)
- Track recruitment metrics across multiple postings

### 🔐 Authentication & Security
- Secure registration and login
- JWT-based authentication with middleware-protected routes
- Role-based access control (User / Admin)
- Password encryption with bcrypt

### 🎨 UI / UX
- Modern responsive design with Tailwind CSS
- ShadCN UI component library
- Smooth animations with Framer Motion
- Mobile-friendly interface

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js (Vite), Redux Toolkit, React Router, Tailwind CSS, ShadCN UI, Framer Motion, Axios |
| **Backend** | Node.js, Express.js, Mongoose, JWT, Bcrypt, Multer |
| **Database** | MongoDB |
| **Storage** | Cloudinary (images & resumes) |
| **Deployment** | Render |

---

## 📂 Project Structure

```
MatchHire/
│
├── backend/
│   ├── controllers/       # Route logic
│   ├── middleware/        # Auth & role guards
│   ├── models/            # Mongoose schemas (User, Company, Job, Application)
│   ├── routes/            # API route definitions
│   ├── utils/             # Helper functions
│   └── index.js           # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── redux/         # Redux store & slices
│   │   ├── pages/         # Route-level page components
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🔄 Project Pipeline

```
User visits MatchHire
       ↓
Register / Login (JWT issued)
       ↓
Role Detection (Job Seeker / Admin)
       ↓
     ┌──────────────────────────────────┐
     │ Job Seeker        │    Admin     │
     │ Browse Jobs       │  Post Jobs   │
     │ Apply + Upload CV │  View Apps   │
     │ Track Status      │  Manage Co.  │
     └──────────────────────────────────┘
       ↓
Redux State persisted across 10+ pages
       ↓
MongoDB ← REST API (15+ endpoints) → React UI
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/register` | Register new user |
| POST | `/api/v1/user/login` | Login & get JWT |
| GET | `/api/v1/job/get` | Get all jobs |
| POST | `/api/v1/job/post` | Post a new job (Admin) |
| POST | `/api/v1/application/apply/:id` | Apply to a job |
| GET | `/api/v1/application/get` | Get user applications |
| POST | `/api/v1/company/register` | Register a company |
| GET | `/api/v1/company/get` | Get companies |

> 15+ REST API endpoints total across User, Job, Company, and Application routes.

---

## ⚙️ Setup & Installation

**1. Clone the repository**
```bash
git clone https://github.com/DishaDewangan/MatchHire----Job-Hunting-Recruitment-Platform.git
cd MatchHire----Job-Hunting-Recruitment-Platform
```

**2. Backend Setup**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Start the backend:
```bash
npm run dev
```

**3. Frontend Setup**
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

Start the frontend:
```bash
npm run dev
```

---

## 🚀 Deployment

The application is deployed on **Render** (both frontend and backend).

To deploy your own instance:
1. Create a [Render](https://render.com) account
2. Connect your GitHub repository
3. Configure environment variables in the Render dashboard
4. Deploy backend and frontend as separate services
5. Update `VITE_API_URL` in frontend `.env` to point to your live backend URL

---

## ✅ Key Implementations

| Feature | Status |
|---------|--------|
| User authentication & authorization | ✅ |
| JWT + role-based access control | ✅ |
| Job posting & management | ✅ |
| Company profile creation | ✅ |
| Resume/CV upload with Multer | ✅ |
| Application tracking system | ✅ |
| Advanced job search & filtering | ✅ |
| Admin dashboard | ✅ |
| Applicant status management | ✅ |
| Redux state persistence (10+ pages) | ✅ |
| Protected routes | ✅ |
| Responsive design | ✅ |
| Smooth animations (Framer Motion) | ✅ |

---

## 👩‍💻 Author

**Disha Dewangan**  
[![GitHub](https://img.shields.io/badge/GitHub-DishaDewangan-black?style=flat&logo=github)](https://github.com/DishaDewangan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Disha%20Dewangan-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/disha-dewangan-9a0071291/)
[![LeetCode](https://img.shields.io/badge/LeetCode-DishaDewangan-orange?style=flat&logo=leetcode)](https://leetcode.com/DishaDewangan/)

---

If this project helped you, consider giving it a ⭐!
