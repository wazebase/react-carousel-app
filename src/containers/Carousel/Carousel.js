import React, { useState, useRef, useEffect } from "react";

import NumSet from '../../components/NumSet/NumSet';
import Slider from "../../components/Slider/Slider";

import './carousel.css';

const Carousel = ({ contentArr }) => {
  //NB! make sure to reload the page if you change screen size
  const currentSlideNum = useRef(1);
  const [numSetNum,setNumSetNum] = useState(1);
  const totalNum = contentArr.length;
  const [slideChanged,setSlideChanged] = useState(false);

  useEffect(()=> {
    if(slideChanged) {
      setNumSetNum(currentSlideNum.current);
    }
  return ()=> setSlideChanged(false);
  },[slideChanged])

  return (
    <div id='carousel'>
      <h3>Welcome to my Carousel demo!</h3>
      <Slider contentArr={contentArr} totalNum={totalNum} numSetNum={numSetNum}
      currentSlideNum={currentSlideNum} slideChanged={slideChanged} setSlideChanged={setSlideChanged}/>
     <NumSet numSetNum={numSetNum} setNumSetNum={setNumSetNum} currentSlideNum={currentSlideNum}
      totalNum={totalNum} />
     
      </div>
  )

};

export default Carousel;
