import React from 'react'
import PageTitle from '../PageTitle'
import BoardList from './BoardList'


const Community = () => {
  return (
    <div className='container'>
      <PageTitle title="Community"/>
      <div className='bg-[#7b9e84d1] w-full h-[73.6vh] rounded-lg shadow-[#7b9e84d1]  '>
  
  <BoardList/>
        
        
        </div>
      
    </div>
      )
}

export default Community