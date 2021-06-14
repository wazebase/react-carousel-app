import React from 'react';
import slide5 from './images/slide5.jpeg';
import slide6 from './images/slide6.jpeg';
import slide4 from './images/slide4.jpeg';
import Carousel from './containers/Carousel/Carousel';
import TestContent from './components/testContent/TestContent1';
import './App.css';

const App = () => {
// array with content that goes inside the carousel
  const contentArr = [
    {
      img: slide4,
      content: <div><h3>Any HTML content is valid</h3></div>,
      id: 150,
    },

    {
      img: slide5,
      content: 'I can also pass strings',
      id: 345,
    },
    {
      img: slide4,
      content: <TestContent />,
      id: 151,
    },

    {
      img: slide6,
      content: '',
      id: 335,
    },
  ];

  return (
    <div className="app">
      <Carousel contentArr={contentArr} />
    </div>
  );
};

export default App;
