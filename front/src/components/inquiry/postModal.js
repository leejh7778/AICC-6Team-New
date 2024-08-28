import React, { useState } from 'react';

const PostModal = ({ onClose, setPosts }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [summary, setSummary] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 유효성 검사 정규식
    return emailRegex.test(email);
  };

  const handleSavePost = () => {
    if (name.trim() === '' || email.trim() === '' || summary.trim() === '') {
      alert('빈칸이 없는지 확인해주세요!');
      return;
    }
    if (!validateEmail(email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    setPosts((prevPosts) => [
      ...prevPosts,
      { id: prevPosts.length + 1, name, email, summary },
    ]);

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
        <h2 className="text-xl font-bold mb-4">새 글 작성</h2>
        <input
          type="name"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="문의 내용을 입력하세요."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full h-[380px] p-2 mb-4 border border-gray-300 rounded"
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
          >
            닫기
          </button>
          <button
            onClick={handleSavePost}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal; // 반드시 default export 사용
