import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <div className=" font-Kr page-title text-2xl font-semibold   py-5 mb-10 relative">
      <span className="relative inline-block transform -translate-y-2">
        {title}
      </span>
      <span className="under-bar absolute w-full h-[3px] bg-gray-300 left-0 bottom-0"></span>
    </div>
  );
};

export default PageTitle;
