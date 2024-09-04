import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReservationList() {
  const userid = localStorage.getItem('userid');
  const [reservationList, setReservationList] = useState([]);





  useEffect(() => {
    const getReservationList = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8080/get_reserv/${userid}`
        );
        setReservationList(resp.data);
      } catch (error) {
        console.error('예약 목록을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    getReservationList();
  }, [userid]);


  const deleteReserv = async (reservationList) => {
    try {
      console.log(reservationList.reserv_idx); // 값을 확인하는 로그
      await axios.delete(`http://localhost:8080/delete_reserv/${reservationList.reserv_idx}`);
      alert('삭제되었습니다.');

      // 삭제된 예약을 화면에서 제거
      setReservationList((prevList) =>
        prevList.filter((item) => item.reserv_idx !== reservationList.reserv_idx)
      );
    } catch (error) {
      console.error('삭제 중 오류가 발생했습니다:', error);
      alert('삭제에 실패했습니다.');
    }
  };




  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">나의 예약 목록</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {reservationList.map((reservationList) => (
          <div
            key={reservationList.id}
            className="bg-[#d5dfdb] p-4 rounded shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
            {reservationList.hosp_name}
            {reservationList.hosp_pn}

              {reservationList.username}
            </h2>
            <p className="text-gray-700">전화번호: {reservationList.pn}</p>
            
            <p className="text-gray-700">날짜: {reservationList.date}</p>
            <p className="text-gray-700">
              반려동물: {reservationList.dog ? '강아지 ' : ''}
              {reservationList.cat ? '고양이 ' : ''}
              {reservationList.etc ? '기타 ' : ''}
            </p>
            <p className="text-gray-700">
              메모: {reservationList.descriptionr}
            </p>
            <div className="mt-4"></div>
            <div  className=' bg-black text-white'>
        <button onClick={() => deleteReserv(reservationList)}>삭제하기</button>
      </div>
          </div>
        ))}

        
      </div>
    
    </div>
  );
}

export default ReservationList;
