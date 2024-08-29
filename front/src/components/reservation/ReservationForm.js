import React, { useState } from 'react';

const ReservationForm = ({ onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSaveReservation = (e) => {
    e.preventDefault();

    if (!name || !email || !date || !time) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const reservation = {
      id: Date.now(), // 예약 ID 생성
      name,
      email,
      date,
      time,
      notes,
    };

    onSave(reservation); // 부모 컴포넌트로 예약 정보 전송
    clearForm(); // 폼 초기화
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setDate('');
    setTime('');
    setNotes('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">예약하기</h2>
      <form onSubmit={handleSaveReservation}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">메모</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="문의 내용을 입력하세요"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            예약 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
