import React from 'react'
import PageTitle from '../PageTitle'
import ShopList from './ShopList'

const Shop = () => {
  return (
    <div className='container h-[70vh]'>
        <PageTitle title="Shop" className="px-7"/>
        <div className='bg-white w-full h-[68.6vh] rounded-lg shadow-[#7b9e84d1] '>
  <ShopList/>

        </div>
    </div>
  )
}

export default Shop