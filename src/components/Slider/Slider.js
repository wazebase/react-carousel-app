/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import Slide from '../Slide/Slide';
import './slider.css';
// eslint-disable-next-line no-unused-vars
import slide6 from '../../images/slide6.jpeg';
import slide4 from '../../images/slide4.jpeg';
import slide5 from '../../images/slide5.jpeg';

const Slider = ({
  totalNum, currentSlideNum, setCurrentSlideNum,
  setSlideChanged, slideSelectNum, slideNumArr,
}) => {
  const animationRef = useRef();
  const slidesRef = useRef();
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const currentSlideRef = useRef(1);
  const startPos = useRef(0);
  const slideChangeArr = useRef(slideNumArr);
  const dragging = useRef(false);
  const slowTransition = useRef(0);
  const { clientWidth } = document.documentElement;
  const dist = clientWidth / 9.2;

  // sets up an array with all the positions for the slide change
  useEffect(() => {
    slideChangeArr.current.forEach((_el, i) => {
      const position = -clientWidth * i;
      slideChangeArr.current[i] = position;
    });
  }, []);

  function setTransitionOnSlideChange() {
    // calculates how many seconds will transition require
    const changeAmount = slowTransition.current;
    const transSeconds = 0.5 + 0.2 * changeAmount;
    slidesRef.current.style.transition = `transform ${transSeconds}s ease-out`;
    slowTransition.current = 0;
    setTimeout(() => {
      slidesRef.current.style.transition = 'transform .2s ease-out';
    }, 500);
  }

  function setSliderPosition() {
    if (!dragging.current) setTransitionOnSlideChange();
    slidesRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
  }

  // sets up slide for the new position
  const changeSlidesPos = () => {
    currentTranslate.current = slideChangeArr.current[currentSlideRef.current - 1];
    prevTranslate.current = currentTranslate.current;
    setSlideChanged(true);
    setSliderPosition();
  };

  // changes slides position if a number was selected in numset component
  useEffect(() => {
    // runs only if state of slideSelectNum is changed
    if (currentSlideNum !== slideSelectNum) {
    // calculates the difference between slides and applies to ref
      const slideChangeGap = Math.abs(currentSlideNum - slideSelectNum);
      if (slideChangeGap > 1) {
        slowTransition.current = slideChangeGap;
      }
      setCurrentSlideNum(slideSelectNum);
      // changing ref value so that changeSlidesPos() recieves current slide number
      currentSlideRef.current = slideSelectNum;
      changeSlidesPos();
    }
  }, [slideSelectNum]);

  function animation() {
    if (dragging.current) {
      setSliderPosition();
      requestAnimationFrame(animation);
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  const changeSlideNum = () => {
    const slideDistChange = slideChangeArr.current[currentSlideNum - 1];
    if (currentTranslate.current < slideDistChange - dist) {
      if (currentSlideNum !== totalNum) {
        setCurrentSlideNum(currentSlideNum + 1);
        currentSlideRef.current = currentSlideNum + 1;
      }
    } else if (currentTranslate.current > slideDistChange + dist) {
      if (currentSlideNum !== 1) {
        setCurrentSlideNum(currentSlideNum - 1);
        currentSlideRef.current = currentSlideNum - 1;
      }
    }
  };

  const handleSwipeStart = (e) => {
    const newStartPos = getPositionX(e);
    startPos.current = newStartPos;
    dragging.current = true;
    slidesRef.current.style.cursor = 'grabbing';
    animationRef.current = requestAnimationFrame(animation);
  };

  const handleSwipeMove = (e) => {
    if (dragging.current) {
      const newCurrentPos = getPositionX(e);
      currentTranslate.current = prevTranslate.current + newCurrentPos - startPos.current;
    }
  };

  const handleSwipeEnd = () => {
    if (dragging.current) {
      changeSlideNum();
      dragging.current = false;
      slidesRef.current.style.cursor = 'grab';
      cancelAnimationFrame(animationRef.current);
      changeSlidesPos();
    }
  };

  return (
    <div
      className="slides-container"
      ref={slidesRef}
      onTouchStart={(e) => handleSwipeStart(e)}
      onTouchMove={(e) => handleSwipeMove(e)}
      onTouchEnd={(e) => handleSwipeEnd(e)}
      onMouseDown={(e) => handleSwipeStart(e)}
      onMouseMove={(e) => handleSwipeMove(e)}
      onMouseUp={(e) => handleSwipeEnd(e)}
      onMouseLeave={(e) => handleSwipeEnd(e)}
    >
      <Slide
        key={233}
        slideNum={1}
        imgUrl={slide4}
      >
        <h3>Also works</h3>
      </Slide>

      <Slide
        key={333}
        slideNum={2}
        imgUrl={slide5}
      >
        <h3>This way</h3>
      </Slide>

      <Slide
        key={133}
        slideNum={3}
        imgUrl={slide6}
      >
        <h3>But</h3>
      </Slide>

      <Slide
        key={253}
        slideNum={4}
        imgUrl={slide4}
      >
        <h3>I prefer</h3>
      </Slide>

      <Slide
        key={234}
        slideNum={5}
        imgUrl={slide5}
      >
        <h3>The other way</h3>
      </Slide>

    </div>
  );
};

export default Slider;
