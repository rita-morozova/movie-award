import React from 'react'
import Confetti from 'react-confetti'
import {useWindowSize} from '@react-hook/window-size'


const Banner = () =>{

  //confetti is using screen's width & height
  const { width, height } = useWindowSize()

  return(
    <div className='banner'>
       <Confetti width={width} height={height} />
       <p>You nominated five movies!</p>
    </div>
  )
}

export default Banner