import React from 'react'

const Board = ({ image, title, text}) => {
  return (
    <div>
        <img src={image} alt='' />
        <h4>{title}</h4>
        <hr/>
        <p>{text}</p>
    </div>
  )
}

export default Board