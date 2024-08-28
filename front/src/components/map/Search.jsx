import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/hospitals');
      console.log(response.data); // 데이터를 확인하는 올바른 방법
    } catch (error) {
      console.error('Error fetching data:', error); // 에러 처리
    }
  };
  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기 함수 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정


  return (
    <div>
      <h1>Search Results</h1>

    </div>
  );
};

export default Search;


// http://localhost:8080/hospitals