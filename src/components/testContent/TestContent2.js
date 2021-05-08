import React from 'react';
import audio from '../../music/blues-run-the-game.mp3';
import './test-content.css';

const TestContent2 = () => {

    return(
        <div id='test-content'>
           <p id='slide-num'>5</p>
            <h1>Test content 1</h1>
 {/*  <iframe src="https://www.youtube.com/embed/GDQRRWECaec" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <audio controls>
                <source src={audio} type='audio/mpeg' />
                </audio>*/}
            <button onClick={()=>alert('i am clickable!')}>Click me</button>
        </div>
    )

}

export default TestContent2;