import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import ReservModal from './ReservModal';
import PageTitle from '../PageTitle';
import marker from '../../assets/image/marker.png';
import PostModal from './PostModal';

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
                 ${hospital.hosp_pn ? hospital.hosp_pn : ''}
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

  const styles = {
    searchForm: {
      position: 'absolute', // 지도 위에 검색창이 표시되도록 절대 위치 설정
      top: '10px', // 위에서 20px 아래에 배치
      left: '50%',
      transform: 'translateX(-50%)', // 가로 방향 가운데 정렬
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: '6px', // 위아래 padding 값을 줄여 높이 조절
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // 그림자 효과
      zIndex: 1000, // 지도 위에 표시되도록 z-index 설정
    },
    searchInput: {
      padding: '6px', // 위아래 padding 값을 줄여 입력 필드 높이 조절
      fontSize: '14px', // 텍스트 크기를 약간 줄임
      borderRadius: '8px 0 0 8px',
      border: '1px solid #ccc',
      outline: 'none',
      width: '250px', // 입력 필드 너비 조정
    },
    searchButton: {
      padding: '6px 12px', // 위아래 padding 값을 줄여 버튼 높이 조절
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '0 8px 8px 0',
      cursor: 'pointer',
      fontSize: '14px',
    },
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
          <form style={styles.searchForm}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="주소로 검색"
                onChange={handleChange}
                value={address}
                style={styles.searchInput}
                className="search-input" // className 유지
              />
              <button
                type="submit"
                onClick={handleSearchClick}
                style={styles.searchButton}
                className="search-button" // className 유지
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
            hospitalName={selectedHospital.hosp_name}
            hospitalPn={selectedHospital.hosp_pn}
          />
        )}
        <div className="scroll-smooth overflow-y-auto w-[30%] h-[600px]">
          <div className="w-full font-Aa flex justify-center items-center border rounded-lg bg-gray-300">
            주변 병원 리스트
          </div>
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
