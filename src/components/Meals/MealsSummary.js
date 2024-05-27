import React from "react";

import style from "./MealsSummery.module.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MealsSummary = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1.8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    swipe: false, // Disable manual swipe
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1.4,
        },
      },
      {
        breakpoint: 450,
        settings: {
          speed: 4000,
          slidesToShow: 1.1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} className={style.marq}>
        <div>Fresh & Delicious 👌🏼</div>
        <div> Bring The Heat Home 🔥</div>
        <div>What Matters is Taste 🤍</div>
        <div>Premium Ingredients 💯</div>
      </Slider>
      <div className={style.summary}>
        <p className={style.shimmer}>
          Uncover the flavor journey at Baba Jani's, where we hold true to the
          belief that "Good food is the foundation of genuine happiness." Relish
          in our premium fast food, while also making a positive impact, 4% of
          our profits go towards uplifting the community in Islamabad. !
        </p>
      </div>
    </>
  );
};

export default MealsSummary;
