import React from 'react';
import slide1 from './images/slide1.jpeg';
import slide2 from './images/slide2.jpeg';
import slide3 from './images/slide3.jpeg';
import Carousel from './containers/Carousel/Carousel';
import TestContent1 from './components/testContent/TestContent1';
import TestContent2 from './components/testContent/TestContent2';

import './App.css'
const App = () => {

const contentArr= [
        {
        img:slide1, 
        content: '1'
        },

        {
        img: slide2,
        content: '2'
        },

        {
        img:slide3,
        content:'3'
        },

        {img:slide1,
        content:<TestContent1 /> },

        {img:'',
        content: <TestContent2 />}
    ];

    return(
        <div id='app'>
            <Carousel contentArr={contentArr}/>
        </div>
    )
}

export default App;