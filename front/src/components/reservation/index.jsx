import React, { useState } from 'react';
import ReservationList from './ReservationList';


function ReservationBoard() {
  const [reservations, setReservations] = useState([]); // 예약 목록 상태 관리


  return (
    <div className=" w-full  text-2xl font-bold ">
      {/* 예약하기 버튼 */}

      {/* max-w-4xl mx-auto p-4 */}
      <div className="font-bold"></div>

      {/* 예약 페이지 제목 */}

      <h1 className="font-Kr w-[100%] border-b-gray-600 border-b-2 p-3 mt-4 font-semibold">
        예약 문의
      </h1>
      <div className="flex justify-end mt-10">
       
      </div>

      {/* 예약 목록 */}
      <ReservationList reservations={reservations} />


    </div>
  );
}

export default ReservationBoard;
