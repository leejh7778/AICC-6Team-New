import React from 'react';
import PageTitle from '../PageTitle';

const Board = ({ image, title, text }) => {
  return (
    <div className="container ">
      <PageTitle title="Community" className="py-2" />
      <h2 className="font-Kr font-bold text-3xl mb-5">{title}</h2>
      <div className="flex flex-col items-center bg-[#f1f3ea] py-5 rounded-lg px-5">
        <img src={image} alt="" className="mb-10" />

        <p className="font-Kr text-lg bg-[#d5dfdb] py-5 rounded-lg px-5">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Board;
