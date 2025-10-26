import React from "react";
import "./SocialMediaIconSet.css";
import SocialMediaIcon from "../SocialMediaIcon/SocialMediaIcon";

interface SocialMediaItem {
  name: string;
  url: string;
}

interface SocialMediaIconSetProps {
  list: SocialMediaItem[];
}

const SocialMediaIconSet: React.FC<SocialMediaIconSetProps> = ({ list }) => {
  return (
    <div className="SocialMediaIconSet">
      {list.map((item) => (
        <a href={item.url} key={item.name}>
          <SocialMediaIcon name={item.name} />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIconSet;