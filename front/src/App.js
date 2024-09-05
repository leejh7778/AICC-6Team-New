import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login/index';
import Register from './components/register/index';
import Mypage from './components/myPage/index';
import Map from './components/map';
import Community from './components/community';
import Inquiry from './components/inquiry/index';
import Reservation from './components/reservation/index';
import Header from './components/Header';
import Navibar from './components/Navibar';
import Footer from './components/Footer';
import InBoard from './components/community/InBoard';
import About from './components/about';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 로그인 상태를 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태 유지
    }
  }, []); // 빈 배열을 전달하면 컴포넌트가 처음 렌더링될 때 한 번만 실행

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="z-0 flex flex-col justify-between items-center min-h-screen min-w-[970px]">
      <nav className="z-10 header w-full backdrop-blur-sm">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Navibar />
      </nav>

      <div className="w-[80%] flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:idx" element={<InBoard />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/mypage" element={<Mypage onLogout={handleLogout} />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reservation" element={<Reservation />} />

          <Route path="/About" element={<About />} />
        </Routes>
      </div>
      <footer className="footer translate-y-[-100%] h-5 w-full mt-2 relative-">
        <Footer />
      </footer>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
