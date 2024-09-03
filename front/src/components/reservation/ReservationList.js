import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            'http://localhost:8080/reservations',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setReservations(response.data);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('예약 정보를 가져오는 데 문제가 발생했습니다.');
      }
    };

    fetchReservations();
  }, []);

  const handleEdit = (id) => {
    // 수정 버튼 클릭 시 동작 구현
    console.log(`Edit reservation with ID: ${id}`);
    // 실제 수정 로직 추가 필요
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(
        reservations.filter((reservation) => reservation.id !== id)
      );
      alert('예약이 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('예약 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">나의 예약 목록</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              {reservation.username}
            </h2>
            <p className="text-gray-700">전화번호: {reservation.pn}</p>
            <p className="text-gray-700">이메일: {reservation.email}</p>
            <p className="text-gray-700">날짜: {reservation.date}</p>
            <p className="text-gray-700">
              반려동물: {reservation.dog ? '강아지 ' : ''}
              {reservation.cat ? '고양이 ' : ''}
              {reservation.etc ? '기타 ' : ''}
            </p>
            <p className="text-gray-700">메모: {reservation.descriptionR}</p>
            <div className="mt-4">
              <button
                onClick={() => handleEdit(reservation.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition-colors"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(reservation.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReservationList;
