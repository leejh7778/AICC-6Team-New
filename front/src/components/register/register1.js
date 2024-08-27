import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [values, setValues] = useState({
    userID: '',
    password: '',
    username: '',
    email: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userID, password, username, email } = values;
    if (!userID || !password || !username || !email) {
      alert('입력값을 확인해주세요.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:8080/register', values);
      if (res.status === 201) {
        navigate('/login');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {' '}
      <div>
        {' '}
        <label>User ID:</label>{' '}
        <input
          type="text"
          name="userID"
          value={values.userID}
          onChange={handleChange}
        />{' '}
      </div>{' '}
      <div>
        {' '}
        <label>Password:</label>{' '}
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />{' '}
      </div>{' '}
      <div>
        {' '}
        <label>Username:</label>{' '}
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
        />{' '}
      </div>{' '}
      <div>
        {' '}
        <label>Email:</label>{' '}
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />{' '}
      </div>{' '}
      <button type="submit">Register</button>{' '}
    </form>
  );
};
export default Register;
