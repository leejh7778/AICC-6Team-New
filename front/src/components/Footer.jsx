import React from 'react';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
const Footer = () => {
  
  
  return (
    <footer className=" mt-5 border-t border-neutral-700 flex justify-center">
    <div className='w-[90%] h-8 px-5 flex justify-between items-center text-sm'>
<div>
<a href="#">
  <span className='font-semibold font-Kr'>파트라슈 </span>
  <span className='font-En'>Email : contact@patrasya.com</span>
  </a>
</div>
<div className='flex gap-x-5 text-xl'>
  <a href="#"><FaSquareFacebook /></a>
  <a href="#"><FaInstagramSquare /></a>
 
</div>
    </div>
    </footer>
  )





 
};

export default Footer;