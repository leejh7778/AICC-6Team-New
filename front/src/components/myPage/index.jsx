import React, { useEffect, useState } from 'react';
import { PiChatDots } from 'react-icons/pi';
import { BsCalendarCheck } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem('token');
    if (!token) {
      // 로그인이 되어 있지 않으면 로그인 페이지로 이동
      navigate('/login');
      return;
    }

    // 예약 데이터를 서버에서 받아옴
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get_reserv/${localStorage.getItem(
            'reserv_idx'
          )}`, // 엔드포인트 수정
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
            },
            params: {
              user_id: localStorage.getItem('userid'), // 사용자 ID를 로컬 스토리지에서 가져옴
            },
          }
        );
        setReservations(response.data);
      } catch (error) {
        console.error('예약 데이터를 불러오는데 실패했습니다:', error);
      }
    };

    fetchReservations();
  }, [navigate]);

  return (
    <div className="font-Kr max-w-4xl mx-auto p-6">
      <h1 className="flex justify-center text-4xl font-semibold">마이페이지</h1>
      <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 mt-20">
        {/* 1:1 문의 카드 */}
        <a
          href="/inquiry"
          className="flex flex-col p-8 bg-[#f1f3ea] rounded-lg shadow-lg hover:shadow-2xl transition-shadow w-300 h-48"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">1:1 문의</h2>
            <PiChatDots className="w-14 h-14" />
          </div>
        </a>

        {/* 나의 예약 카드 */}
        <a
          href="/reservation"
          className="flex flex-col p-8 bg-[#f1f3ea] rounded-lg shadow-lg hover:shadow-2xl transition-shadow w-80 h-48"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">나의 예약</h2>
            <BsCalendarCheck className="w-12 h-12" />
          </div>
          <div className="mt-4">
            {reservations.length > 0 ? (
              <ul>
                {reservations.map((reservation, index) => (
                  <li key={index} className="mb-2">
                    {reservation.date} - {reservation.hospitalName} -{' '}
                    {reservation.descriptionR}
                  </li>
                ))}
              </ul>
            ) : (
              <p>예약 내역이 없습니다.</p>
            )}
          </div>
        </a>
      </div>
    </div>
  );
};

export default MyPage;
