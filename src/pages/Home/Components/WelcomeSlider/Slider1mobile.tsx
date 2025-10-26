import React from 'react'
import './WelcomeSlider.css'
// import video from '../../../../assets/photos/videoPortraitview.mp4'

const Slider1mobile: React.FC = () => {
    return (
        //<div className='WelcomeSlider_ParentDiv'></div>
        <div className="video_div">
            <center>
                <video controls autoPlay={true} className="video-style" muted loop >
                    {/* <source src={video} type="video/mp4" /> */}
                </video>
            </center>
        </div>
    )
}

export default Slider1mobile;