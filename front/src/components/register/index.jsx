import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [values, setValues] = useState({
    userid: '',
    password: '',
    confirmPassword: '', // 비밀번호 확인 필드 추가
    username: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !values.userid ||
      !values.password ||
      !values.confirmPassword || // 비밀번호 확인 필드 체크
      !values.username ||
      !values.email
    ) {
      alert('입력값을 확인해주세요.');
      return;
    }

    if (values.password !== values.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    axios
      .post('http://localhost:8080/register', {
        userid: values.userid,
        password: values.password,
        username: values.username,
        email: values.email,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate('/login');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.log(error);

        // 서버로부터 받은 에러 메시지를 확인하여 처리
        if (error.response && error.response.status === 409) {
          const errorMessage = error.response.data.message;
          if (errorMessage === '이미 존재하는 아이디입니다.') {
            alert('이미 존재하는 아이디입니다.');
          } else if (errorMessage === '이미 존재하는 이메일입니다.') {
            alert('이미 존재하는 이메일입니다.');
          }
        } else {
          alert('회원가입에 실패했습니다.');
        }
      });
  };

  return (
    <div className="w-2/4 flex justify-center items-centers">
      <div>
        <br />
        <h2 className="font-Kr flex justify-center px-2 text-4xl font-semibold">
          회원가입
        </h2>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="w-[500px] bg-gray-200 border-gray-500 bg-slate-white py-3 text-xl mb-3">
            <label htmlFor="userid"></label>
            <input
              type="userid"
              placeholder="아이디를 입력해 주세요"
              name="userid"
              className="form-control w-full text-center focus:outline focus:outline-blue-500 bg-gray-200"
              onChange={(e) => setValues({ ...values, userid: e.target.value })}
            />
          </div>

          <div className="w-[500px] bg-gray-200 border-gray-500 bg-slate-white py-3 text-xl mb-3">
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              name="password"
              className="form-control w-full text-center focus:outline focus:outline-blue-500 bg-gray-200"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>

          <div className="w-[500px] bg-gray-200 border-gray-500 bg-slate-white py-3 text-xl mb-3">
            <label htmlFor="confirmPassword"></label>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요"
              name="confirmPassword"
              className="form-control w-full text-center focus:outline focus:outline-blue-500 bg-gray-200"
              onChange={(e) =>
                setValues({ ...values, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="w-[500px] bg-gray-200 border-gray-500 bg-slate-white px-1 py-3 text-xl mb-3">
            <label htmlFor="username"></label>
            <input
              type="text"
              placeholder="이름을 입력해 주세요"
              name="username"
              className="form-control w-full text-center focus:outline focus:outline-blue-500 bg-gray-200"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>

          <div className="w-[500px] bg-gray-200 border-gray-500 bg-slate-white px-1 py-3 text-xl mb-6">
            <label htmlFor="email"></label>
            <input
              type="email"
              placeholder="이메일을 입력해 주세요"
              name="email"
              className="box-border form-control w-full text-center focus:outline focus:outline-blue-500 bg-gray-200"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn cursor-pointer md:box-content border-solid border-[#b7c8a6] bg-[#acbd9b] hover:border-[#f1f3ea] hover:bg-[#f1f3ea] w-full flex justify-center py-2 text-xl"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
