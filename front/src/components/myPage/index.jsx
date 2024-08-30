import React from 'react';
import { PiChatDots } from 'react-icons/pi';
import { BsCalendarCheck } from 'react-icons/bs';

const MyPage = () => {
  return (
    <div className=" font-Kr max-w-4xl mx-auto p-6 ">
      <h1 className=" font-Kr f-full  flex justify-center  px-2  text-4xl font-semibold ">
        마이페이지
      </h1>
      <br />

      <div className=" font-Kr grid grid-cols-1 sm:grid-cols-2 gap-9 mt-20">
        {/* 1:1 문의 카드 */}
        <a
          href="/inquiry"
          className="flex flex-col p-8 bg-[#f1f3ea] rounded-lg shadow-lg hover:shadow-2xl transition-shadow  w-300 h-48 "
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">1:1 문의</h2>
            <PiChatDots className="w-14 h-14 " />
          </div>
        </a>
        {/* 나의 예약 카드 */}
        {/* <p className="text-blue-600 hover:underline cursor-pointer"> */}
        <a
          href="/reservation"
          className="flex flex-col p-8 bg-[#f1f3ea] rounded-lg shadow-lg hover:shadow-2xl transition-shadow  w-80 h-48 "
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">나의 예약</h2>
            <BsCalendarCheck className="w-12 h-12" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default MyPage;
