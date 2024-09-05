import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import PostModal from '../map/PostModal'; // 수정 모달 컴포넌트
import { LuArrowBigUpDash } from 'react-icons/lu';

function PostList() {
  const userid = localStorage.getItem('userid');
  const [PostList, setPostList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null); // 현재 선택된 문의 저장

  useEffect(() => {
    const getPostList = async () => {
      try {
        const resp = await axios.get(`http://localhost:8080/get_inq/${userid}`);
        setPostList(resp.data);
      } catch (error) {
        console.error('문의 목록을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    getPostList();
  }, [userid]);

  const deleteInq = async (post) => {
    const confirmDeletion = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDeletion) {
      try {
        await axios.delete(`http://localhost:8080/delete_inq/${post.inq_idx}`);
        alert('삭제되었습니다.');

        // 삭제된 문의를 화면에서 제거
        setPostList((prevList) =>
          prevList.filter((item) => item.inq_idx !== post.inq_idx)
        );
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const handleEditClickI = (post) => {
    setCurrentPost(post); // 현재 선택된 문의를 상태에 저장
    setIsModalOpen(true); // 모달 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentPost(null); //
  };

  return (
    <div className="text-sm font-Aa min-w-[845px]">
      {PostList.map((post) => (
        <div key={post.inq_idx} className="flex flex-col my-3">
          <div className="bg-[#f1f3ea] flex px-3 justify-between items-center py-5 rounded-lg">
            <div className="flex items-center">
              <div className="">
                <p>
                  <span className="font-bold text-green-900">병원 : </span>
                  {post.hosp_name}
                </p>
                <p>
                  <span className="font-bold text-green-700">병원 번호 : </span>
                  {post.hosp_pn}
                </p>
              </div>
            </div>
            <p className="text-gray-700  overflow-y-auto w-[300px] h-10 justify-start ">
              {post.descriptioni}
            </p>

            <div className="rounded-lg flex justify-center items-center">
              <div className="px-6">
                <button
                  onClick={() => handleEditClickI(post)}
                  className="w-10 h-10 flex justify-center items-center"
                >
                  <LuArrowBigUpDash className="w-7 h-7" />
                </button>
              </div>
              <button
                onClick={() => deleteInq(post)}
                className="w-10 h-10 ml-2"
              >
                <FaTrashAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && currentPost && (
        <PostModal onClose={handleModalClose} post={currentPost} />
      )}
    </div>
  );
}

export default PostList;
