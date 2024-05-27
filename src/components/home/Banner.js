import React from "react";
import style from "./Banner.module.css";
import Banner1 from "../assets/Banner1.jpg";

function BannerHome() {
  return (
    <div className={style.main}>
      <img src={Banner1} width="100%" alt="Burger Fries Banner" />
    </div>
  );
}
export default BannerHome;
