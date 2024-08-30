import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import ReservationForm from '../reservation/Modal';

function Map() {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeolocation();
  const [hospitals, setHospitals] = useState([]);
  const [hospitalMarkers, setHospitalMarkers] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const infoWindowRef = useRef(null);

  // 병원 데이터를 가져오는 함수
  const fetchHospitals = async () => {
    try {
      const res = await fetch('http://localhost:8080/hospitals');
      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await res.json();
      // console.log('Fetched hospital data:', data);
      setHospitals(data);
    } catch (err) {
      console.error('Error fetching hospital data:', err);
      alert('병원 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    fetchHospitals(); // 병원 데이터 가져오기
  }, []);

  useEffect(() => {
    if (naver && currentMyLocation.lat !== null && currentMyLocation.lng !== null) {
      const mapOptions = {
        center: new naver.maps.LatLng(
          currentMyLocation.lat,
          currentMyLocation.lng
        ),
        logoControl: false,
        mapDataControl: false,
        scaleControl: true,
        tileDuration: 200,
        zoom: 14,
        // minZoom: 13,
        zoomControl: true,
        zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
      };
      mapRef.current = new naver.maps.Map('map', mapOptions);

      // 현재 위치 마커 추가
      new naver.maps.Marker({
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
          key: hospital.hosp_id, // 고유한 key 추가
          position: latlng,
          map: null, // 처음에는 모든 마커를 숨겨둠
          title: hospital.hosp_name,
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: `
            <div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;" class="info-box">
              <div style="font-weight: bold; margin-bottom: 5px;">${hospital.hosp_name}</div>
              <div style="font-size: 13px;">${hospital.hosp_add} ${hospital.hosp_post}</div>
              <div style="font-size: 13px;">${hospital.hosp_pn}</div>
              <button class="reserv-button">예약하기</button>
              <button class="inquiry-button">1대1 문의</button>
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
        
        infoWindowRef.current = infoWindow;

      const contentElement = infoWindowRef.current.getContentElement();
      console.log(contentElement)

         // 콘텐츠 요소 내의 클릭 가능한 버튼이나 요소들에 대해 이벤트 리스너 추가 
      const clickableElements = contentElement.querySelectorAll('.reserv-button'); // 클래스명이 'clickable'인 요소들
      console.log(clickableElements)

      clickableElements.forEach(element => {
        element.addEventListener('click', function() {
          handleReservationClick(hospital); // 클릭된 요소 출력
        });
      });


        return marker;
      });

      setHospitalMarkers(markers); // 마커 상태 저장

      

      // clickableElements.forEach(element => {
      //   element.addEventListener('click', function() {
      //     console.log(this); // 클릭된 요소 출력
      //   });
      // });

      // // 예시로 'reserve-btn'이라는 ID를 가진 요소에 이벤트 리스너 추가
      // const reserveBtn = contentElement.querySelector('.reserv-button');
      // if (reserveBtn) {
      //   reserveBtn.addEventListener('click', function() {
      //     console.log('Reserve button clicked!');
      //   });
      // }

      

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
    } else if (!naver) {
      alert('Naver Maps API를 불러오지 못했습니다.');
    } else {
      alert('현재 위치 정보를 가져오는 데 실패했습니다.');
    }
  }, [naver, currentMyLocation, hospitals]);

  const handleReservationClick = (hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-3">
      <div id="map" className="w-[80%] h-[600px] mb-10" />
      {isModalOpen && selectedHospital && (
        <ReservationForm
          onClose={() => setIsModalOpen(false)}
          hospitalId={selectedHospital.hosp_id} // 병원 ID 전달
          hospitalName={selectedHospital.hosp_name} // 병원 이름 전달
        />
      )}
    </div>
  );
}

export default Map;

