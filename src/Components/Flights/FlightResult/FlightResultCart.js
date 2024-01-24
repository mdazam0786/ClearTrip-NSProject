import React, { useEffect } from 'react';

export default function FlightResultCart(props) {
  useEffect(() => {
    console.log(props.name);
    console.log(props.rating);
    console.log(props.image);
  })
    return (
    <div className='main-box'>
      <div className='flight-result-card'>
        <div className='flight-result-card-image'>
          <img src={props.image} alt='flight-result-card-image' />
         
        </div>
        <div className='flight-result-card-content'>
          <h3 className='flight-result-card-name'>{props.name}</h3>
          <h4 className='flight-result-card-rationg'>{props.rating}</h4>
        </div>
      </div>
    </div>
  )
}
