import React, { useState } from 'react';
import axios from 'axios';
import './modal.css';

function ReservationForm({ onClose, hospitalId, hospitalName }) {
  const [formData, setFormData] = useState({
    username: '',
    pn: '',
    date: '',
    dog: false,
    cat: false,
    etc: false,
    descriptionR: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/post_reserv', {
        ...formData,
        user_idx: hospitalId, // 사용자 ID를 설정 (병원 ID는 실제로 사용자의 ID로 대체)
      });
      alert('예약이 성공적으로 완료되었습니다.');
      onClose();
    } catch (error) {
      console.error('예약 실패:', error);
      alert('예약 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="modal font-Kr font-En">
      <div className="modal-content"> 
        <h2 className='text-3xl font-semibold pb-5' >예약하기</h2>
        <h2 className='font-semibold text-lg pb-5 text-center'>{hospitalName}</h2>
        <form>
        <div className='inputLabel text-center flex flex-col'>
          <div >
            <label>
              이름:&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              전화번호:
              <input
                type="text"
                name="pn"
                value={formData.pn}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              방문일자:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className='checkbox'>
            <label>
              강아지
              <input
                type="checkbox"
                name="dog"
                checked={formData.dog}
                onChange={handleChange}
              />
            </label>
            <label>
              고양이
              <input
                type="checkbox"
                name="cat"
                checked={formData.cat}
                onChange={handleChange}
              />
            </label>
            <label>
              기타
              <input
                type="checkbox"
                name="etc"
                checked={formData.etc}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              진료내용:
              <textarea
                name="descriptionR"
                value={formData.descriptionR}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
          <div className="modal-actions font-semibold">
            <button type="button" onClick={handleSubmit}>
              예약하기
            </button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
