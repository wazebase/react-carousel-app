import React from 'react';
import './numset.css';

const NumSet = ({totalNum,numSetNum,setNumSetNum}) => {
   
    const numArr = [];
    
    for(let i = 0; i<totalNum; i++) {
        let number = i + 1;
        numArr.push(number);
    }
    //sets slide number to the one that is chosen in options
    const changeSlideNum = (e) => {
        setNumSetNum(parseInt(e));
    }

    return(
        <div id='numset'>
            <select id='slide-select' value = {numSetNum} onChange ={(e)=>changeSlideNum(e.target.value)} name='numbers'>
            {numArr.map(number=>
            <option key={number} value={number}>{number}</option>)}
            </select>

            <p>/</p>
            <p id='total-num'>{totalNum}</p>
        </div>
    )
}

export default NumSet;