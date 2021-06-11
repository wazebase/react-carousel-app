import React, { useRef, useEffect } from 'react';
import './img-div.css';

const Slide = ({ content, imgUrl }) => {
  const slideRef = useRef();

  useEffect(() => {
    slideRef.current.style.background = `url(${imgUrl})`;
  }, []);

  return (
    <>
      <div
        className="img-div slide"
        ref={slideRef}
      >
        {content}
      </div>

    </>
  );
};

export default Slide;
