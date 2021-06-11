import React from 'react';
import './slide-select.css';

const SlideSelect = ({ slideSelectNum, setSlideSelectNum, slideNumArr }) => {
  // sets slide number to the one that is chosen in options
  const changeSlideNum = (e) => {
    setSlideSelectNum(parseInt(e.target.value, 10));
  };

  return (
    <div className="slideselect" onChange={(e) => changeSlideNum(e)}>
      {slideNumArr.map((number) => <input className="radio" type="radio" key={number} value={number} checked={slideSelectNum === number} />)}
    </div>
  );
};

export default SlideSelect;
