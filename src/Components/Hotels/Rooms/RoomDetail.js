import React, { useEffect } from 'react'

export default function RoomDetail(props) {
    useEffect(() => {
        console.log(props.roomDetail)
    },[]);
  return (
    <div className='main-room-detail'>
        <div className='romm-detail-div'>
            <div className='room-detail-divInside'>
                <h2>{props.roomDetail.roomType}</h2>
            </div>
        </div>

    </div>
  )
}
