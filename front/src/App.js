import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login/index';
import Register from './components/register/index';
import Mypage from './components/myPage/index';
import Map from './components/map';
import Community from './components/community';
import Inquiry from './components/inquiry/index';
import Reservation from './components/resevation/index';

import Header from './components/Header';
import Navibar from './components/Navibar';
import Footer from './components/Footer';
function App() {
  return (
    <BrowserRouter>
      <div className="z-0 flex flex-col justify-between items-center">
        <nav className="z-10 header w-full backdrop-blur-sm">
          <Header />
          <Navibar />
        </nav>

        <div className="w-[80%] flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/reservstion" element={<Reservation />} />
          </Routes>
        </div>
        <div className="footer w-full mt-5">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
