import React from 'react';
import PostList from './PostList';
import PageTitle from '../PageTitle';

function InquiryBoard() {
  return (
    <div className="container min-h-[65vh] text-2xl font-bold ">
      <PageTitle title="1:1 문의" />
      <PostList />
    </div>
  );
}

export default InquiryBoard;
