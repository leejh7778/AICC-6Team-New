import React, { useEffect, useState } from 'react';
import { mainImage } from '../../constants/data';
import { SlArrowLeft,SlArrowRight } from "react-icons/sl";
import DallMain from '../../assets/image/DallMain.webp'
import { Link } from 'react-router-dom'
import { FaRegArrowAltCircleDown } from "react-icons/fa";

// 확인하면서 다시보자
function Slider({ slideIndex, moveToPrevSlide, moveToNextSlide }) {
    return (
        <div>
            <img src={mainImage[slideIndex].image} alt="" className=' rounded-md cursor-pointer  ' onClick={moveToNextSlide} />
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
    <div className='w-full flex flex-col items-center justify-center rounded-lg py-5 '>
        <div className='mb-10 mb:text-3xl lg:text-4xl'>
     <p className='font-En font-semibold bg-gradient-to-r from-green-500 to bg-green-800 text-transparent bg-clip-text'>
            Click <span className='bg-gradient-to-r from-green-500 to bg-green-800 text-transparent bg-clip-text'>
                 for your 
            </span> Family
        </p>
     </div>
     <div className=" w-[80%]  flex flex-col items-center justify-center">
            <div className='flex justify-center items-center gap-x-10 h-4/5'>
        <Slider slideIndex={slideIndex} moveToPrevSlide={moveToPrevSlide} moveToNextSlide={moveToNextSlide}/> 
        <Link to="/community">
         <img src={DallMain} alt="DallMain"  className='rounded-lg '/>
        </Link>
     
             </div>
   
        
     </div>
    </div>
    );
};

export default Mainsection;