import React, { useEffect, useState } from 'react';
import { mainImage } from '../../constants/data';
import { SlArrowLeft,SlArrowRight } from "react-icons/sl";
import DallMain from '../../assets/image/DallMain.webp'
import { Link } from 'react-router-dom'
import { FaRegArrowAltCircleDown } from "react-icons/fa";

// 확인하면서 다시보자
function Slider({ slideIndex, moveToPrevSlide, moveToNextSlide }) {
    return (
        <div className='flex'>
            {/* <button onClick={moveToPrevSlide}> <SlArrowLeft /> </button> */}
            <img src={mainImage[slideIndex].image} alt="" className=' rounded-md  ' onClick={moveToNextSlide} />
            {/* <button onClick={moveToNextSlide}><SlArrowRight /></button> */}
        </div>
    );
}




const Mainsection = () => {
    const [slideIndex, setSlideIndex] = useState(0);

    const moveToPrevSlide = () => {
        if (slideIndex !== 0) {
            setSlideIndex((prev) => prev - 1);
        } else {
            setSlideIndex(mainImage.length - 1);
        }
    };

    const moveToNextSlide = () => {
        if (slideIndex !== mainImage.length - 1) {
            setSlideIndex((prev) => prev + 1);
        } else {
            setSlideIndex(0);
        }
    };

    return (
    <div className='w-full flex flex-col items-center justify-center bg-[#f4f9f7] rounded-lg py-10 '>
     <div className=" w-[80%]  flex items-center justify-center h-[400px]">
      <div className='flex justify-center items-center '>
       <Link to="/community">
         <img src={DallMain} alt="" />
        </Link>
       </div>
        <Slider slideIndex={slideIndex} moveToPrevSlide={moveToPrevSlide} moveToNextSlide={moveToNextSlide}/>  
     </div>
    </div>
    );
};

export default Mainsection;