// import React from 'react';
// import { Link } from 'react-router-dom';
// import PageTitle from '../PageTitle';

// const index = () => {
//   const title = '마이페이지';
//   return (
//     <div>
//       <div>
//         <div className="font-Kr font-bold b-">
//           <PageTitle title={title} className="font-Kr font-semibold" />
//         </div>

//         {/*
//       <h2 className="font-semibold text-xl  w-full h-[100px] flex items-center justify-between px-40 bg-[#7b9e84d1] rounded-md ">
//         {' '}
//         마이페이지{' '}
//       </h2> */}

//         <div style={{ display: 'flex', height: '73vh', gap: 4 }}>
//           {/* 왼쪽 내용 */}
//           <div
//             style={{
//               flex: 1,
//               backgroundColor: '#f0f0f0',
//               padding: '20px',
//             }}
//           >
//             <h2
//               className="font-semibold text-center text justify-normal-center
//           "
//             >
//               <ul>
//                 <li>
//                   <Link to="/inquiry">1:1 문의 내역</Link>
//                 </li>
//                 <li>
//                   <Link to="/reservation"> 나의 예약</Link>
//                 </li>
//               </ul>
//             </h2>
//           </div>

//           {/* 오른쪽 내용 */}
//           <div style={{ flex: 4, backgroundColor: '#e0e0e0', padding: '20px' }}>
//             <h2 className="article-title"> 내역</h2>
//             <div className="section-list">
//               <ul>
//                 <li>
//                   <a href="#"></a>data
//                 </li>
//               </ul>{' '}
//               <p>
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
//                 aliquam, aperiam veniam, pariatur porro repellendus inventore
//                 ut, // odit itaque quasi explicabo assumenda qui laboriosam
//                 sequi optio // voluptatem! At, ullam culpa. //{' '}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default index;

import React from 'react';
import { PiChatDots } from 'react-icons/pi';
import { LuCalendarCheck } from 'react-icons/lu';

const MyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className=" f-full  flex justify-center mt-20 px-2  text-4xl font-semibold ">
        마이페이지
      </h1>
      <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 mt-10">
        {/* 1:1 문의 카드 */}
        <div className="flex flex-col p-8 bg-[#f1f3ea] rounded-lg shadow-lg hover:shadow-2xl transition-shadow  w-80 h-48 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">1:1 문의</h2>
            <PiChatDots className="w-12 h-12" />
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
            <LuCalendarCheck className="w-12 h-12" />
          </div>
          <p className="text-blue-600 hover:underline cursor-pointer">
            예약 내역 보기 →
          </p>
          <a
            href="/reservation"
            className="mt-2 text-sm text-blue-500 underline"
          >
            예약 바로가기 →
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
