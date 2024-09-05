import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './modal.css';

function ReservModal({ onClose, reservation,hospitalName,hospitalPn }) {
  const [formData, setFormData] = useState({
    username: '',
    pn: '',
    date: '',
    dog: false,
    cat: false,
    etc: false,
    descriptionR: '',
    hosp_name: hospitalName,
    hosp_pn: hospitalPn,
  });

  const [userid, setUserid] = useState(null); // 로그인한 사용자 ID 저장
  const [isEdit, setIsEdit] = useState(false); // 수정 여부 확인

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserid(decodedToken.userid);
    }
    if (reservation) {
      // 전달받은 예약 데이터로 formData를 설정
      setFormData({
        username: reservation.username,
        pn: reservation.pn,
        date: reservation.date,
        dog: reservation.dog,
        cat: reservation.cat,
        etc: reservation.etc,
        descriptionR: reservation.descriptionr,
        hosp_name: reservation.hosp_name,
        hosp_pn: reservation.hosp_pn,
      });
      setIsEdit(true); // 수정 모드로 설정
    }
  }, [reservation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        // 예약 수정
        await axios.patch(
          `http://localhost:8080/update_reserv/${reservation.reserv_idx}`,
          {
            ...formData,
            userid,
          }
        );
        alert('예약이 수정되었습니다.');
      } else {
        // 새로운 예약
        await axios.post('http://localhost:8080/post_reserv', {
          ...formData,
          userid,
        });
        alert('예약이 성공적으로 완료되었습니다.');
      }
      onClose(); // 모달 닫기
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('예약 실패:', error);
      alert('예약 중 오류가 발생했습니다.');
    }
  };

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  let availabaleDay = `${year}-${month}-${day}`;

  return (
    <div className="modal font-Kr">
      <div className="modal-content min-h-[476px] max-w-[550px]">
        <h2 className="text-3xl font-semibold pb-5">
          {isEdit ? '예약 수정' : '예약하기'}
        </h2>
        <div>
          <h2 className="font-semibold text-lg pb-5 text-center">
            {formData.hosp_name}
          </h2>
          <form className="flex flex-col justify-start">
            <div className="inputLabel flex flex-col">
              <div>
                <label>
                  이름:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>전화번호:&nbsp;</label>
                <input
                  type="text"
                  name="pn"
                  value={formData.pn}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>방문일자:&nbsp;</label>
                <input
                  type="date"
                  name="date"
                  min={availabaleDay}
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="checkbox text-center pr-6">
                <label>강아지</label>
                <input
                  type="checkbox"
                  name="dog"
                  checked={formData.dog}
                  onChange={handleChange}
                />
                <label>고양이</label>
                <input
                  type="checkbox"
                  name="cat"
                  checked={formData.cat}
                  onChange={handleChange}
                />
                <label>기타</label>
                <input
                  type="checkbox"
                  name="etc"
                  checked={formData.etc}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>진료내용:&nbsp;</label>
                <textarea
                  name="descriptionR"
                  value={formData.descriptionR}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-actions font-semibold justify-end">
              <button className='mx-5' type="button" onClick={handleSubmit}>
                {isEdit ? '수정하기' : '예약하기'}
              </button>
              <button type="button" onClick={onClose}>
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReservModal;
