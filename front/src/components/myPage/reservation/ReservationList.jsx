import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ReservationList = () => {
const [reservationList, setReservationList] = useState([])
    const getReservationList = async() => {
const resp = (await axios.get('http://localhost:8080/reservations')).data
setReservationList(resp.data)
console.log(reservationList)
    }
    useEffect(()=> {
        getReservationList();
    },[])


  return (
    <div>ReservationList</div>
  )
}

export default ReservationList