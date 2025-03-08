import React from 'react'
import './WelcomeSlider.css'
// import video from '../../../../images/photos/videoLandscapeview.mp4'

const Slider1 = () => {
    return (
        //<div className='WelcomeSlider_ParentDiv'></div>
        <div className="video_div">
            <center>
                <video controls autoplay='true' className="video-style" muted loop >
                    {/* <source src={video} type="video/mp4" /> */}
                </video>
            </center>
        </div>
    )
}

export default Slider1;