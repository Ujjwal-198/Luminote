import './App.css'
import Layout from './Components/Layout.jsx';
import RedirectHandler from './Components/RedirectHandler.jsx';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { handleGetUser } from './features/userSlice.js';
import ProtectedRoutes from './Components/ProtectedRoutes.jsx';
import { Home, Explore, Upload, Signup, Login, Dashboard, Profile, Unauthorized, UploadDetails, Register, UserUploads, AllUploads, About } from './Pages/index.js';
import { Notes, Assignment, Ebook, Essays, LabManual, Lecture, Misc, Practice, Practical, QuestionPaper, Slides, StudyGuide, Syllabus, Tutorial } from './Pages/Explore-subPages/index.js';
function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const { authenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(handleGetUser());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  console.log(user);


  return (
    <RedirectHandler>
      <div style={{ width: '100%', minHeight: '100vh', fontSize: '16px' }}>
        <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/allUploads" element={<AllUploads />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<h1>Contact</h1>} />

        <Route path="/explore/notes" element={<Notes />} />
        <Route path="/explore/assignment" element={<Assignment />} />
        <Route path="/explore/ebook" element={<Ebook />} />
        <Route path="/explore/essays" element={<Essays />} />
        <Route path="/explore/labmanual" element={<LabManual />} />
        <Route path="/explore/lecture" element={<Lecture />} />
        <Route path="/explore/misc" element={<Misc />} />
        <Route path="/explore/practice" element={<Practice />} />
        <Route path="/explore/practical" element={<Practical />} />
        <Route path="/explore/questionpaper" element={<QuestionPaper />} />
        <Route path="/explore/slides" element={<Slides />} />
        <Route path="/explore/studyguide" element={<StudyGuide />} />
        <Route path="/explore/syllabus" element={<Syllabus />} />
        <Route path="/explore/tutorial" element={<Tutorial />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard/userUploads" element={<UserUploads />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/uploadDetails" element={<UploadDetails />} />
        </Route>
        <Route path="/index.html" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Route>
        </Routes>
      </div>
    </RedirectHandler>
  )
}

export default App
