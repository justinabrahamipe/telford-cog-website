import React from "react";
import Slider2 from "./Slider2.jsx";
import Slider3 from "./Slider3.jsx";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "react-awesome-slider/dist/styles.css";
import { Spinner } from 'react-bootstrap';

const AutoplaySlider = withAutoplay(AwesomeSlider);

function WelcomeSlider() {
 // const isMobile = window.innerWidth <= 550;
  return (
    <AutoplaySlider
      className="slider-parent"
      play={true}
      autoPlay={true}
      loop={true}
      cancelOnInteraction={true}
      interval={10000}
      mobileTouch={true}
      startupScreen={ <Spinner/>}
      startup={true}
    >
      {/* <div className="slider-child">
        {!isMobile ? <Slider1 /> : <Slider1mobile/>}
      </div> */}
      <div className="slider-child">
        <Slider2 />
      </div>
      <div className="slider-child">
       <Slider3/>
      </div>
    </AutoplaySlider>
  );
}

export default WelcomeSlider;
