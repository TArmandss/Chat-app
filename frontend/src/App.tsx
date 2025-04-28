import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import NavbarHomePage from './components/Navbar/NavbarHomePage';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ProfilePage from './pages/ProfilePage';
function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log(onlineUsers);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); //on each re-render (refresh) this function gets re-registered

  if (isCheckingAuth && !authUser) {
    return (
      <div className="bg-black w-full h-full flex justify-center items-center">
        <Box sx={{ display: 'flex' }}>
          <CircularProgress size={100} sx={{ color: '#3A59D1' }} />
        </Box>
      </div>
    );
  }

  return (
    <div className="bg-black w-full h-full flex flex-col ">
      {' '}
      {!authUser ? <Navbar /> : <NavbarHomePage />}
      <div className="flex-grow min-h-0 w-full">
        {' '}
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <LogInPage />} />
          <Route
            path="/sign-up"
            element={authUser ? <HomePage /> : <SignUpPage />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <SignUpPage />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
