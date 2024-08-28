import React, { useEffect, useRef, useState } from 'react';
import useGeoloaction from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import Search from './Search';


function Map() {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeoloaction();
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch('/hospitals')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok.');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched hospital data:', data); // 데이터 확인
        setHospitals(data);
      })
      .catch((err) => console.error('Error fetching hospital data:', err));
  }, []);

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

      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          currentMyLocation.lat,
          currentMyLocation.lng
        ),
        map: mapRef.current,
        title: '현재 위치',
      });

      const hospitalMarkers = hospitals
        .map((hospital) => {
          try {
            const hospitalMarker = new naver.maps.Marker({
              position: new naver.maps.LatLng(hospital.hosp_y, hospital.hosp_x), // 변환된 좌표 사용
              map: mapRef.current,
              title: hospital.hosp_name,
            });

            const infoWindow = new naver.maps.InfoWindow({
              content: [
                '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
                `<div style="font-weight: bold; margin-bottom: 5px;">${hospital.hosp_name}</div>`,
                `<div style="font-size: 13px;">${hospital.hosp_add}</div>`,
                '</div>',
              ].join(''),
              maxWidth: 300,
              anchorSize: {
                width: 12,
                height: 14,
              },
              borderColor: '#cecdc7',
            });

            naver.maps.Event.addListener(hospitalMarker, 'click', () => {
              if (infoWindow.getMap()) {
                infoWindow.close();
              } else {
                infoWindow.open(mapRef.current, hospitalMarker);
              }
            });

            return hospitalMarker;
          } catch (error) {
            console.error('Error with hospital marker:', error);
            return null;
          }
        })
        .filter((marker) => marker !== null);

      // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
      const handleMapUpdates = () => {
        if (mapRef.current) {
          checkForMarkersRendering(mapRef.current, currentMarker);
          hospitalMarkers.forEach((marker) => {
            checkForMarkersRendering(mapRef.current, marker);
          });
        }
      };

      naver.maps.Event.addListener(
        mapRef.current,
        'zoom_changed',
        handleMapUpdates
      );
      naver.maps.Event.addListener(mapRef.current, 'dragend', handleMapUpdates);
    } else {
      alert('현재 위치 정보를 가져오는 데 실패했습니다.');
    }
  }, [currentMyLocation]);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-3">
      <div id="map" className="w-[80%] h-[600px] mb-10" />
      <Search />
    </div>
  );
}

export default Map;
