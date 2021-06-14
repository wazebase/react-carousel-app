import React, { useRef, useEffect } from 'react';
import './img-div.css';

const Slide = ({ children, imgUrl }) => {
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
        {children}
      </div>

    </>
  );
};

export default Slide;
