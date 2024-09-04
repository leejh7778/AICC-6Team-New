import React from 'react'
import { subCommuData } from '../../constants/data'
import { Link } from 'react-router-dom'



const BoardList = () => {

  return (
<div className=''>
  <ul>
  {
    subCommuData.map((item, idx) =>(
      <li  key={idx}>
        <Link to={`/community/${idx}`}>
      <div className='block m-3 cursor-pointer  '>
   
       <div className=' flex bg-[#f1f3ea] py-5 rounded-lg '>

        
       <div className='px-5'>
        <img src={item.image} alt="" className='rounded-lg' />
       </div>
      <div className='px-3 font-Kr'>
        <h3 className='font-bold text-lg'>{item.title}</h3>
        <br/>
        <p className='text-sm'>{item.subtitle}</p>
      </div>
      </div>
      </div>
      </Link>
      </li>
    ))
  }
  </ul>
</div>
  )
}

export default BoardList