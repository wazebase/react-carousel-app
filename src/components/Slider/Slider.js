/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import React, { useEffect, useRef } from 'react';
import Slide from '../Slide/Slide';
import './slider.css';

const Slider = ({
  contentArr, totalNum, currentSlideNum, setSlideChanged, slideSelectNum, slideNumArr,
}) => {
  const animationRef = useRef();
  const slidesRef = useRef();
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const slideChangeArr = useRef(slideNumArr);
  const startPos = useRef(0);
  const dragging = useRef(false);
  const slowTransition = useRef(false);
  const { clientWidth } = document.documentElement;
  const dist = clientWidth / 9.2;
  // sets up an array with all the positions for the slide change
  useEffect(() => {
    // eslint-disable-next-line no-return-assign
    slideChangeArr.current.forEach((_el, i) => slideChangeArr.current[i] = -clientWidth * i);
  }, []);

  function setTransitionOnSlideChange() {
    if (slowTransition.current) {
      slidesRef.current.style.transition = 'transform 1s ease-out';
      slowTransition.current = false;
    } else {
      slidesRef.current.style.transition = 'transform .5s ease-out';
    }
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
    currentTranslate.current = slideChangeArr.current[currentSlideNum.current - 1];
    prevTranslate.current = currentTranslate.current;
    setSlideChanged(true);
    setSliderPosition();
  };

  // changes slides position if a number was selected in numset component
  useEffect(() => {
    if (Math.abs(currentSlideNum.current - slideSelectNum) > 1) {
      slowTransition.current = true;
    }

    currentSlideNum.current = slideSelectNum;
    changeSlidesPos();
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
    const slideDistChange = slideChangeArr.current[currentSlideNum.current - 1];

    if (currentTranslate.current < -dist + slideDistChange) {
      if (currentSlideNum.current !== totalNum) {
        currentSlideNum.current += 1;
      }
    } else if (currentTranslate.current > slideDistChange + dist) {
      if (currentSlideNum.current !== 1) {
        currentSlideNum.current -= 1;
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
      {contentArr.map((slide, i) => (
        <Slide
          key={slide.id}
          slideNum={i + 1}
          content={slide.content}
          imgUrl={slide.img}
        />
      ))}
    </div>
  );
};

export default Slider;
