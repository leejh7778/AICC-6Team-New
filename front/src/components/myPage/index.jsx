import React, { useEffect, useState } from 'react';
import { PiChatDots } from 'react-icons/pi';
import { BsCalendarCheck } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyPage = ({ onLogout }) => {
  const [reservations, setReservations] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userid = localStorage.getItem('userid');

      if (!token) {
        // 로그인이 되어 있지 않으면 로그인 페이지로 이동
        navigate('/login');
        return;
      }

      try {
        // API 호출로 예약 데이터와 문의 데이터를 가져옵니다.
        const [reservationsResponse, inquiriesResponse] = await Promise.all([
          axios.get(`http://localhost:8080/get_reserv/${userid}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:8080/get_inq/${userid}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setReservations(reservationsResponse.data);
        setInquiries(inquiriesResponse.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleAccountDeletion = async () => {
    const confirmDeletion = window.confirm('정말로 탈퇴하시겠습니까?');

    if (confirmDeletion) {
      const token = localStorage.getItem('token');
      const userid = localStorage.getItem('userid');

      try {
        await axios.delete(`http://localhost:8080/delete_account/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { userid },
        });

        // 로그아웃 처리
        if (onLogout) {
          onLogout(); // 로그아웃 함수 호출
        }
      } catch (error) {
        console.error('회원 탈퇴 처리에 실패했습니다:', error);
      }
    }
  };

  return (
    <div className="font-Kr max-w-4xl mx-auto p-6">
      <h1 className="flex justify-center text-4xl font-semibold">마이페이지</h1>
      <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 mt-20">
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
              <div>
                {' '}
                {/* Wrap in a single container */}
                <p className="font-medium font-Kr">예약 내역 보기</p>{' '}
                {/* Display this only once */}
                <ul>
                  {inquiries.map((inquiry, index) => (
                    <li key={index} className="mb-2">
                      <a
                        href={`/inquiries/${inquiry.id}`}
                        className="text-blue-500 underline"
                      ></a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className=" font-Kr font-medium">예약 내역이 없습니다.</p>
            )}
          </div>
        </a>

        {/* 1:1 문의 카드 */}
        <a
          href="/inquiry"
          className="flex flex-col p-8 bg-[#f1f3ea] rounded-lg shadow-lg hover:shadow-2xl transition-shadow w-300 h-48"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">1:1 문의</h2>
            <PiChatDots className="w-14 h-14" />
          </div>
          <div className="mt-4">
            {inquiries.length > 0 ? (
              <div>
                {' '}
                {/* Wrap in a single container */}
                <p className="font-medium font-Kr">문의 내역 보기</p>{' '}
                {/* Display this only once */}
                <ul>
                  {inquiries.map((inquiry, index) => (
                    <li key={index} className="mb-2">
                      <a
                        href={`/inquiries/${inquiry.id}`}
                        className="text-blue-500 underline"
                      ></a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="font-Kr font-medium">문의 내역이 없습니다.</p>
            )}
          </div>
        </a>
      </div>

      {/* 탈퇴 버튼 */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleAccountDeletion}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
