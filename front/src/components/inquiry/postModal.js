import React, { useState } from 'react';
import axios from 'axios';

function PostModal({ onClose, setPosts }) {
  // 컴포넌트 이름을 대문자로 시작
  const [formData, setFormData] = useState({
    username: '',
    pn: '',
    descriptionI: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.username || !formData.pn || !formData.descriptionI) {
        alert('모든 필수 필드를 입력해주세요.');
        return;
      }

      await axios.post('http://localhost:8080/post_inq', formData);
      alert('문의가 성공적으로 등록되었습니다.');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('문의 등록 실패:', error);
      alert('문의 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 모달 배경 */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* 모달 내용 */}
      <div className="relative bg-white text-xl p-6 rounded-lg w-1/3 shadow-lg z-10 font-kr">
        <h2 className="font-Kr font-bold mb-4 text-4xl text-center">
          Contact Us
        </h2>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="tel"
          placeholder="연락처를 입력하세요"
          name="pn"
          value={formData.pn}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="문의 내용을 입력하세요."
          name="descriptionI"
          value={formData.descriptionI}
          onChange={handleChange}
          className="w-full h-[260px] p-2 mb-4 border border-gray-300 rounded"
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-gray-300 text-gray-800 text-xl rounded mr-2"
          >
            닫기
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1.5 bg-[#acbd9b] text-white text-xl rounded"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
