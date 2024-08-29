import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <div className=" font-Kr page-title text-2xl font-semibold font-En py-5 w-fit mb-10 relative">
      {title}
      <span className="under-bar absolute w-full h-[3px] bg-gray-300 left-0 bottom-0"></span>
    </div>
  );
};

export default PageTitle;
