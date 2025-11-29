# 💼 **MatchHire – Full Stack Job Portal & Recruitment Platform**

MatchHire is a comprehensive job portal application that connects job seekers with employers. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it features job posting, application tracking, company management, and an intuitive admin dashboard.

**🚀 Live Demo**: [https://matchhire-job-hunting-recruitment.onrender.com/](https://matchhire-job-hunting-recruitment.onrender.com/)
---

## ✨ **Features**

### 👤 **For Job Seekers**

* Browse and search job listings
* Filter jobs by location, salary, and job type
* Apply to jobs with resume upload
* Track application status
* Update profile and resume
* View application history

### 🏢 **For Employers/Admins**

* Post and manage job listings
* Company profile management
* View and filter applicants
* Update application status
* Track recruitment metrics
* Manage multiple job postings

### 🔐 **Authentication & Security**

* Secure user registration and login
* JWT-based authentication
* Role-based access control (User/Admin)
* Protected routes for authorized users
* Password encryption with bcrypt

### 🎨 **UI/UX**

* Modern, responsive design with Tailwind CSS
* ShadCN UI components
* Smooth animations with Framer Motion
* Mobile-friendly interface
* Intuitive navigation

---

## 🛠️ **Tech Stack**

### **Frontend**

* **React.js** (with Vite)
* **Redux Toolkit** (State Management)
* **React Router** (Navigation)
* **Tailwind CSS** (Styling)
* **ShadCN UI** (Component Library)
* **Framer Motion** (Animations)
* **Axios** (API Calls)

### **Backend**

* **Node.js**
* **Express.js**
* **MongoDB** (Database)
* **Mongoose** (ODM)
* **JWT** (Authentication)
* **Bcrypt** (Password Hashing)
* **Multer** (File Upload)
* **Cloudinary** (Image Storage)

### **Deployment**

* **Render** (Hosting)

---

## 📂 **Project Structure**

```
MatchHire/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ **Setup Instructions**

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/matchhire.git
cd matchhire
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

Start the frontend development server:

```bash
npm run dev
```

---

## 🚀 **Deployment**

The application is deployed on Render. To deploy your own instance:

1. Create a Render account
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy backend and frontend separately
5. Update API URLs in frontend

For detailed deployment instructions, watch: [How to Deploy MERN Stack Projects](https://www.youtube.com/watch?v=deployment-video-id)

---


## 🎯 **Key Features Implemented**

- ✅ User authentication and authorization
- ✅ Job posting and management
- ✅ Company profile creation
- ✅ Resume/CV upload with Multer
- ✅ Application tracking system
- ✅ Advanced job search and filtering
- ✅ Admin dashboard
- ✅ Applicant status management
- ✅ State persistence with Redux
- ✅ Protected routes
- ✅ Responsive design
- ✅ Smooth animations


---

## 🤝 **Contributing**

Contributions are welcome! Feel free to:

* ⭐ Star the repository
* 🐛 Report bugs by opening an issue
* 🚀 Submit pull requests for improvements
* 💡 Suggest new features

---

## 📝 **Learning Outcomes**

By building this project, you'll learn:

* Full-stack MERN development
* RESTful API design
* Authentication & authorization
* File upload handling
* State management with Redux Toolkit
* Modern React patterns and hooks
* Database modeling with MongoDB
* Deployment strategies

---

## 📜 **License**

MIT License

---

**Built with 💙 by [Your Name](https://github.com/yourusername)**

*If this project helped you, consider giving it a ⭐!*
