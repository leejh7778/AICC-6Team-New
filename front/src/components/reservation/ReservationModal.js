import React, { useState } from 'react';

const ReservationModal = ({ onClose, setReservations }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveReservation = () => {
    if (!name || !email || !date || !time) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const newReservation = {
      id: Date.now(), // 고유한 ID 생성
      name,
      number,
      email,
      date,
      time,
      notes,
    };

    setReservations((prevReservations) => [
      ...prevReservations,
      newReservation,
    ]); // 새 예약 추가
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 모달 배경 */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose} // 배경 클릭 시 모달 닫기
      ></div>

      {/* 모달 내용 */}
      <div className="relative bg-white p-6 rounded-lg w-1/3 shadow-lg z-10">
        <h2 className="text-xl font-bold mb-4">새 예약 추가</h2>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="전화번호을 입력하세요"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="문의 내용을 입력하세요"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-24 p-2 mb-4 border border-gray-300 rounded"
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
          >
            닫기
          </button>
          <button
            onClick={handleSaveReservation}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
