import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ReservationList = () => {
    const userid = localStorage.getItem('userid');
    const [reservationList, setReservationList] = useState([]);

    useEffect(() => {
        const getReservationList = async () => {
            try {
                const resp = await axios.get(`http://localhost:8080/reservations/${userid}`);
                setReservationList(resp.data);
            } catch (error) {
                console.error('예약 목록을 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        getReservationList();
    }, [userid]);

    return (
        <div>
            <h1>예약 목록</h1>
            <ul>
                {reservationList.map((reservation, index) => (
                    <li key={index}>{reservation.name} - {reservation.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default ReservationList;
