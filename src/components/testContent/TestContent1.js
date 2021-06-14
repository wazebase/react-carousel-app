/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import './test-content.css';
import song from '../../music/blues-run-the-game.mp3';

const TestContent1 = () => (
  <div className="test-content">
    <h3>Or as components. Here is some audio for an example</h3>
    <audio controls src={song} />
  </div>
);

export default TestContent1;
