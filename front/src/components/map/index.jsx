import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import ReservationForm from '../reservation/ReservationForm';
import PageTitle from '../PageTitle';
import marker from '../../assets/image/marker.png';
import PostModal from '../inquiry/postModal';

function Map() {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeolocation();
  const [hospitals, setHospitals] = useState([]);
  const [hospitalMarkers, setHospitalMarkers] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isModalOpenR, setIsModalOpenR] = useState(false);
  const [isModalOpenI, setIsModalOpenI] = useState(false);
  const infoWindowRef = useRef(null);
  const mycenter = new naver.maps.LatLng(
    currentMyLocation.lat,
    currentMyLocation.lng
  );

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
    if (
      naver &&
      currentMyLocation.lat !== null &&
      currentMyLocation.lng !== null
    ) {
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
        icon: {
          url: `${marker}`,
          size: new naver.maps.Size(100, 115),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
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
            <div style="padding: 10px; border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;" class="info-box">
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
        // console.log(contentElement)

        // 콘텐츠 요소 내의 클릭 가능한 버튼이나 요소들에 대해 이벤트 리스너 추가
        const clickableElementsR =
          contentElement.querySelectorAll('.reserv-button'); // 클래스명이 'clickable'인 요소들
        const clickableElementsI =
          contentElement.querySelectorAll('.inquiry-button');

        clickableElementsR.forEach((element) => {
          element.addEventListener('click', function () {
            handleReservationClickR(hospital); // 클릭된 요소 출력
          });
        });
        clickableElementsI.forEach((element) => {
          element.addEventListener('click', function () {
            handleReservationClickI(hospital); // 클릭된 요소 출력
          });
        });

        return marker;
      });

      setHospitalMarkers(markers); // 마커 상태 저장

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

  const handleReservationClickR = (hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpenR(true);
  };
  const handleReservationClickI = (hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpenI(true);
  };

  const buttonsStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    padding: '5px',
  };

  const buttonStyle = {
    margin: '0 5px 5px 0',
    WebkitAppearance: 'button',
    cursor: 'pointer',
    color: '#555',
    padding: '2px 6px',
    background: '#fff',
    border: 'solid 1px #333',
    borderRadius: '5px',
    boxShadow: '2px 2px 1px 1px rgba(0, 0, 0, 0.5)',
  };

  const handleChange = (e) => {
    setAddress(e.target.value); // address 상태 업데이트
  };

  function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, res) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert('Something Wrong!');
        }
        const items = res.v2.addresses;
        if (items.length > 0) {
          const x = parseFloat(items[0].x);
          const y = parseFloat(items[0].y);
          setLat(y);
          setLng(x);
        } else {
          alert('주소를 찾을 수 없습니다.');
        }
      }
    );
  }

  return (
    <div className="container flex flex-col  justify-center  w-full mt-3">
      <PageTitle title="Map" className="p-7 w-[80%]" />
      <div
        id="map"
        className="w-full h-[600px] mb-10 rounded-lg"
        submodules={['geocoder']}
      >
        <form>
          <div style={buttonsStyle} className="border rounded-lg">
            <input
              type="text"
              placeholder="주소로 검색"
              onChange={handleChange}
              value={address} // 입력된 주소 상태에 따라 업데이트
            />
            <button
              style={buttonStyle}
              type="button"
              onClick={() => searchAddressToCoordinate(address)}
            >
              검색
            </button>
          </div>
        </form>
      </div>
      {isModalOpenR && selectedHospital && (
        <ReservationForm
          onClose={() => setIsModalOpenR(false)}
          hospitalId={selectedHospital.hosp_id} // 병원 ID 전달
          hospitalName={selectedHospital.hosp_name} // 병원 이름 전달
        />
      )}

      {isModalOpenI && selectedHospital && (
        <PostModal
          onClose={() => setIsModalOpenI(false)}
          setPosts={selectedHospital.hosp_name} // 병원 이름 전달
        />
      )}
    </div>
  );
}

export default Map;
