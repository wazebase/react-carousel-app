import React from 'react';
import './numset.css';

const NumSet = ({totalNum,currentSlideNum,setCurrentSlideNum}) => {
   
    const numArr = [];
    
    for(let i = 0; i<totalNum; i++) {
        let number = i + 1;
        numArr.push(number);
    }

    const changeSlideNum = (e) => {
            setCurrentSlideNum(parseInt(e));
    }

    return(
        <div id='numset'>
            <select id='slide-select' value={currentSlideNum} onChange ={(e)=>changeSlideNum(e.target.value)} name='numbers'>
            {numArr.map(number=>
            <option key={number} value={number}>{number}</option>)}
            </select>

            <p>/</p>
            <p id='total-num'>{totalNum}</p>
        </div>
    )
}

export default NumSet;