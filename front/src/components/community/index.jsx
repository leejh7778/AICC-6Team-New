import React from 'react'
import PageTitle from '../PageTitle'
import BoardList from './BoardList'


const Community = () => {
  return (
    <div className='container'>
      <PageTitle title="Community" className="p-7"/>
      <div className='bg-white w-full h-[68.6vh] rounded-lg shadow-[#7b9e84d1]  '>
  
  <BoardList/>
        
        
        </div>
      
    </div>
      )
}

export default Community

// #f4f9f7