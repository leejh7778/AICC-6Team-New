import React, { useState } from 'react';

function ReservationModal({ onClose, setReservations }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const [notes, setNotes] = useState('');
  const [selectedPetType, setSelectedPetType] = useState(''); // 선택된 반려동물 유형 상태

  // 체크박스 선택 핸들러
  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedPetType(value); // 선택한 값으로 상태를 설정하여 하나만 선택 가능하게 함
  };

  const handleSaveReservation = () => {
    if (!name || !email || !date) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const newReservation = {
      id: Date.now(),
      name,
      number,
      email,
      date,

      notes,
      petType: selectedPetType, // 선택된 반려동물 유형 추가
    };

    setReservations((prevReservations) => [
      ...prevReservations,
      newReservation,
    ]); // 새 예약 추가
    onClose(); // 모달 닫기

    // 입력 필드 초기화
    setName('');
    setNumber('');
    setEmail('');
    setDate('');

    setNotes('');
    setSelectedPetType(''); // 체크리스트 초기화
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">예약 추가</h2>
        <input
          type="text"
          placeholder="이름"
          className="border border-gray-300 p-2 mb-4 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="전화번호"
          className="border border-gray-300 p-2 mb-4 w-full"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          type="email"
          placeholder="이메일"
          className="border border-gray-300 p-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 p-2 mb-4 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* 반려동물 유형 체크박스 추가 */}
        <div className="mb-4">
          <p className="font-semibold">반려동물 유형:</p>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              value="강아지"
              checked={selectedPetType === '강아지'}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span className="ml-2">강아지</span>
          </label>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              value="고양이"
              checked={selectedPetType === '고양이'}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span className="ml-2">고양이</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="기타"
              checked={selectedPetType === '기타'}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <span className="ml-2">기타</span>
          </label>
        </div>
        <textarea
          placeholder="메모"
          className="border border-gray-300 p-2 mb-4 w-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            onClick={handleSaveReservation}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
          >
            저장
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;
