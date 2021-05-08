import React, { useState, useEffect } from 'react';

import './img-div.css';
import styles from './slide.module.css';

const Slide = ({ imgUrl, slideNum,
  currentSlideNum, totalNum, setCurrentSlideNum,
  startPos, currentPos,
  setStartPos, setCurrentPos,
  currentTranslate, setCurrentTranslate,
  transition, setTransition,
  content
}) => {

  const [slideStyle, setSlideStyle] = useState('');
  const [grabbingStyle, setGrabbingStyle] = useState('');
  const [left, setLeft] = useState(false);
  const [current, setCurrent] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);

  let clientWidth = document.documentElement.clientWidth;

  useEffect(() => {
    if (currentSlideNum === slideNum) {
      setSlideStyle(styles.currentImgDiv);
      setCurrent(true);
    }
  }, [currentSlideNum])

  useEffect(() => {
    if (currentSlideNum === slideNum - 1 ||
      (slideNum === 1 && currentSlideNum === totalNum)) {
      setSlideStyle(styles.rightImgDiv);
      setLeft(false);
      setCurrent(false);
    }
  }, [currentSlideNum])

  useEffect(() => {
    if (currentSlideNum === slideNum + 1 ||
      (slideNum === totalNum && currentSlideNum === 1)) {
      setSlideStyle(styles.leftImgDiv);
      setLeft(true);
      setCurrent(false);
    }
  }, [currentSlideNum])

  useEffect(() => {
    if ((currentSlideNum >= slideNum + 2 && !(slideNum === 1 && currentSlideNum === totalNum))
      ||
      (currentSlideNum <= slideNum - 2 && !(slideNum === totalNum && currentSlideNum === 1))) {
      setSlideStyle(styles.noDisplay);
    }

  }, [currentSlideNum])


  //animation logic

  useEffect(() => {
    if (isDragging) {
      setGrabbingStyle(styles.grabbing);
    }
    else {
      setGrabbingStyle('');
      setCurrentTranslate(0);
      setStartPos(0);
    }
  }, [isDragging]);

  useEffect(() => {

    if (!current && left) {
      setOffset(clientWidth * (-70) / 100);
    }
    else if (!current && !left) {
      setOffset(clientWidth * (70) / 100);
    }
    else {
      setOffset(0);
    }
  }, [left, current])

  useEffect(() => {

    setTransition(.8);
    setTimeout(() => setTransition(.15), 1000)

  }, [currentSlideNum])

  const handleSwipeStart = (e) => {
    let newStartPos = getPositionX(e);
    setStartPos(newStartPos);
    setIsDragging(true);
  }

  const handleSwipeMove = (e) => {
    if (isDragging) {
      let newCurrentPos = getPositionX(e);
      setCurrentTranslate(newCurrentPos - startPos);
    }
  }

  const handleSwipeEnd = () => {

    setIsDragging(false);

    if (currentTranslate < -clientWidth/7.2) {
      if (currentSlideNum === totalNum) {
        setCurrentSlideNum(1);
      }
      else {
        setCurrentSlideNum(currentSlideNum + 1);
      }
    }
    else if (currentTranslate > clientWidth/7.2) {
      if (currentSlideNum === 1) {
        setCurrentSlideNum(5);
      }
      else {
        setCurrentSlideNum(currentSlideNum - 1);
      }
    }
  }

  const handleClick = () => {
    if (!current) {

      if (currentSlideNum === 1 && left) {
        setCurrentSlideNum(totalNum);
      }

      else if (currentSlideNum === totalNum && !left) {
        setCurrentSlideNum(1);
      }

      else if (!left) {
        setCurrentSlideNum(currentSlideNum + 1);
      }
      else {
        setCurrentSlideNum(currentSlideNum - 1);
      }
    }
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
  }

  return (
    <>
      <div id='img-div'
        className={slideStyle + ' ' + grabbingStyle}
        style={{
          background: `url(${imgUrl})`,
          transform:
            `translateX(${currentTranslate + offset}px)`,
          transition: `transform ${transition}s ease-out`,
          userSelect:isDragging?'none':'unset'
        }}
        onClick={!current ? handleClick : handleSwipeEnd}
        onTouchStart={(e) => handleSwipeStart(e)}
        onTouchMove={(e) => handleSwipeMove(e)}
        onTouchEnd={() => handleSwipeEnd()}
        onMouseDown={(e) => handleSwipeStart(e)}
        onMouseMove={(e) => handleSwipeMove(e)}
        onMouseLeave={() => handleSwipeEnd()}>

        {content}
      </div>

    </>
  )
}


export default Slide;