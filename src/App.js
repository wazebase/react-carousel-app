import React from 'react';
import slide5 from './images/slide5.jpeg';
import slide6 from './images/slide6.jpeg';
import slide4 from './images/slide4.jpeg';
import Carousel from './containers/Carousel/Carousel';

import './App.css';

const App = () => {
// array with content that goes inside the carousel
  const contentArr = [
    {
      img: slide4,
      content: '1',
      id: 150,
    },

    {
      img: slide5,
      content: '2',
      id: 345,
    },

    {
      img: slide6,
      content: '3',
      id: 545,
    },
  ];

  return (
    <div className="app">
      <Carousel contentArr={contentArr} />
    </div>
  );
};

export default App;
