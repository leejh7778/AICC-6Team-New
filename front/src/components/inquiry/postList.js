import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

function PostList() {
  const userid = localStorage.getItem('userid'); // 사용자 ID를 로컬 스토리지에서 가져옴
  const [postList, setPostList] = useState([]); // 문의 목록 상태 관리

  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get_Inq/${userid}`
        );
        setPostList(response.data);
      } catch (error) {
        console.error('문의 목록을 가져오는 중 오류가 발생했습니다:', error); // 오류 처리
      }
    };

    if (userid) {
      getPostList(); // 컴포넌트 마운트 시 1:1 문의 목록 가져오기
    }
  }, [userid]);

  const deleteInq = async () => {
    const confirmDeletion = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDeletion) {
      try {
        await axios.delete(`http://localhost:8080/delete_inq/${}`); // 선택한 문의 삭제
        alert('삭제되었습니다.');

        // 삭제된 문의를 화면에서 제거
        setPostList((prevList) =>
          prevList.filter((item) => item.inq_idx !== inq.inq_idx)
        );
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="text-sm font-Aa min-w-[845px]">
      {postList.map((inq) => (
        <div key={inq.inq_idx} className="flex flex-col m-3 ">
          <div className="bg-[#f1f3ea] flex justify-between items-center py-5 rounded-lg">
            <div className="flex items-center px-5">
              <div className="px-5">
                <p>
                  <span className="font-bold text-green-900">병원: </span>{' '}
                  {inq.hosp_name}
                </p>
                <p>
                  <span className="font-bold text-green-700">병원 번호: </span>{' '}
                  {inq.hosp_pn}
                </p>
              </div>
              <p className="text-gray-700 px-3">내 번호: {inq.pn}</p>
            </div>
            <p className="text-gray-700 px-3">문의 날짜: {inq.date}</p>

            <div className="rounded-lg flex justify-center items-center">
              <button onClick={() => deleteInq(inq)} className="w-10 h-10">
                <FaTrashAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
