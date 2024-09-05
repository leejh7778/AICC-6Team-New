import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import ReservModal from './ReservModal';
import PageTitle from '../PageTitle';
import marker from '../../assets/image/marker.png';
import PostModal from '../inquiry/postModal';

function Map() {
  const mapRef = useRef(null);
  const { naver } = window;
  const { currentMyLocation } = useGeolocation();
  const [hospitals, setHospitals] = useState([]);
  const [hospitalMarkers, setHospitalMarkers] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]); // 현재 지도 화면에 있는 병원 목록
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isModalOpenR, setIsModalOpenR] = useState(false);
  const [isModalOpenI, setIsModalOpenI] = useState(false);
  const infoWindowRef = useRef(null);
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // 병원 데이터를 가져오는 함수
  const fetchHospitals = async () => {
    try {
      const res = await fetch('http://localhost:8080/hospitals');
      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await res.json();
      setHospitals(data);
    } catch (err) {
      console.error('Error fetching hospital data:', err);
      alert('병원 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    fetchHospitals(); // 병원 데이터 가져오기
  }, []);

  // 병원 필터링 함수: 지도의 현재 영역 안에 있는 병원만 반환
  const filterHospitalsByMapBounds = () => {
    if (mapRef.current && hospitals.length > 0) {
      const mapBounds = mapRef.current.getBounds(); // 현재 지도 영역
      const visibleHospitals = hospitals.filter((hospital) => {
        const latlng = new naver.maps.LatLng(hospital.hosp_y, hospital.hosp_x);
        return mapBounds.hasLatLng(latlng); // 병원이 현재 지도 범위에 있는지 확인
      });
      setFilteredHospitals(visibleHospitals); // 지도에 보이는 병원들만 필터링하여 상태 업데이트
    }
  };

  useEffect(() => {
    if (
      naver &&
      currentMyLocation.lat !== null &&
      currentMyLocation.lng !== null
    ) {
      const initialLat = lat !== null ? lat : currentMyLocation.lat;
      const initialLng = lng !== null ? lng : currentMyLocation.lng;
      const mapOptions = {
        center: new naver.maps.LatLng(initialLat, initialLng), // 수정된 지도 중심 좌표
        logoControl: false,
        mapDataControl: false,
        scaleControl: true,
        tileDuration: 200,
        zoom: 14,
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
        title: '멍냐옹',
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
          key: hospital.hosp_id,
          position: latlng,
          map: mapRef.current,
          title: hospital.hosp_name,
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: `
            <div style="
              padding: 15px;
              border-radius: 12px;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px;
              background-color: #ffffff;
              font-family: 'Noto Sans KR', sans-serif;
              max-width: 300px;
              position: relative;
            " class="info-box">
              <div style="
                font-weight: 700;
                font-size: 16px;
                margin-bottom: 8px;
                color: #333;
              ">
                ${hospital.hosp_name}
              </div>
              <div style="
                font-size: 14px;
                color: #666;
                margin-bottom: 5px;
              ">
                ${hospital.hosp_add} ${hospital.hosp_post}
              </div>
              <div style="
                font-size: 14px;
                color: #666;
                margin-bottom: 15px;
              ">
                ${hospital.hosp_pn}
              </div>
              <div style="
                display: flex;
                justify-content: flex-end;
                gap: 10px; /* 버튼 간 간격 */
                margin-top: 10px;
              ">
                <button class="reserv-button" style="
                  padding: 8px 12px;
                  background-color: #4A90E2;
                  color: white;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  font-size: 14px;
                  font-weight: 600;
                  transition: background-color 0.3s ease;
                ">
                  예약하기
                </button>
                <button class="inquiry-button" style="
                  padding: 8px 12px;
                  background-color: #e0e0e0;
                  color: #333;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  font-size: 14px;
                  font-weight: 600;
                  transition: background-color 0.3s ease;
                ">
                  1대1 문의
                </button>
              </div>
            </div>`,
          maxWidth: 300,
          anchorSize: { width: 12, height: 14 },
          borderColor: '#cecdc7',
        });

        naver.maps.Event.addListener(marker, 'click', function () {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(mapRef.current, marker);
          }
        });

        infoWindowRef.current = infoWindow;

        const contentElement = infoWindowRef.current.getContentElement();

        const clickableElementsR =
          contentElement.querySelectorAll('.reserv-button');
        const clickableElementsI =
          contentElement.querySelectorAll('.inquiry-button');

        clickableElementsR.forEach((element) => {
          element.addEventListener('click', function () {
            handleReservationClickR(hospital);
          });
        });
        clickableElementsI.forEach((element) => {
          element.addEventListener('click', function () {
            handleReservationClickI(hospital);
          });
        });

        return marker;
      });
      setHospitalMarkers(markers);

      // 지도 변경 시 마커 필터링 처리
      const handleMapUpdates = () => {
        filterHospitalsByMapBounds(); // 지도가 변경될 때마다 병원 필터링
        checkForMarkersRendering(mapRef.current, markers);
      };
      naver.maps.Event.addListener(
        mapRef.current,
        'bounds_changed',
        handleMapUpdates
      );
      naver.maps.Event.addListener(
        mapRef.current,
        'zoom_changed',
        handleMapUpdates
      );
      naver.maps.Event.addListener(mapRef.current, 'dragend', handleMapUpdates);

      // 초기 렌더링 시 병원 필터링
      filterHospitalsByMapBounds();
    } else if (!naver) {
      alert('Naver Maps API를 불러오지 못했습니다.');
    } else {
      alert('현재 위치 정보를 가져오는 데 실패했습니다.');
    }
  }, [naver, currentMyLocation, hospitals, lat, lng]);

  const token = localStorage.getItem('token');
  const handleReservationClickR = (hospital) => {
    if (token) {
      setSelectedHospital(hospital);
      setIsModalOpenR(true);
    } else {
      alert('로그인');
    }
  };

  const handleReservationClickI = (hospital) => {
    if (token) {
      setSelectedHospital(hospital);
      setIsModalOpenI(true);
    } else {
      alert('로그인');
    }
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
    e.preventDefault();
    setAddress(e.target.value); // address 상태 업데이트
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (!address) {
      alert('주소를 입력해주세요');
      return;
    }
    searchAddressToCoordinate(address);
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

          // 검색할 때마다 지도 중심을 설정
          const newCenter = new naver.maps.LatLng(y, x);
          mapRef.current.setCenter(newCenter); // 지도 중심을 해당 좌표로 이동
        } else {
          alert('주소를 찾을 수 없습니다.');
        }
      }
    );
  }

  return (
    <div className="container flex flex-col  justify-center  w-full mt-3">
      <PageTitle title="Map" className="p-7 w-[80%]" />
      <div id="nomap" className="flex">
        <div
          id="map"
          className="w-[80%] h-[600px] mb-10 rounded-lg"
          submodules={['geocoder']}
        >
          <form>
            <div style={buttonsStyle}>
              <input
                type="text"
                placeholder="주소로 검색"
                onChange={handleChange}
                value={address} // 입력된 주소 상태에 따라 업데이트
                className="border rounded-l-lg "
              />
              <button
                style={buttonStyle}
                type="submit"
                onClick={handleSearchClick} // handleSearchClick 함수 호출
              >
                검색
              </button>
            </div>
          </form>
        </div>
        {isModalOpenR && selectedHospital && (
          <ReservModal
            onClose={() => setIsModalOpenR(false)}
            hospitalId={selectedHospital.hosp_id}
            hospitalName={selectedHospital.hosp_name}
            hospitalPn={selectedHospital.hosp_pn}
          />
        )}
        {isModalOpenI && selectedHospital && (
          <PostModal
            onClose={() => setIsModalOpenI(false)}
            setPosts={selectedHospital.hosp_name}
            hospitalName={selectedHospital.hosp_name}
            hospitalPn={selectedHospital.hosp_pn}
          />
        )}
        <div className="scroll-smooth overflow-y-auto h-[600px] font-Aa">
          <ul>
            {filteredHospitals.map((hospital) => (
              <li
                key={hospital.hosp_id}
                className="p-2 border-b cursor-pointer"
                onClick={() => {
                  const marker = hospitalMarkers.find(
                    (marker) => marker.getTitle() === hospital.hosp_name
                  );
                  if (marker) {
                    naver.maps.Event.trigger(marker, 'click');
                    mapRef.current.setCenter(marker.getPosition());
                  }
                }}
              >
                <div className="font-bold">{hospital.hosp_name}</div>
                <div className="text-sm">
                  {hospital.hosp_add} {hospital.hosp_post}
                </div>
                <div className="text-sm">전화번호: {hospital.hosp_pn}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Map;
