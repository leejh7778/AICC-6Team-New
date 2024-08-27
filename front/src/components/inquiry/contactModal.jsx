import React from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';

const contactModal = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({}));
  };
  return (
    <div className="add-card w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md flex items-center justify-center gap-x-2px group ">
        <button
          className="flex items-center gap-x-2 group"
          onClick={handleOpenModal}
        >
          <CiCirclePlus className="w-10 h-9 text-gray-400 font-light group-hover:text-gray-200 cursor-pointer" />
          <span className="font-customFontKR text-gray-400 group-hover:text-gray-200 cursor-pointer">
            할일 추가
          </span>
        </button>
      </div>
    </div>
  );
};
export default contactModal;
