import React, { useState } from 'react';

const PostModal = ({ onClose, setPosts }) => {
  const [name, setName] = useState('');
  const [pn, setpn] = useState('');
  const [summary, setSummary] = useState('');

  const validatepn = (pn) => {
    const pnRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
    return pnRegex.test(pn);
  };

  const handleSavePost = () => {
    if (name.trim() === '' || pn.trim() === '' || summary.trim() === '') {
      alert('빈칸이 없는지 확인해주세요!');
      return;
    }
    if (!validatepn(pn)) {
      alert('유효한 연락처를 입력해주세요.');
      return;
    }

    setPosts((prevPosts) => [
      ...prevPosts,
      { id: prevPosts.length + 1, name, pn, summary },
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
      <div className="relative bg-white text-xl p-6 rounded-lg w-1/3 shadow-lg z-10 font-kr ">
        <h2 className="font-Kr font-bold mb-4 text-4xl justify-center">
          Contack Us
        </h2>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={pn}
          onChange={(e) => setpn(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="문의 내용을 입력하세요."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full h-[260px] p-2 mb-4 border border-gray-300 rounded"
        ></textarea>
        <div className="flex justify-end ">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-gray-300 text-gray-800 text-xl rounded mr-2"
          >
            닫기
          </button>
          <button
            onClick={handleSavePost}
            className="px-3 py-1.5  bg-[#acbd9b] text-white  text-xl rounded mr-2"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal; // 반드시 default export 사용
