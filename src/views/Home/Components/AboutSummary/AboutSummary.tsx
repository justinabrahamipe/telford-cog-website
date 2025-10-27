import React from "react";
import "./AboutSummary.css";

const AboutSummary: React.FC = () => {
  return (
    <div className="AboutSummary">
      <div className="wrapper wrapper--text">
        <div className="AboutSummary__text">
          <h2 className="h2--thin">Overview</h2>
          <p>
            We are a church that honors God's Word, believes in the work of the Holy Spirit, and worship the Lord in spirit and truth.
            We are dedicated to the purposes of God in our lives and in the world around us.
            The purpose of our existence is to bring the gospel message of salvation to all the people with our reach.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSummary;