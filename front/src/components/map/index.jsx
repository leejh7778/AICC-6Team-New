import React, { useEffect, useRef } from 'react';
import useGeoloaction from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import Search from './Search';

function Map() {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeoloaction();

  useEffect(() => {
    if (currentMyLocation.lat !== null && currentMyLocation.lng !== null) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.48097121950012, 126.8794883707286),
        logoControl: false,
        mapDataControl: false,
        scaleControl: true,
        tileDuration: 200,
        zoom: 14,
   
      };
      mapRef.current = new naver.maps.Map('map', mapOptions);
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          currentMyLocation.lat,
          currentMyLocation.lng
        ),
        map: mapRef.current,
      });
      const infoWindow = new naver.maps.InfoWindow({
        content: [
          '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
          `   <div style="font-weight: bold; margin-bottom: 5px;">여기는 제목</div>`,
          `   <div style="font-size: 13px;">여기는 내용<div>`,
          '</div>',
        ].join(''),
        maxWidth: 300,
        anchorSize: {
          width: 12,
          height: 14,
        },
        borderColor: '#cecdc7',
      });
      naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else if (mapRef.current !== null) {
          infoWindow.open(mapRef.current, marker);
        }
      });

      // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
      naver.maps.Event.addListener(mapRef.current, 'zoom_changed', () => {
        if (mapRef.current !== null) {
          checkForMarkersRendering(mapRef.current, marker);
        }
      });

      // 지도 드래그 시 마커 업데이트 이벤트 핸들러
      naver.maps.Event.addListener(mapRef.current, 'dragend', () => {
        if (mapRef.current !== null) {
          checkForMarkersRendering(mapRef.current, marker);
        }
      });
    } else {
      alert('오류');
    }
  }, [currentMyLocation]);

  return (
    <div className='flex flex-col items-center justify-center w-full mt-3'>
        <div id="map" className="w-[80%] h-[600px] mb-10" />
        <Search/>
    </div>
  );
}

export default Map;
