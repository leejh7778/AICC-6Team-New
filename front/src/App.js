import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './components/home';
import Login from './components/login/index';
import Register from './components/register/index';
import Mypage from './components/myPage/index';
import Map from './components/map';
import Community from './components/community';
import Inquiry from './components/inquiry';
import PostDetail from './components/inquiry/postDetail';
import PostForm from './components/inquiry/postForm';
import Reservation from './components/reservation/index';
import Header from './components/Header';
import Navibar from './components/Navibar';
import Footer from './components/Footer';
import InBoard from './components/community/InBoard';

import ReservationModal from './components/reservation/ReservationModal';
import ReservationForm from './components/reservation/ReservationForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="z-0 flex flex-col justify-between items-center min-h-screen">
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
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/postDetail" element={<PostDetail />} />
            <Route path="/postForm" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/ReservationModal" element={<ReservationModal />} />
            <Route path="/ReservationForm" element={<ReservationForm />} />
          </Routes>
        </div>
        <div className="footer w-full mt-0 position:">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
