import React from "react";
import Button from "../Button/Button";
import "./FooterLocationInfo.css";
import { Link } from 'react-router-dom';

const FooterLocationInfo = function (props) {
  return (
    <div className="FooterLocationInfo">
      <div className="FooterLocationInfo__holder">
        <h4 className="h4--thin">Our Address</h4>
        <div className="FooterLocationInfo__text">
          All Saints Parish Center,
          <br /> Lychgate Walk, Wellington - TF1 3HA
          <br /> United Kingdom
        </div>
        <a href='https://goo.gl/maps/FEsb17CUKPp5KP1P7'> <Button text="View Map" size="small" type="outline" bgColor="#263238"  /> </a>
      </div>
    </div>
  );
};

export default FooterLocationInfo;
