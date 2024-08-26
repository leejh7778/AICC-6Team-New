import React, { useEffect, useRef } from 'react'

function Map(){
  const mapRef = useRef(null);
  const {naver} = window;
  
  



  
  useEffect(() => {
    const mapOptions = {
      center: new naver.maps.LatLng(37.48097121950012, 126.8794883707286),
      logoControl: false,
      mapDataControl: false,
      scaleControl: true,
      tileDuration:200,
      zoom:17,
      zoomControlOptions:{position:9},
    };
    mapRef.current = new naver.maps.Map(
      'map',
      mapOptions
    );
  },{});
  return(
    <div id='map' className='w-[80%] h-[500px]'/>
  )
}


export default Map

