# Luminote - Academic Document Sharing Platform

A modern web application for students to share and access academic resources including notes, assignments, e-books, and study materials.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT
- **Document Upload**: Upload various file types with metadata
- **Document Management**: View, download, and manage uploaded documents
- **Search & Filter**: Advanced filtering by branch, semester, and subject
- **Responsive Design**: Mobile-first design with modern UI
- **Cloud Storage**: Integrated with MEGA cloud storage
- **Real-time Updates**: Live document counts and user statistics

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Icons** for UI icons
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **MEGA** cloud storage integration
- **Multer** for file uploads
- **bcrypt** for password hashing

## 📁 Project Structure

```
ScholarSync/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── Components/ # Reusable UI components
│   │   ├── Pages/      # Application pages
│   │   ├── features/   # Redux slices
│   │   └── assets/     # Static assets
│   └── package.json
├── backend/            # Node.js backend API
│   ├── controllers/    # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── services/       # External services
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- MEGA account for cloud storage

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ujjwal-198/ScholarSync.git
   cd ScholarSync
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   
   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:8080
   VITE_DOCUMENTS_PER_PAGE=9
   VITE_MAX_FILE_SIZE_MB=50
   VITE_APP_NAME=Luminote
   VITE_DEVELOPER_NAME=Your Name
   VITE_DEVELOPER_EMAIL=your.email@example.com
   VITE_GITHUB_URL=https://github.com/yourusername
   VITE_LINKEDIN_URL=https://linkedin.com/in/yourprofile
   ```
   
   **Backend (.env)**
   ```env
   PORT=8080
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   MEGA_EMAIL=your-mega-email
   MEGA_PASSWORD=your-mega-password
   JWT_EXPIRES_IN=1h
   COOKIE_MAX_AGE=3600000
   FILE_SIZE_LIMIT=52428800
   BODY_LIMIT=50mb
   ```

4. **Start the application**
   ```bash
   # From root directory - starts both frontend and backend
   npm run dev
   
   # Or start individually:
   # Backend (from backend directory)
   npm run dev
   
   # Frontend (from frontend directory)
   npm run dev
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout

### File Management
- `POST /api/files/upload` - Upload document
- `GET /api/files/all` - Get all documents
- `GET /api/files/user/:userId` - Get user documents
- `DELETE /api/files/:id` - Delete document
- `GET /api/files/download/:id` - Download document

## 🎨 Design System

- **Colors**: Zinc backgrounds with orange accents
- **Typography**: Modern, readable fonts with proper hierarchy
- **Components**: Consistent, reusable UI components
- **Responsive**: Mobile-first approach with breakpoints

## 🔧 Configuration

The application uses environment variables for configuration:
- Database connections
- API endpoints
- File upload limits
- Authentication settings
- Cloud storage credentials

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Backend (Railway/Heroku)
1. Set production environment variables
2. Deploy from the `backend` directory
3. Ensure MongoDB connection is configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

**Ujjwal Singh**
- Email: kumarujjwalsingh76@gmail.com
- GitHub: [@Ujjwal-198](https://github.com/Ujjwal-198)
- LinkedIn: [Ujjwal Singh](https://www.linkedin.com/in/ujjwal-singh-b44256271)

## 🙏 Acknowledgments

- React and Node.js communities
- MongoDB for database solutions
- MEGA for cloud storage
- Tailwind CSS for styling framework