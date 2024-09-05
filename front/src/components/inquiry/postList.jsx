import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
function PostList() {
  const userid = localStorage.getItem('userid');
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get_inq/${userid}`
        );
        setPostList(response.data);
      } catch (error) {
        console.error('문의 목록을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    getPostList();
  }, [userid]);

  const deleteInq = async (postList) => {
    const confirmDeletion = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDeletion) {
      try {
        console.log(postList.inq_idx); // 값을 확인하는 로그
        await axios.delete(
          `http://localhost:8080/delete_inq`
          // ${postList.inq_idx}
        );
        alert('삭제되었습니다.');

        // 삭제된 예약을 화면에서 제거
        setPostList((prevList) =>
          prevList.filter((item) => item.inq_idx !== postList.inq_idx)
        );
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  console.log(postList);
  return (
    <div className="text-sm font-Aa min-w-[845px]">
      {postList.map((postList) => (
        <div key={postList.id} className="flex flex-col m-3 ">
          <div className="bg-[#f1f3ea] flex justify-between items-center py-5 rounded-lg">
            <div className="flex items-center px-5">
              <div className="px-5 ">
                <p>
                  <span className="font-bold text-green-900">병원 : </span>{' '}
                  {postList.hosp_name}
                </p>
                <p>
                  <span className="font-bold text-green-700">병원 번호 : </span>{' '}
                  {postList.hosp_pn}
                </p>
              </div>
              {/* {reservationList.username} */}

              <p className="text-gray-700 px-3">내 번호: {postList.pn}</p>
            </div>
            <p className="text-gray-700 px-3">문의 날짜: {postList.date}</p>

            <div className=" rounded-lg flex justify-center items-center ">
              <button onClick={() => deleteInq(postList)} className="w-10 h-10">
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
