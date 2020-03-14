import React from "react";

import onlineIcon from "../../assets/onlineIcon.png";
import closeIcon from "../../assets/closeIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room, name }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>{room}</h3>
        <hr />
        <h3>{name}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
