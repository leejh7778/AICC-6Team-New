import React, { useState } from 'react';
import { mainImage } from '../../constants/data';
import { SlArrowLeftCircle } from "react-icons/sl";
import { SlArrowRightCircle } from "react-icons/sl";

// 확인하면서 다시보자
function Slider({ slideIndex, moveToPrevSlide, moveToNextSlide }) {
    return (
        <div className='flex'>
            <button onClick={moveToPrevSlide}> <SlArrowLeftCircle /> </button>
            <img src={mainImage[slideIndex].image} alt="" className=' rounded-md  ' />
            <button onClick={moveToNextSlide}><SlArrowRightCircle /></button>
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
        <div className="flex flex-wrap justify-center">
           
           <Slider
                slideIndex={slideIndex}
                moveToPrevSlide={moveToPrevSlide}
                moveToNextSlide={moveToNextSlide}
            />
            
        </div>
    );
};

export default Mainsection;