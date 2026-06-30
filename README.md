# 💼 MatchHire — Full Stack Job Portal & Recruitment Platform

![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=flat&logo=express)
![React](https://img.shields.io/badge/React.js-Frontend-61DAFB?style=flat&logo=react)
![Node](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat&logo=node.js)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat&logo=redux)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens)
![Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=flat&logo=render)

> A full-stack job portal connecting job seekers with employers — featuring dual dashboards, JWT authentication, and real-time application tracking. Built with the **MERN Stack**.

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
- [Known Limitations](#known-limitations)

---

## 📖 Overview

**MatchHire** is a job hunting and recruitment platform built using the MERN stack. It provides two role-based experiences — **student** (job seeker) and **recruiter** (employer/admin) — with JWT-based authentication, resume/logo upload via Multer + Cloudinary, and a UI built with Radix/ShadCN-style components, Tailwind CSS, and Framer Motion.

---

## ✨ Features

### 👤 For Job Seekers (`student` role)
- Browse and search job listings with filters (location, salary, job type)
- Apply to jobs (resume comes from the user's saved profile, not a per-application upload)
- Track application status (Pending / Accepted / Rejected)
- Update profile, skills, and resume from the Profile page
- View complete application history

### 🏢 For Employers / Admins (`recruiter` role)
- Post and manage job listings
- Create and manage company profiles (with logo upload)
- View and manage applicants per job
- Update application status (Accepted / Rejected / Pending)

### 🔐 Authentication & Security
- Registration and login with email/password
- JWT issued on login, stored in an httpOnly cookie
- Passwords hashed with bcrypt
- Routes protected by an `isAuthenticated` middleware that verifies the JWT
- **Role gating (`student` vs `recruiter`) is enforced on the frontend only**, via a `ProtectedRoute` component that checks `user.role` before rendering admin pages — see [Known Limitations](#known-limitations)

### 🎨 UI / UX
- Responsive design with Tailwind CSS
- Radix UI primitives styled in a ShadCN-style component library (`src/components/ui`)
- Animations with Framer Motion
- Mobile-friendly layout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 (Vite), Redux Toolkit + redux-persist, React Router, Tailwind CSS, Radix UI / ShadCN-style components, Framer Motion, Axios |
| **Backend** | Node.js, Express 5, Mongoose, JWT (jsonwebtoken), bcryptjs, Multer |
| **Database** | MongoDB |
| **Storage** | Cloudinary (profile photos, company logos, resumes) |
| **Deployment** | Render (single service — Express serves the built React app) |

---

## 📂 Project Structure

```
MatchHire/
│
├── package.json            # Root deps + scripts (this is where "npm install" runs for the backend)
│
├── backend/
│   ├── controllers/        # Route logic (user, company, job, application)
│   ├── middlewares/        # isAuthenticated.js (JWT check only, no role guard), mutler.js (Multer upload)
│   ├── models/             # Mongoose schemas (User, Company, Job, Application)
│   ├── routes/             # API route definitions
│   ├── utils/              # db.js, cloudinary.js, datauri.js
│   └── index.js            # Server entry point (also serves frontend/dist in production)
│
├── frontend/
│   ├── package.json
│   ├── redux/               # Redux store & slices (NOT under src/)
│   │   ├── store.js
│   │   ├── authSlice.js
│   │   ├── jobSlice.js
│   │   ├── companySlice.js
│   │   └── applicationSlice.js
│   └── src/
│       ├── components/      # Page-level views live here too (no separate "pages/" folder)
│       │   ├── admin/        # Recruiter pages + ProtectedRoute.jsx
│       │   ├── auth/         # Login.jsx, Signup.jsx
│       │   └── ui/           # Reusable ShadCN-style UI primitives
│       ├── hooks/            # Custom data-fetching hooks
│       ├── utils/constant.js # Hardcoded API base URLs (see Setup notes)
│       └── App.jsx           # Route definitions
│
└── README.md
```

---

## 🔄 Project Pipeline

```
User visits MatchHire
       ↓
Register / Login (JWT issued, stored in httpOnly cookie)
       ↓
Role Detection (student / recruiter) — checked client-side after login
       ↓
     ┌──────────────────────────────────┐
     │ Student (Job Seeker) │  Recruiter (Admin)│
     │ Browse Jobs          │  Post Jobs         │
     │ Apply for jobs        │  View Applicants   │
     │ Track Status          │  Manage Companies  │
     └──────────────────────────────────┘
       ↓
Redux state persisted (redux-persist) across 14 frontend routes
       ↓
MongoDB ← REST API (16 endpoints) → React UI
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/register` | Register new user |
| POST | `/api/v1/user/login` | Login & receive JWT cookie |
| GET | `/api/v1/user/logout` | Clear auth cookie |
| POST | `/api/v1/user/profile/update` | Update profile (auth required) |
| GET | `/api/v1/job/get` | Get all jobs (supports `?keyword=`) |
| GET | `/api/v1/job/get/:id` | Get a single job |
| GET | `/api/v1/job/getadminjobs` | Get jobs created by the logged-in recruiter |
| POST | `/api/v1/job/post` | Post a new job (auth required) |
| GET | `/api/v1/application/apply/:id` | Apply to a job (auth required) — **GET, not POST** |
| GET | `/api/v1/application/get` | Get the logged-in user's applications |
| GET | `/api/v1/application/:id/applicants` | Get applicants for a job |
| POST | `/api/v1/application/status/:id/update` | Update an application's status |
| POST | `/api/v1/company/register` | Register a company |
| GET | `/api/v1/company/get` | Get companies owned by the logged-in user |
| GET | `/api/v1/company/get/:id` | Get a single company |
| PUT | `/api/v1/company/update/:id` | Update a company (incl. logo upload) |

> 16 REST API endpoints total across User, Job, Company, and Application routes. All routes except `register`/`login` require a valid JWT cookie (`isAuthenticated` middleware) — none of them additionally check `role` server-side.

---

## ⚙️ Setup & Installation

**1. Clone the repository**
```bash
git clone https://github.com/DishaDewangan/MatchHire----Job-Hunting-Recruitment-Platform.git
cd MatchHire----Job-Hunting-Recruitment-Platform
```

**2. Backend Setup**

> ⚠️ There is **no `backend/package.json`** — all backend dependencies and scripts live in the **root** `package.json`. Run `npm install` from the project root, not from inside `backend/`.

```bash
npm install
```

Create a `.env` file in the **`backend/`** directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Start the backend (from the project root):
```bash
npm run dev
```
This runs `nodemon backend/index.js`.

**3. Frontend Setup**
```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm run dev
```

---

## 🚀 Deployment

The application is deployed on **Render** as a **single service**: in production, Express (`backend/index.js`) serves the built React app from `frontend/dist` and handles all `/api/v1/*` routes itself — there's no separate frontend service or `VITE_API_URL` to configure at deploy time.

To deploy your own instance:
1. Create a [Render](https://render.com) account
2. Connect your GitHub repository
3. Set the build command to `npm run build` (root script — installs backend + frontend deps and builds the frontend) and the start command to `npm start`
4. Configure the backend environment variables (`MONGO_URI`, `SECRET_KEY`, Cloudinary keys, `PORT`) in the Render dashboard
5. Update the hardcoded CORS `origin` in `backend/index.js` and the API URLs in `frontend/src/utils/constant.js` to match your deployed domain before building

---

## ✅ Key Implementations

| Feature | Status |
|---------|--------|
| User authentication (JWT + bcrypt) | ✅ |
| Role-aware UI (student / recruiter) | ✅ |
| Job posting & management | ✅ |
| Company profile creation | ✅ |
| Resume/logo upload via Multer + Cloudinary | ✅ |
| Application tracking system | ✅ |
| Job search & keyword filtering | ✅ |
| Recruiter dashboard | ✅ |
| Applicant status management | ✅ |
| Redux state persistence (redux-persist) | ✅ |
| Frontend protected routes | ✅ |
| Responsive design | ✅ |
| Animations (Framer Motion) | ✅ |

---

## 👩‍💻 Author

**Disha Dewangan**
[![GitHub](https://img.shields.io/badge/GitHub-DishaDewangan-black?style=flat&logo=github)](https://github.com/DishaDewangan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Disha%20Dewangan-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/disha-dewangan-9a0071291/)
[![LeetCode](https://img.shields.io/badge/LeetCode-DishaDewangan-orange?style=flat&logo=leetcode)](https://leetcode.com/DishaDewangan/)

---

If this project helped you, consider giving it a ⭐!
