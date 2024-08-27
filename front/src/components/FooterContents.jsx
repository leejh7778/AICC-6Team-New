import React from 'react'
import { footers } from '../constants/data'
const FooterContents = () => {
    
  return (
    <div className="flex flex-wrap justify-center">
        {
            footers.map((item, idx)=>(
                <div className="flex justify-between w-1/3 px-4 py-2 ">
                     <div className="  rounded-md p-6 text-md font-Kr">
                <div key={idx} className=''>
                    <h4 className='font-bold'>{item.title}</h4>
                    <p>{item.text1}</p>
                    <p>{item.text2}</p>
                    <p>{item.text3}</p>

                </div>
                </div>
                </div>
            ))
        }
    </div>

  )
}

export default FooterContents