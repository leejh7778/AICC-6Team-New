import React from 'react'
import dall1 from '../../assets/newimage/DALL1.webp'
import dall2 from '../../assets/newimage/DALL2.webp'



const Subsection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20 gap-10">
      <div className='my-10 rounded-lg'>
      <h2 className="text-3xl lg:text-6xl sm:text-5xl font-En tracking-tighter bg-gradient-to-l from-green-400 to bg-green-800 text-transparent bg-clip-text  font-semibold text-center ">For your pet's health</h2>
      <br/>
      <h2 className="text-3xl lg:text-6xl sm:text-5xl font-En tracking-tighter bg-gradient-to-r from-green-400 to bg-green-800 text-transparent bg-clip-text  font-semibold text-center ">and</h2>
      <br/>
<h2 className='text-3xl lg:text-6xl sm:text-5xl font-En tracking-tighter bg-gradient-to-l from-green-400 to bg-green-800 text-transparent bg-clip-text  font-semibold text-center' > happiness</h2>
      <br/>
       <h2 className="text-3xl lg:text-6xl sm:text-5xl font-En tracking-tighter bg-gradient-to-r from-green-400 to bg-green-800 text-transparent bg-clip-text  font-semibold text-center ">The best choice</h2>
      </div>
      
      <img src={dall1} alt="" className='img w-3/4 rounded-lg' />


<p className="w-4/5 text-center text-green-700 max-w-4xl lg:text-lg mb:text-md font-Kr py-20">
  저희 동물병원은 사랑하는 반려동물의 건강을 책임지며, 최상의 의료 서비스를 제공하는 것을 목표로 하고 있습니다. 최신 의료 장비와 풍부한 경험을 갖춘 의료진이 여러분의 반려동물을 안전하고 정성껏 돌보겠습니다.

내과, 외과, 치과 진료는 물론, 정기 건강검진과 예방접종, 영양 상담 등 다양한 진료 서비스를 제공합니다. 또한, 반려동물이 편안함을 느낄 수 있는 친절하고 따뜻한 환경을 조성하여, 보호자분들께 신뢰와 안심을 드립니다.

반려동물의 건강 관리뿐만 아니라, 보호자분들과의 소통도 중요시합니다. 정기적인 건강 상담과 교육을 통해 반려동물의 건강한 삶을 함께 만들어 가고자 합니다.

사랑하는 반려동물의 건강, 저희 병원과 함께 지켜주세요. 언제든지 문의해 주시면 친절히 안내해 드리겠습니다.

반려동물의 행복이 곧 우리의 행복입니다.
</p>
  <img src={dall2} alt="" className='img w-3/4 rounded-lg' />
<h1 className=' text-green-800 text-4xl font-Kr py-20'>
사랑을 넘은 생명:
<span className='bg-gradient-to-l from-green-400 to bg-green-800 text-transparent bg-clip-text'> 반려동물과 함께하는 세상</span>
</h1>
    </div>
  )
}
// bg-gradient-to-r from-green-500 to bg-green-800 text-transparent bg-clip-text
export default Subsection