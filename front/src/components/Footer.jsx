import React from 'react';
import { FaSquareFacebook, FaSquareXTwitter } from 'react-icons/fa6';
import { FaInstagramSquare } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className=" mt-5 border-t border-neutral-700 flex justify-center text-gray-700 ">
      <div className="w-[90%] h-8 px-5 flex justify-between items-center text-sm">
        <div>
          <a href="#">
            <span className="font-semibold font-Kr"> 해피펫 </span>
            <span className="font-En">Email : support@happypet.com</span>
          </a>
        </div>
        <div className="flex gap-x-5 text-xl">
          <a href="#">
            <FaSquareFacebook />
          </a>
          <a href="#">
            <FaInstagramSquare />
          </a>
          <a href="#">
          <FaSquareXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};
// w-full flex mt-0 justify-center  text-gray-700 text-center p-4 bottom-0 left-0 flex-grow

export default Footer;
