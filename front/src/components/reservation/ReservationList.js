import React from 'react';

function ReservationList({ reservations }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {reservations.map((reservation) => (
        <li
          key={reservation.id}
          className="bg-white p-4 rounded shadow hover:shadow-md"
        >
          <div>
            <h2 className="text-xl font-semibold mb-2">{reservation.name}</h2>

            <p className="text-gray-700">전화번호: {reservation.number}</p>
            <p className="text-gray-700"> 이메일: {reservation.email}</p>

            <p className="text-gray-700">날짜: {reservation.date}</p>
            <p className="text-gray-700">
              npn 반려동물: {reservation.selectedPetType}
            </p>
            <p className="text-gray-700">메모: {reservation.notes}</p>
          </div>
          {/* 예약 수정/삭제 버튼 */}
          {/* <div>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
              수정
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              삭제
            </button>
          </div> */}
        </li>
      ))}
    </div>
  );
}

export default ReservationList;
