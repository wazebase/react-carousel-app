import Slide from '../Slide/Slide';
import React, { useEffect, useRef } from 'react';
import './slider.css';

const Slider = ({ contentArr, totalNum, currentSlideNum, setSlideChanged, numSetNum }) => {
  const animationRef = useRef();
  const slidesRef = useRef('slider');
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const dragging = useRef(false);
  const slideChangeArr = useRef([]);
  const startPos = useRef(0);
  let clientWidth = document.documentElement.clientWidth;

  //sets up an array with all the positions for the slide change
  useEffect(() => {
    for (let i = 0; i < totalNum; i++) {
      let changePos = -clientWidth * i;
      slideChangeArr.current.push(changePos);
    }
  }, [])
    
  //changes slides position if a number was selected in numset component
  useEffect(() => {
    currentSlideNum.current = numSetNum;
    changeSlidesPos();
  }, [numSetNum])

  function setSliderPosition() {
    if (!dragging.current)
      setTransitionOnSlideChange();
    slidesRef.current.style.transform = `translateX(${currentTranslate.current}px)`
  }

  function setTransitionOnSlideChange() {
    slidesRef.current.style.transition = `transform .8s ease-out`;
    setTimeout(() => {
      slidesRef.current.style.transition = `transform .2s ease-out`;
    }, 800)
  }

  function animation() {
    if (dragging.current) {
      setSliderPosition();
      requestAnimationFrame(animation);
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
  }

  //sets up slide for the new position
  const changeSlidesPos = () => {
    currentTranslate.current = slideChangeArr.current[currentSlideNum.current - 1];
    prevTranslate.current = currentTranslate.current;
    setSlideChanged(true);
    setSliderPosition();
  }

  const changeSlideNum = () => {
    if (currentTranslate.current < -clientWidth / 7.2 + slideChangeArr.current[currentSlideNum.current - 1]) {
      if (currentSlideNum.current !== totalNum) {
        currentSlideNum.current += 1;
      }
    }
    else if (currentTranslate.current > slideChangeArr.current[currentSlideNum.current - 1] + clientWidth / 7.2) {
      if (currentSlideNum.current !== 1) {
        currentSlideNum.current -= 1;
      }
    }
  }

  const handleSwipeStart = (e) => {
    let newStartPos = getPositionX(e);
    startPos.current = newStartPos;
    dragging.current = true;
    slidesRef.current.style.cursor = 'grabbing';
    animationRef.current = requestAnimationFrame(animation);
  }

  const handleSwipeMove = (e) => {
    if (dragging.current) {
      let newCurrentPos = getPositionX(e);
      currentTranslate.current = prevTranslate.current + newCurrentPos - startPos.current;
    }
  }

  const handleSwipeEnd = () => {
    if (dragging.current) {
      changeSlideNum();
      dragging.current = false;
      slidesRef.current.style.cursor = 'grab';
      cancelAnimationFrame(animationRef.current);
      changeSlidesPos();
    }
  }

  return (
    <div id='slides-container'
      ref={slidesRef}
      onTouchStart={(e) => handleSwipeStart(e)}
      onTouchMove={(e) => handleSwipeMove(e)}
      onTouchEnd={(e) => handleSwipeEnd(e)}
      onMouseDown={(e) => handleSwipeStart(e)}
      onMouseMove={(e) => handleSwipeMove(e)}
      onMouseUp={(e) => handleSwipeEnd(e)}
      onMouseLeave={(e) => handleSwipeEnd(e)}
    >
      {contentArr.map((slide, i) =>
        <Slide
          key={i + 1}
          slideNum={i + 1}
          content={slide.content}
          imgUrl={slide.img}
        />)}
    </div>
  )
}

export default Slider;
