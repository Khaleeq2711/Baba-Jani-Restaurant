import React from "react";
import style from "./Footer.module.css";

import FacebookIcon from "@mui/icons-material/Facebook";
// import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const facebookClickHandler = () => {
    window.open("https://www.facebook.com/Babajanish13", "_blank");
  };
  // const youtubeClickHandler = () => {
  //   window.open("https://www.youtube.com", "_blank");
  // };
  const instagramClickHandler = () => {
    window.open("https://www.instagram.com/babajanish13/", "_blank");
  };
  return (
    <>
      <div className={style.main}>
        <h1>BAba Jani's Fast Food.</h1>
        <h3>H-13</h3>
        <div className={style.address}>
          <b>Address: </b> Islamabad , H-13 , Haji Abdul Ghani RD , 44000
        </div>
        <div className={style.address}>
          <b>Contact: </b> 03175371236
        </div>
        <div className={style.icons}>
          <FacebookIcon className={style.i} onClick={facebookClickHandler} />
          {/* <YouTubeIcon className={style.i} onClick={youtubeClickHandler} /> */}
          <InstagramIcon className={style.i} onClick={instagramClickHandler} />
        </div>
      </div>
    </>
  );
};

export default Footer;
