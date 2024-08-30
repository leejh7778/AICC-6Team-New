import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '../inquiry/postList';
import PageTitle from '../PageTitle';
import PostModal from '../inquiry/postModal'; // 모달 컴포넌트 임포트

function Board() {
  const [posts, setPosts] = useState([
    { id: 1, title: '첫 번째 글', summary: '첫 번째 글의 요약입니다.' },
    { id: 2, title: '두 번째 글', summary: '두 번째 글의 요약입니다.' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리
  const navigate = useNavigate();

  //게시글 선텍 시 해당 게시글의 상세보기 페이지로 이동
  const handleSelectPost = (postId) => {
    navigate(`/post/${postId}`); // navigate로 경로 이동
    console.log(`게시글 ID: ${postId} 선택됨`);
  };

  // 모달을 열기 위한 함수
  const handleCreateNewPost = () => {
    setIsModalOpen(true); // 모달 열기
  };
  // 모달을 닫기 위한 함수
  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 글 작성 페이지로 이동하는 함수

  return (
    <div className="w-full  font-Kr text-2xl font-bold  ">
      <PageTitle title="1:1문의" className="p-7" />
      <div>
        <div className="font-bold"></div>

        {/* 게시글 리스트 */}
        <PostList posts={posts} onSelectPost={handleSelectPost} />

        {/* 모달 컴포넌트 렌더링 */}
        {isModalOpen && (
          <PostModal onClose={handleCloseModal} setPosts={setPosts} />
        )}

        {/* 글 작성하기 버튼 (모달 열기) */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleCreateNewPost}
            className="mt-5 mb-4 py-1.5 px-2 bg-[#acbd9b] text-white text-2xl rounded-md shadow hover:bg-[#c3d1c7d1] focus:outline-none "
          >
            글 작성하기
          </button>
        </div>
      </div>
      {isModalOpen && (
        <PostModal onClose={handleCloseModal} setPosts={setPosts} />
      )}
    </div>
  );
}

export default Board;
