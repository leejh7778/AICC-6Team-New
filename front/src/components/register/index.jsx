import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
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
        <div className="w-full  box-border border-2 md:box-content rounded-md border-gray-500  bg-slate-white flex justify-center px-2 py-2 text-xl">
          <label htmlFor="email"></label>
          <input
            type="아이디"
            placeholder="아이디를 입력해 주세요 "
            name="id"
            className="form-control"
          />
        </div>
        <br />
        <div className="w-full  box-border border-2 md:box-content rounded-md border-gray-500  bg-slate-white flex justify-center px-2 py-2 text-xl">
          <label htmlFor="password"></label>
          <input
            type="비밀번호"
            placeholder="비밀번호를 입력해 주세요 "
            name="password"
            className="form-control"
          />
        </div>
        <br />{' '}
        <div className="w-full  box-border border-2 md:box-content rounded-md border-gray-500  bg-slate-white flex justify-center px-2 py-2 text-xl">
          <label htmlFor="name"></label>
          <input
            type="이름"
            placeholder="이름을 입력해 주세요 "
            name="namw"
            className="form-control"
          />
        </div>
        <br />
        <div className="w-full  box-border border-2 md:box-content rounded-md border-gray-500  bg-slate-white flex justify-center px-2 py-2 text-xl ">
          <label htmlFor="email"></label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            name="email"
            className="form-control"
          />
        </div>
        <br />
        <button
          type="submit"
          className="btn w-full h-4/5  flex justify-center px-2 py-2 text-xl text-gray-600"
        >
          <Link to="/login">가입하기</Link>
        </button>
      </div>
    </div>
  );
};

export default index;
