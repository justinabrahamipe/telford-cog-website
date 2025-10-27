import React from "react";
import "./HomePrimeInfoItem.css";

interface HomePrimeInfoItemProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const HomePrimeInfoItem: React.FC<HomePrimeInfoItemProps> = ({ title, icon, children }) => {
  return (
    <div className="HomePrimeInfoItem" tabIndex={0}>
    <div className="HomePrimeInfo__gradient"></div>
      <div className="HomePrimeInfoItem__holder">
        <div className="HomePrimeInfoItem__icon" data-icon={ icon }></div>
        <div className="HomePrimeInfoItem__text">
          <div className="HomePrimeInfoItem__name">{ title }</div>
          <p className="p--small">{ children }</p>
        </div>
      </div>
    </div>
  );
};

export default HomePrimeInfoItem;