import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import ReservModal from '../map/ReservModal';
import { LuArrowBigUpDash } from "react-icons/lu";

function ReservationList() {
  const userid = localStorage.getItem('userid');
  const [reservationList, setReservationList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null); // 수정 시 선택된 예약 저장

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

  const deleteReserv = async (reservation) => {
    const confirmDeletion = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDeletion) {
      try {
        await axios.delete(
          `http://localhost:8080/delete_reserv/${reservation.reserv_idx}`
        );
        alert('삭제되었습니다.');
        setReservationList((prevList) =>
          prevList.filter((item) => item.reserv_idx !== reservation.reserv_idx)
        );
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleEditClickR = (reservation) => {
    setCurrentReservation(reservation); // 현재 선택된 예약을 상태에 저장
    setIsModalOpen(true); // 모달 열기
  };

  return (
    <div className="text-sm font-Aa min-w-[845px]">
      {reservationList.map((reservation) => (
        <div key={reservation.reserv_idx} className="flex flex-col m-3">
          <div className="bg-[#f1f3ea] w-full flex justify-between items-center py-5 rounded-lg">
            <div className="flex items-center px-5">
              <div className="px-5">
                <p>
                  <span className="font-bold text-green-900">병원 : </span>{' '}
                  {reservation.hosp_name}
                </p>
                <p>
                  <span className="font-bold text-green-700">병원 번호 : </span>{' '}
                  {reservation.hosp_pn}
                </p>
              </div>
              <p className="text-gray-700 px-3">내 번호: {reservation.pn}</p>
              <p className="text-gray-700 px-3">
                반려동물: {reservation.dog ? '강아지 ' : ''}
                {reservation.cat ? '고양이 ' : ''}
                {reservation.etc ? '기타 ' : ''}
              </p>
            </div>
            <p className="text-gray-700 px-3">예약 날짜: {reservation.date}</p>
            <div className="rounded-lg flex justify-center items-center">
              <div className="px-6">
                <button
                  onClick={() => handleEditClickR(reservation)}
                  className="w-10 h-10 flex justify-center items-center"
                >
                  <LuArrowBigUpDash className="w-7 h-7" />
                </button>
              </div>
              <button
                onClick={() => deleteReserv(reservation)}
                className="w-10 h-10"
              >
                <FaTrashAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && currentReservation && (
        <ReservModal
          reservation={currentReservation} // 선택된 예약 전달
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ReservationList;
