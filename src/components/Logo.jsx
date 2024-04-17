import React from 'react'

function Logo({color, className}) {

  
  return (
    <div >

      <p className={`${color} ${className} font-bold font-lato`} >Just<span className="text-color-pink">fans</span>.ng</p>
    </div>
  )
}

export default Logo


