import React, { useState } from "react";
import Slide from '../../components/Slide/Slide';
import NumSet from '../../components/NumSet/NumSet';

import './carousel.css';

const Carousel = ({ contentArr }) => {
  
  const [currentSlideNum, setCurrentSlideNum] = useState(1);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate,setCurrentTranslate] = useState(0);
  const [endPos,setEndPos] = useState(0); 
  const [transition,setTransition] = useState(.3);

  const totalNum = contentArr.length;

  return (
    <div id='carousel'>
      <h3>Welcome to my Carousel demo!</h3>
      <div id='slides-container'>

      {contentArr.map((content, i) => 
      <Slide currentSlideNum={currentSlideNum} setCurrentSlideNum={setCurrentSlideNum}
      slideNum={i + 1} key={i} totalNum={totalNum}
      imgUrl={content.img} content={content.content}
      startPos={startPos} setStartPos={setStartPos}
      endPos={endPos} setEndPos={setEndPos}
      currentTranslate={currentTranslate} setCurrentTranslate={setCurrentTranslate}
      transition={transition} setTransition={setTransition}/>)}
   
     </div>
   
     <NumSet currentSlideNum={currentSlideNum}
        setCurrentSlideNum={setCurrentSlideNum} totalNum={totalNum} />
     
      </div>
  )

};

export default Carousel;
