import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className=" w-full h-[30px] bg-slate-0 flex items-baseline justify-between px-20 py-2  ">
      <div className="  hover:text-gray-600">
        <h2 className="font-semibold text-xl">
          <Link to="/"></Link>
        </h2>
      </div>

      <div className="menu flex px-4 font-Kr font-bold  ">
        <h2 className=" px-2  text-[#afafaf] hover:text-[#A6948A]">
          <Link to="/login">로그인 |</Link>
        </h2>
        <h2 className=" flex px-2   text-[#afafaf] hover:text-[#A6948A]">
          <Link to="/register">회원가입 | </Link>
        </h2>
        <h2 className="flex px-1  text-[#afafaf] hover:text-[#A6948A]">
          <Link to="/myPage">마이페이지 </Link>
        </h2>
      </div>
    </div>
  );
};

export default Header;
