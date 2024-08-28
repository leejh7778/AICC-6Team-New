// import React from 'react';
// import { Link } from 'react-router-dom';

// const index = () => {
//   return (
//     <div>
//       <h2 className="font-semibold text-xl  w-full h-[100px] flex items-center justify-between px-40 bg-[#7b9e84d1] rounded-md ">
//         {' '}
//         1:1문의{' '}
//       </h2>

//       <div style={{ display: 'flex', height: '73vh' }}>
//         <div style={{ flex: 4, backgroundColor: '#e0e0e0', padding: '20px' }}>
//           <h2 className="article-title"> 1:1 문의 내역</h2>
//           <div className="section-list">
//             <ul>
//               <li>
//                 <h2
//                   className="font-semibold text-center text justify-normal-center
//           "
//                 ></h2>
//                 <a href="#"></a>data
//               </li>
//             </ul>{' '}
//             <head>
//               <div className="w-device"></div>
//               <style></style>
//               <title className="m-0 p-0">1:1 문의 내역</title>
//               <link rel="stylesheet" href="components/inquiry" />
//             </head>
//             <body>
//               <div className=" board_wrap">
//                 <div className=" board_title">
//                   <strong>1:1</strong>

//                   <p>나의 문의를 확인할 수 있습니다.</p>
//                 </div>
//               </div>
//               <div className=" board_list_wrap border-r border-[#ddd]">
//                 <div className=" board_list w-full roundedd-t-sm ">
//                   <div className="top border-r  border-[#ddd]">
//                     <div className="num w-2">번호</div>
//                     <di className="title w-2"> 제목</di>
//                     <div className="writer w-2"> 글쓴이</div>
//                     <div className="date w-2"> 작성일</div>
//                     <div className="count w-2"> 조회</div>
//                   </div>
//                   <div className="top">
//                     <div className="num">2</div>
//                     <di className="title"> 글이 들어감</di>
//                     <div className="writer"> 이름</div>
//                     <div className="date"> 2024.08.27</div>
//                     <div className="count"> 5</div>
//                   </div>
//                   <div className="top">
//                     <div className="num">3</div>
//                     <di className="title"> 글이 들어감</di>
//                     <div className="writer"> 이름</div>
//                     <div className="date"> 2024.08.27</div>
//                     <div className="count"> 5</div>
//                   </div>
//                   <div className="top">
//                     <div className="num">4</div>
//                     <di className="title"> 글이 들어감</di>
//                     <div className="writer"> 이름</div>
//                     <div className="date"> 2024.08.27</div>
//                     <div className="count"> 5</div>
//                   </div>
//                 </div>
//                 <div className="bt_wrap">
//                   <a href="z"></a>
//                 </div>

//                 <div className=" board_page"></div>
//                 <div className="bt_wrap  my-4 text-center font-semibold">
//                   <a
//                     href="#"
//                     className="on   min-w-20 mx-2.5 p-2.5 border-[1px]-solid-[#000] border rounded-sm font-normal "
//                   >
//                     목록
//                   </a>
//                   <a
//                     href="#"
//                     className=" min-w-20 p-2.5 border-[1px]-solid-[#000] border rounded-sm font-normal mx-0"
//                   >
//                     {' '}
//                     수정
//                   </a>
//                 </div>
//               </div>
//             </body>
//             <p>
//               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
//               aliquam, aperiam veniam, pariatur porro repellendus inventore ut,
//               // odit itaque quasi explicabo assumenda qui laboriosam sequi
//               optio // voluptatem! At, ullam culpa. //{' '}
//             </p>
//           </div>
//           <br />
//           <br />
//           <ul>
//             <li>
//               <Link to="/inquiry">메인으로 돌아가기 </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <style></style>
//     </div>
//   );
// };

// export default index;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '../inquiry/postList';

function Board() {
  const [posts, setPosts] = useState([
    { id: 1, title: '첫 번째 글', summary: '첫 번째 글의 요약입니다.' },
    { id: 2, title: '두 번째 글', summary: '두 번째 글의 요약입니다.' },
    // 추가 게시글들...
  ]);
  const navigate = useNavigate();

  const history = useNavigate();

  const handleSelectPost = (postId) => {
    history.push(`/post/${postId}`);
  };

  const handleCreateNewPost = () => {
    navigate('/new'); // 'new' 경로로 이동하여 새 글 작성 페이지로 이동
  };

  return (
    <div className="text-2xl font-bold">
      {/* <h2 className="text-2xl font-bold">게시판 리스트</h2> */}

      <PostList posts={posts} onSelectPost={handleSelectPost} />
      <button
        onClick={handleCreateNewPost}
        className="mt-5 mb-4 py-2 px-5 bg-[#7b9e84d1] text-white rounded-md hover:bg-[#728d78d1] focus:outline-none"
      >
        {' '}
        글 작성하기
      </button>
      <button onClick={handleCreateNewPost}>글 작성하기</button>
    </div>
  );
}

export default Board;
