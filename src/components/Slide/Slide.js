import React, { useRef,useEffect } from 'react';
import './img-div.css';

const Slide = ({content,imgUrl}) => {
  const slideRef = useRef('slide');

  useEffect(()=> {
    slideRef.current.style.background = `url(${imgUrl})`;
  },[])

  return (
    <>
      <div id='img-div'
        ref = {slideRef}
        className='slide'>
        {content}
      </div>

    </>
  )
}


export default Slide;