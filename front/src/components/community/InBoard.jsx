import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Board from './Board';
import { commuData } from '../../constants/data';

const InBoard = () => {
  const { idx } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  useEffect(() => {
    const fetchBoardData = () => {
      const index = parseInt(idx);
      // console.log(`Parsed index: ${index}`);
      if (index >= 0 && index < commuData.length) {
        setBoard(commuData[index]);
      }
      setLoading(false);
    };

    fetchBoardData();
  }, [idx]);


  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <Board
          image={board.image}
          title={board.title}
          text={board.text}
        />
      )}
    </div>
  );
};

export default InBoard;