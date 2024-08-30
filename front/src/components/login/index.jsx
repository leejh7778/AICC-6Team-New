import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid, password }),
      });

      const data = await response.json();

      if (data.success) {
        onLogin(); // 로그인 상태 변경
        navigate('/'); // 홈으로 이동
      } else {
        setErrorMessage(data.message); // 오류 메시지 설정
      }
    } catch (error) {
      setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="font-Kr">
      <h2 className="w-full  flex justify-center  px-2  text-4xl font-semibold ">
        로그인
      </h2>
      <br />
      <br />
      {errorMessage && (
        <div className="text-red-500 text-center mb-4">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="w-full box-border border-2 md:box-content rounded-md border-gray-500 bg-slate-white flex justify-center px-2 py-2 text-xl">
          <label htmlFor="userid"></label>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            name="userid"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            className="form-control w-full text-center focus:inline focus:outline-blue-500"
          />
        </div>
        <br />
        <div className="w-full box-border border-2 md:box-content rounded-md border-gray-500 bg-slate-white flex justify-center px-2 py-2 text-xl">
          <label htmlFor="password"></label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
