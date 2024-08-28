import React from 'react'
import PageTitle from '../PageTitle'

const Board = ({ image, title, text}) => {
  return (
    <div className='container '>
      <PageTitle title="Community" className="py-4"/>
      <h2 className='font-Kr font-bold text-lg mb-5'>{title}</h2>
      <div className='flex flex-col items-center bg-[#f4f9f7] py-5 rounded-lg px-5'>
     
        
        <img src={image} alt='' className='mb-10' />
        
        <p className='font-Kr text-lg'>{text}</p>
      </div>
    
    </div>
  )
}

export default Board