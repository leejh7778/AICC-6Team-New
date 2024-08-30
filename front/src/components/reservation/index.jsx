import React, { useState } from 'react';
import ReservationList from './ReservationList';
import ReservationModal from './ReservationModal';

function ReservationBoard() {
  const [reservations, setReservations] = useState([]); // 예약 목록 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

  const handleCreateNewReservation = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
        <button
          onClick={handleCreateNewReservation}
          className="border-b-2  bg-[#819c87d1]   text-white text-2xl  py-1.5 px-2 rounded-md shadow hover:bg-[#c3d1c7d1]"
        >
          예약하기
        </button>
      </div>

      {/* 예약 목록 */}
      <ReservationList reservations={reservations} />

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <ReservationModal
          onClose={handleCloseModal}
          setReservations={setReservations}
        />
      )}
    </div>
  );
}

export default ReservationBoard;
