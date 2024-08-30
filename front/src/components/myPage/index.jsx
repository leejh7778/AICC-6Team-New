import React from 'react';
import { PiChatDots } from 'react-icons/pi';
import { BsCalendarCheck } from 'react-icons/bs';

const MyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className=" f-full  flex justify-center  px-2  text-4xl font-semibold ">
        마이페이지
      </h1>
      <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 mt-10">
        {/* 1:1 문의 카드 */}
        <div className="flex flex-col p-8 bg-[#f1f3ea] rounded-lg shadow-lg hover:shadow-2xl transition-shadow  w-80 h-48 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">1:1 문의</h2>
            <PiChatDots className="w-12 h-12 " />
          </div>
          <p className="text-blue-600 hover:underline cursor-pointer">
            문의 내역 보기 →
          </p>
          <a href="/inquiry" className="mt-2 text-sm text-blue-500 underline">
            1:1 문의 바로가기 →
          </a>
        </div>

        {/* 나의 예약 카드 */}
        <div className="flex flex-col p-8 bg-[#f1f3ea] rounded-lg shadow-lg hover:shadow-2xl transition-shadow  w-80 h-48 ">
          {' '}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">나의 예약</h2>
            <BsCalendarCheck className="w-11 h-11" />
          </div>
          {/* <p className="text-blue-600 hover:underline cursor-pointer"> */}
          <a
            href="/reservation"
            className="mt-2 text-sm text-blue-500 underline"
          >
            예약 내역 보기 →
          </a>
          {/* </p> */}
          <a href="/map" className="mt-2 text-sm text-blue-500 underline">
            예약 바로가기 →
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
