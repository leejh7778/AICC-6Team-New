import React, { useState } from 'react';
import ReservationForm from './ReservationForm';

function App() {
  const [reservations, setReservations] = useState([]);

  const handleSaveReservation = (newReservation) => {
    setReservations((prevReservations) => [
      ...prevReservations,
      newReservation,
    ]);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center mt-8">예약 관리 시스템</h1>
      <ReservationForm onSave={handleSaveReservation} />

      <div className="max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">예약 목록</h2>
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="p-4 bg-gray-100 rounded shadow">
              <p>
                <strong>이름:</strong> {reservation.name}
              </p>
              <p>
                <strong>이메일:</strong> {reservation.email}
              </p>
              <p>
                <strong>날짜:</strong> {reservation.date}
              </p>
              <p>
                <strong>시간:</strong> {reservation.time}
              </p>
              <p>
                <strong>메모:</strong> {reservation.notes}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
