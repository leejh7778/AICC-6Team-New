import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import ReservModal from '../map/ReservModal';
function ReservationList() {
  const userid = localStorage.getItem('userid');
  const [reservationList, setReservationList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);





  useEffect(() => {
    const getReservationList = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8080/get_reserv/${userid}`
        );
        setReservationList(resp.data);
      } catch (error) {
        console.error('예약 목록을 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    getReservationList();
  }, [userid]);


  const deleteReserv = async (reservationList) => {
    const confirmDeletion = window.confirm('정말로 삭제하시겠습니까?');
    if(confirmDeletion){

   
    try {
      console.log(reservationList.reserv_idx); // 값을 확인하는 로그
      await axios.delete(`http://localhost:8080/delete_reserv/${reservationList.reserv_idx}`);
      alert('삭제되었습니다.');

      // 삭제된 예약을 화면에서 제거
      setReservationList((prevList) =>
        prevList.filter((item) => item.reserv_idx !== reservationList.reserv_idx)
      );
    } catch (error) {
      console.error('삭제 중 오류가 발생했습니다:', error);
      alert('삭제에 실패했습니다.');
    }
  }
  };
  const reReserv = async (reservationList) => {
    const confirmDeletion = window.confirm('수정하시겠습니까?')
    if(confirmDeletion){
      try{
        await axios.patch(`http://localhost:8080/update_reserv/${reservationList.reserv_idx}`)
        alert('수정되었습니다.')
      } catch(error){
        console.error('수정 오류: ',error);
        alert('수정에 실패했습니다.')
      }
    }
  }

  const handleReservationClick = (reservationList) => {
      setReservationList(reservationList);
      setIsModalOpen(true);
  };




console.log(reservationList)
  return (
    <div className="text-sm font-Aa min-w-[845px]">
        {reservationList.map((reservationList) => (
        <div
            key={reservationList.id}
            className="flex flex-col m-3 "
          >
          <div className='bg-[#f1f3ea] w-full flex justify-between items-center py-5 rounded-lg'>
<div className='flex items-center px-5'>
           <div className='px-5'>
            <p><span className='font-bold text-green-900'>병원 : </span> {reservationList.hosp_name}</p>
            <p><span className='font-bold text-green-700'>병원 번호 : </span> {reservationList.hosp_pn}</p>
           </div>
                  {/* {reservationList.username} */}
               
            <p className="text-gray-700 px-3">내 번호: {reservationList.pn}</p>
            <p className="text-gray-700 px-3">
              반려동물: {reservationList.dog ? '강아지 ' : ''}
              {reservationList.cat ? '고양이 ' : ''}
              {reservationList.etc ? '기타 ' : ''}
            </p>
          
            </div>
            <p className="text-gray-700 px-3">예약 날짜: {reservationList.date}</p>

       

            <div  className=' rounded-lg flex justify-center items-center '>
            <div className='px-6'>버튼</div>
        <button onClick={() => deleteReserv(reservationList)} className='w-10 h-10'><FaTrashAlt className='w-5 h-5' /></button>
      </div>
    
            </div>
          </div>
        ))}
          {isModalOpen && reservationList && (
          <ReservModal
            onClose={() => setIsModalOpen(false)}
            hospitalId={reservationList.hosp_id}
            hospitalName={reservationList.hosp_name}
            hospitalPn={reservationList.hosp_pn}
          />
        )}
        
      </div>
    
  
  );
}

export default ReservationList;
