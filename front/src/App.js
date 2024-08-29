import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
import RevApp from './components/reservation/RevApp';
import Header from './components/Header';
import Navibar from './components/Navibar';
import Footer from './components/Footer';
import InBoard from './components/community/InBoard';

import ReservationModal from './components/reservation/ReservationModal';
import ReservationForm from './components/reservation/ReservationForm';

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
            <Route path="/community/:idx" element={<InBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />

            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/postDetail" component={PostDetail} />
            <Route path="/postForm" component={PostForm} />
            <Route path="/edit/:id" component={PostForm} />

            <Route path="/register" element={<Register />} />

            <Route path="/reservation" element={<Reservation />} />

            <Route path="/ReservationModal" element={ReservationModal} />
            <Route path="/ReservationForm" element={ReservationForm} />
          </Routes>
        </div>
        <div className="footer w-full mt-0">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
