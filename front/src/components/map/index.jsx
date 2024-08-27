import React, { useEffect, useRef } from 'react'
import useGeoloaction from '../../hooks/useGeolocation';

function Map(){
  const mapRef = useRef(null);
  const {naver} = window;
  const {currentMyLocation} = useGeoloaction();
  
  useEffect(() => {
    if (currentMyLocation.lat !== 0 && currentMyLocation.lng !== 0 ) {
      
      const mapOptions = {
        center: new naver.maps.LatLng(37.48097121950012, 126.8794883707286),
        logoControl: false,
        mapDataControl: false,
        scaleControl: true,
        tileDuration:200,
        zoom:14,
        zoomControlOptions:{position:9},
      };
      mapRef.current = new naver.maps.Map(
        'map',
        mapOptions
      );
      new naver.maps.Marker({
        position: new naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),
        map: mapRef.current,
      });
    }
  },[currentMyLocation]);
  return(
    <div id='map' className='w-[80%] h-[500px]'/>
  )
}


export default Map

