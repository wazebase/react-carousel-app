import React, { useState, useRef, useEffect } from 'react';

import Slider from '../../components/Slider/Slider';
import SlideSelect from '../../components/SlideSelect/SlideSelect';

import './carousel.css';

const Carousel = ({ contentArr }) => {
  // NB! make sure to reload the page if you change screen size
  const currentSlideNum = useRef(1);
  const [slideSelectNum, setSlideSelectNum] = useState(1);
  const totalNum = contentArr.length;
  const slideNumArr = contentArr.map((el, i) => i + 1);
  const [slideChanged, setSlideChanged] = useState(false);

  useEffect(() => {
    if (slideChanged) {
      setSlideSelectNum(currentSlideNum.current);
    }
    return () => setSlideChanged(false);
  }, [slideChanged]);

  return (
    <div className="carousel">
      <h3>Welcome to my Carousel demo!</h3>
      <Slider
        contentArr={contentArr}
        slideNumArr={slideNumArr}
        totalNum={totalNum}
        slideSelectNum={slideSelectNum}
        currentSlideNum={currentSlideNum}
        slideChanged={slideChanged}
        setSlideChanged={setSlideChanged}
      />
      <SlideSelect
        slideSelectNum={slideSelectNum}
        setSlideSelectNum={setSlideSelectNum}
        currentSlideNum={currentSlideNum}
        slideNumArr={slideNumArr}
      />

    </div>
  );
};

export default Carousel;
