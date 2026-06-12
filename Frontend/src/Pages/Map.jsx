import React from 'react'
import IndiaMap from '../Components/Map/IndiaMap'
import Navbar from '../Components/Navbar/Navbar'

const Map = () => {
  return (
    <div>
        <Navbar/>
        <div className='mt-20'></div>
      <IndiaMap/>
    </div>
  )
}

export default Map
