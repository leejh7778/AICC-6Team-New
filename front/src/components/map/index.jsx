import React, { useEffect, useRef } from 'react'
import useGeoloaction from '../../hooks/useGeolocation';

function Map(){
  const mapRef = useRef(null);
  const {naver} = window;
  const {currentMyLocation} = useGeoloaction();
  
  useEffect(() => {
    if (currentMyLocation.lat !== 0 && currentMyLocation.lng !== 0 ) {
      // 네이버 지도 옵션 선택
      const mapOptions = {
        center: new naver.maps.LatLng(37.48097121950012, 126.8794883707286),
        logoControl: false,
        mapDataControl: false,
        scaleControl: true,
        tileDuration:200,
        zoom:14,
        zoomControlOptions:{position:1},
      };
      mapRef.current = new naver.maps.Map(
        'map',
        mapOptions
      );
//마커 리스트와 정보창 리스트 선언
const markers = [];
const infoWindows= [];


      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),
        map: mapRef.current,
      });
      const infoWindow = new naver.maps.InfoWindow({
        
        content:[
          '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
          `   <div style="font-weight: bold; margin-bottom: 5px;">여기는 제목</div>`,
          `   <div style="font-size: 13px;">여기는 내용<div>`,
          "</div>",
        ].join(""),
        maxWidth: 300,
        anchorSize: {
          width: 12,
          height: 14,
        },
        borderColor: "#cecdc7",
      })
      naver.maps.Event.addListener(marker,"click",()=>{
        if (infoWindow.getMap()){
          infoWindow.close();
        } else if (mapRef.current !== null){
          infoWindow.open(mapRef.current, marker)
        }
      })
    }
  },[currentMyLocation]);
  return(
    <div id='map' className='w-[80%] h-[500px]'/>
  )
}


export default Map

