import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 실제 로그인 로직을 추가
    onLogin();
    navigate('/');
  };

  return (
    <div className="font-Kr">
      <h2 className="w-full flex justify-center px-2 text-4xl font-semibold">
        로그인
      </h2>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="w-full box-border border-2 md:box-content rounded-md border-gray-500 bg-slate-white flex justify-center px-2 py-2 text-xl">
          <label htmlFor="userid"></label>
          <input
            type="id"
            placeholder="아이디를 입력해주세요."
            name="id"
            className="form-control w-full text-center focus:inline focus:outline-blue-500"
          />
        </div>
        <br />
        <div className="w-full box-border border-2 md:box-content rounded-md border-gray-500 bg-slate-white flex justify-center px-2 py-2 text-xl">
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            className="form-control w-full text-center focus:inline focus:outline-blue-500"
          />
        </div>
        <br />
        <button
          type="submit"
          className="btn cursor-pointer box-border border-2 md:box-content rounded-md border-solid border-[#b7c8a6] bg-[#acbd9b] hover:border-[#f1f3ea] hover:bg-[#f1f3ea] w-full flex justify-center px-2 py-2 text-xl"
        >
          로그인
        </button>
      </form>
      <br />
      <div className="w-full h-4/5 flex justify-center px-2 py-2 text-xl hover:text-[#7d7068]">
        <Link to="/register">Create Account</Link>
      </div>
    </div>
  );
};

export default Login;
