import React from "react";
import "./SocialMediaIcon.css";

interface SocialMediaIconProps {
  name: string;
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ name }) => {
  return (
    <div className={`SocialMediaIcon SocialMediaIcon--${name}`}>
      <div className="SocialMediaIcon__image"></div>
    </div>
  );
};

export default SocialMediaIcon;