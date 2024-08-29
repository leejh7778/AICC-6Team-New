import React, { useState } from 'react';
import ReservationList from './ReservationList';
import ReservationModal from './ReservationModal';
import PageTitle from '../PageTitle';

function ReservationBoard() {
  const [reservations, setReservations] = useState([]); // 예약 목록 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

  const handleCreateNewReservation = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className=" w-full  text-2xl font-bold ">
      <PageTitle title="예약 문의" className="p-7" />

      {/* max-w-4xl mx-auto p-4 */}
      <div className="font-bold"></div>

      {/* 예약 페이지 제목 */}
      <h1 className="font-Kr  border-b-black border-b-2 p-3 font-semibold">
        예약 문의
      </h1>

      {/* 예약 목록 */}
      <ReservationList reservations={reservations} />

      {/* 예약하기 버튼 */}
      <div className="flex justify-end mt-10">
        <button
          onClick={handleCreateNewReservation}
          className="bg-[#819c87d1] text-white px-4 py-2 rounded-md shadow hover:bg-[#c3d1c7d1]"
        >
          예약하기
        </button>
      </div>

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
