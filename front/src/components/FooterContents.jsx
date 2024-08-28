import React from 'react'
import { footers } from '../constants/data'
const FooterContents = () => {
    
  return (
    <div className="w-full flex justify-center">
        {
            footers.map((item, idx)=>(
                <div className=" px-4 py-2 ">
                     <div className="  rounded-md p-6 font-Kr">
                <div key={idx} className='flex justify-between'>
                  <div className='py-5 px-5'>
                  <h5 className='font-bold text-sm'>{item.title}</h5>
                  </div>
                  <div className='text-xs'>
                  <p>{item.text1}</p>
                    <p>{item.text2}</p>
                    <p>{item.text3}</p>
                  </div>
              

                </div>
                </div>
                </div>
            ))
        }
    </div>

  )
}

export default FooterContents