import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [values, setValues] = useState({
    userid: '',
    password: '',
    username: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !values.userid ||
      !values.password ||
      !values.username ||
      !values.email
    ) {
      alert('입력값을 확인해주세요.');
      return;
    }

    axios
      .post('http://localhost:8080/register', values)
      .then((res) => {
        if (res.status === 201) {
          navigate('/login');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('회원가입 중 오류가 발생했습니다.');
      });
  };

  return (
    <div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <h2 className="w-full h-4/5 flex justify-center px-2 py-2 text-4xl font-semibold">
          회원가입
        </h2>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="w-full box-border border-2 md:box-content rounded-md border-gray-500 bg-slate-white flex justify-center px-2 py-2 text-xl">
            <label htmlFor="username"></label>
            <input
              type="text"
              placeholder="아이디를 입력해 주세요 "
              name="userid"
              className="form-control"
              onChange={(e) => setValues({ ...values, userid: e.target.value })}
            />
          </div>
          <br />
          <div className="w-full box-border border-2 md:box-content rounded-md border-gray-500 bg-slate-white flex justify-center px-2 py-2 text-xl">
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요 "
              name="password"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <br />
          <div className="w-full  box-border border-2 md:box-content rounded-md border-gray-500  bg-slate-white flex justify-center px-2 py-2 text-xl">
            <label htmlFor="name"></label>
            <input
              type="text"
              placeholder="이름을 입력해 주세요 "
              name="username"
              className="form-control"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>
          <br />
          <div className="w-full box-border border-2 md:box-content rounded-md border-gray-500 bg-slate-white flex justify-center px-2 py-2 text-xl">
            <label htmlFor="email"></label>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              name="email"
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn w-full h-4/5 flex justify-center px-2 py-2 text-xl text-gray-600"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
