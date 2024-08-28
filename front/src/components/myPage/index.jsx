import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';

const index = () => {
  const title = '마이페이지';
  return (
    <div>
      <div>
        <div className="font-Kr font-bold b-">
          <PageTitle title={title} className="font-Kr font-semibold" />
        </div>

        {/* 
      <h2 className="font-semibold text-xl  w-full h-[100px] flex items-center justify-between px-40 bg-[#7b9e84d1] rounded-md ">
        {' '}
        마이페이지{' '}
      </h2> */}

        <div style={{ display: 'flex', height: '73vh', gap: 4 }}>
          {/* 왼쪽 내용 */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#f0f0f0',
              padding: '20px',
            }}
          >
            <h2
              className="font-semibold text-center text justify-normal-center
          "
            >
              <ul>
                <li>
                  <Link to="/inquiry">1:1 문의 내역</Link>
                </li>
                <li>
                  <Link to="/reservation"> 나의 예약</Link>
                </li>
              </ul>
            </h2>
          </div>

          {/* 오른쪽 내용 */}
          <div style={{ flex: 4, backgroundColor: '#e0e0e0', padding: '20px' }}>
            <h2 className="article-title"> 내역</h2>
            <div className="section-list">
              <ul>
                <li>
                  <a href="#"></a>data
                </li>
              </ul>{' '}
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
                aliquam, aperiam veniam, pariatur porro repellendus inventore
                ut, // odit itaque quasi explicabo assumenda qui laboriosam
                sequi optio // voluptatem! At, ullam culpa. //{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
