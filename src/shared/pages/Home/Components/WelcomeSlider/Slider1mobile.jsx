import React from 'react'
import './WelcomeSlider.css'
// import video from '../../../../images/photos/videoPortraitview.mp4'

const Slider1mobile = () => {
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

export default Slider1mobile;