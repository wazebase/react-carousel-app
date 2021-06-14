import React from 'react';
import './slide-select.css';

const SlideSelect = ({ slideSelectNum, setSlideSelectNum, slideNumArr }) => {
  // sets slide number to the one that is chosen in options
  const changeSlideNum = (e) => {
    setSlideSelectNum(parseInt(e.target.value, 10));
  };

  const isChecked = (number) => {
    const checkIfChecked = slideSelectNum === number;
    return checkIfChecked;
  };

  return (
    <div className="slideselect" onChange={(e) => changeSlideNum(e)}>
      {slideNumArr.map((number) => (
        <input
          className="radio"
          type="radio"
          key={number}
          readOnly
          value={number}
          checked={isChecked(number)}
        />
      ))}
    </div>
  );
};

export default SlideSelect;
