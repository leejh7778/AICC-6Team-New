import React from 'react'
import { shopItem } from '../../constants/data'

const ShopList = () => {
  return (
    <div >
        {shopItem.map((item,idx) =>(
 <div key={idx} className='w-1/3 h-full'>
    <div className=''>
        <img src={item.image} alt="" className='w-[300px] h-[300px]' />
        <span>{item.price}</span>
    </div>
 </div>


        ))

        }
       
    </div>
  )
}

export default ShopList