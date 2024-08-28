import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <div style={{ height: 100 }}>
      <header />

      <br />
      <br />
      <br />
      <br />
      <h2 className="w-full h-4/5 flex justify-center px-2 py-2 text-4xl font-semibold ">
        로그인
      </h2>
      <br />
      <br />
      <div className="w-full  box-border border-2 md:box-content rounded-md border-gray-500  bg-slate-white flex justify-center px-2 py-2 text-xl">
        <label htmlFor="email"></label>
        <input
          type="email"
          placeholder="아이디를 입력해주세요."
          name="email"
          className="form-control"
        />
      </div>
      <br />
      <div className="w-full  box-border border-2 md:box-content rounded-md border-gray-500  bg-slate-white flex justify-center px-2 py-2 text-xl">
        <label htmlFor="password"></label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          className="form-control "
        />
      </div>
      <br />
      <br />
      <button
        type="surmit"
        className="btn  cursor-pointer box-border border-2 md:box-content rounded-md border-solid border-gray-400 bg-[#A6948A]   hover:bg-[#D9D1CC]  w-full  flex justify-center px-2 py-2 text-xl "
      >
        <Link to="/">로그인</Link>
      </button>
      <br />
      <div className="w-full h-4/5 flex justify-center px-2 py-2 text-xl">
        <Link to="/register">Create Account</Link>
      </div>
      <div>{}</div>
    </div>
  );
};

export default index;
