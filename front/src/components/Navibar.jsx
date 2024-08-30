import React from 'react';
import { Link } from 'react-router-dom';
import PetLogo from '../assets/logoimage/파트라슈.png';
const Navibar = () => {
  return (
    <div className="z-10 h-auto flex items-center justify-between px-10 ">
      <div className="logoAndHome flex items-center ">
          <Link to="/" className="font-Kr flex justify-center items-center text-cyan-700 ">
          <img src={PetLogo} alt="" className=" w-[20%] h-[20%]" />
          <span className='text-base lg:text-lg font-bold'>해피펫</span>
          </Link>
       
      </div>

      <div className="naviMenu w-1/3 flex items-center  felx-glow gap-x-20 text-base lg:text-lg font-bold">
        <span className=" font-Kr   text-green-600 hover:text-green-800 ">
          <Link to="/map">병원찾기</Link>
        </span>
        <span className="font-Kr  text-green-600 hover:text-green-800  ">
          <Link to="/community">커뮤니티</Link>
        </span>
        <span className="font-En   text-green-600 hover:text-green-800  ">
          <Link to="/shop">SHOP</Link>
        </span>
      </div>
    </div>
  );
};

export default Navibar;
