# React Carousel component

## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)

## General info
A Carousel component made with React that supports mobile and mouse swipes. You can easily add it to your project and use it! 

## Features 
* Responsive, works on mobile and browser
* Supports swipes
* Supports scrolling to a selected slide (like go to slide X)
* You can either swipe or click on slides next to the slide in the middle
* You can swipe infinitively to both sides!
* Supports any HTML content as well as React components

NB! Currently you can import images with following formats:
* PNG
* SVG
* JPG
* GIF
* JPEG

Audio can be imported only in mp3 formats. If you want to add other image or audio formats, follow the instructions [these instructions](https://www.npmjs.com/package/file-loader)

## Setup
To run this project, install it locally using git clone command.

After that, go to the root directory and write in your terminal:

$ npm install

$ npm run start

After that, you'll see carousel running!

## Usage

If you want to use this component in your project, you'll need to import the Carousel component inside of your App.js (or other container) like this: 

```javascript
import Carousel from './containers/Carousel/Carousel';
```
If you want to have background pictures on your slides, you should also import them:

```javascript
import slide1 from './images/slide1.jpeg';
import slide2 from './images/slide2.jpeg';
import slide3 from './images/slide3.jpeg';
```

The carousel is designed in a way that you can pass your components inside your slides. If you want to insert them:

```javascript
import TestContent from './components/testContent1/TestContent1';
```

Inside of your return, pass into Carousel component. It accepts an array as a props. In array, you can put an object where:
* **img** as image you put for the background. Accepts imported images only.
* **content** as the content you want to put inside your slide. Accepts React components, strings and simple strings.

It will look like this: 

```javascript
const contentArr= [
        {
        img:slide1, //here goes your img
        content: <TestContent /> //here goes your component
        },

        {
        img: slide2,
        content: '2'
        },
```
        
If you don't want to have either picture or content in your slide, leave them as an empty string: 

```javascript 

{       
img:slide1,
content:''
},

{
img:'',
content: <TestContent />
}
```

Finally, set your array as a prop to Carousel component inside your return statement: 

```javascript
   return(
        <div id='app'>
            <Carousel contentArr={contentArr}/>
        </div>
    )
```
Basically, that's it. Feel free to use it!
    
