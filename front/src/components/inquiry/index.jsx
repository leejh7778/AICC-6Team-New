import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <div>
      <h2 className="font-semibold text-xl  w-full h-[100px] flex items-center justify-between px-40 bg-[#7b9e84d1] rounded-md ">
        {' '}
        1:1문의{' '}
      </h2>

      <div style={{ display: 'flex', height: '73vh' }}>
        <div style={{ flex: 4, backgroundColor: '#e0e0e0', padding: '20px' }}>
          <h2 className="article-title"> 1:1 문의 내역</h2>
          <div className="section-list">
            <ul>
              <li>
                <h2
                  className="font-semibold text-center text justify-normal-center
          "
                ></h2>
                <a href="#"></a>data
              </li>
            </ul>{' '}
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
              aliquam, aperiam veniam, pariatur porro repellendus inventore ut,
              // odit itaque quasi explicabo assumenda qui laboriosam sequi
              optio // voluptatem! At, ullam culpa. //{' '}
            </p>
          </div>
          <br />
          <br />
          <ul>
            <li>
              <Link to="/inquiry">메인으로 돌아가기 </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default index;
