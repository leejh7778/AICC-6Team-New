import React from 'react';
import { Link } from 'react-router-dom';
import PetLogo from '../assets/logoimage/PetLogo_t.png';
const Navibar = () => {
  return (
    <div className="z-10 h-auto flex items-center justify-between px-10 ">
      <div className="logoAndHome flex items-center ">
        <div className="logo">
          <img src={PetLogo} alt="" className="w-20 h-20" />
        </div>
        <h2 className="font-semibold text-xl">
          <Link to="/" className="font-Kr text-cyan-700 ">
            파트라슈
          </Link>
        </h2>
      </div>

      <div className="naviMenu flex px-10  ">
        <span className="font-Kr font-bold text-green-600 hover:text-green-800 ">
          <Link to="/map">병원찾기</Link>
        </span>
        <span className="font-Kr font-bold text-green-600 hover:text-green-800  ">
          <Link to="/community">커뮤니티</Link>
        </span>
      </div>
    </div>
  );
};

export default Navibar;
