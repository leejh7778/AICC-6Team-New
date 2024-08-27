import React from 'react'
import axios from "axios";


const BoardList = () => {
  const getBoardList = async () => {
    const resp = (await axios.get('//엔드포인트')).data
    console.log(resp.data) //위는 데이터 확인용
  }





  return (
    <div>BoardList</div>
  )
}

export default BoardList