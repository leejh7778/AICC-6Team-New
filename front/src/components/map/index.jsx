import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';


function Map() {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeolocation();
  const [hospitals, setHospitals] = useState([]);
  const [hospitalMarkers, setHospitalMarkers] = useState([]);

  useEffect(() => {
    // 병원 데이터 가져오기
    fetch('http://localhost:8080/hospitals')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok.');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched hospital data:', data);
        setHospitals(data);
      })
      .catch((err) => console.error('Error fetching hospital data:', err));
  }, []);

  useEffect(() => {
    if (currentMyLocation.lat !== null && currentMyLocation.lng !== null) {
   
      const mapOptions = {
        center: new naver.maps.LatLng(
          currentMyLocation.lat,
          currentMyLocation.lng
        ),
        logoControl: false,
        mapDataControl: false,
        scaleControl: true,
        tileDuration: 200,
        zoom: 16,
        minZoom:13,
        zoomControl: true,
        zoomControlOptions: { position: 9 },
      };
      mapRef.current = new naver.maps.Map('map', mapOptions);

      // 현재 위치 마커 추가
      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          currentMyLocation.lat,
          currentMyLocation.lng
        ),
        map: mapRef.current,
        title: '현재 위치',
      });

      // 병원 마커 추가
      const markers = hospitals.map((hospital) => {
        const latlng = new naver.maps.LatLng(hospital.hosp_y, hospital.hosp_x);
        const marker = new naver.maps.Marker({
          position: latlng,
          map: null, // 처음에는 모든 마커를 숨겨둠
          title: hospital.hosp_name,
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: `
            <div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">
              <div style="font-weight: bold; margin-bottom: 5px;">${hospital.hosp_name}</div>
              <div style="font-size: 13px;">${hospital.hosp_add}</div>
            </div>`,
          maxWidth: 300,
          anchorSize: { width: 12, height: 14 },
          borderColor: '#cecdc7',
        });

        // 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, 'click', function () {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(mapRef.current, marker);
          }
        });

        return marker;
      });

      setHospitalMarkers(markers); // 마커 상태 저장

      // 초기 마커 렌더링
      // checkForMarkersRendering(mapRef.current, markers);

      // 지도 줌 및 드래그 이벤트 핸들러 - 화면 내 마커만 업데이트
      const handleMapUpdates = () => {
        checkForMarkersRendering(mapRef.current, markers);
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
  }, [currentMyLocation, hospitals]);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-3">
      <div id="map" className="w-[80%] h-[600px] mb-10" />
     
    </div>
  );
}

export default Map;
