import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <div style={{ height: 100 }}>
      <header />

      <h2 className="w-full h-4/5 bg-slate-200 flex justify-center px-2 py-2 text-4xl font-semibold ">
        Sign-In
      </h2>

      <div className="w-full h-4/5 bg-slate-200 flex justify-center px-2 py-2 text-xl mix-blend-normal  ">
        <label htmlFor="email">
          <strong>Email: </strong>
        </label>
        <input
          type="email"
          placeholder="Enter Your Email..."
          name="email"
          className="form-control"
        />
      </div>
      <div className="w-full h-4/5 bg-slate-200 flex justify-center px-2 py-2 text-xl">
        <label htmlFor="password">
          <strong>Password: </strong>
        </label>
        <input
          type="password"
          placeholder="Enter Your Password..."
          name="password"
          className="form-control "
        />
      </div>
      <button
        type="submit"
        className="btn w-full h-4/5 bg-slate-200 flex justify-center px-2 py-2 text-xl"
      >
        <Link to="/">Sign In</Link>
      </button>
      <div className="w-full h-4/5 bg-slate-200 flex justify-center px-2 py-2 text-xl">
        <Link to="/register">Create Account</Link>
      </div>
    </div>
  );
};

export default index;
