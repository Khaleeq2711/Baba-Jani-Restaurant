import React from "react";

import style from "./MealsAvailable.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const MEALS = [
  {
    id: "m1",
    name: "Zinger Burger",
    // description: "Crispy & Crunchy !",
    price: 450,
    // stock:true
  },
  {
    id: "m2",
    name: "Bechamel Zinger Burger",
    price: 550,
  },
  {
    id: "m3",
    name: "Grilled Chicken Burger",
    price: 520,
  },
  {
    id: "m4",
    name: "Caremalized Beef Burger",
    price: 620,
  },
  {
    id: "m5",
    name: "Creamy Mushroom Burger",
    price: 750,
  },
  {
    id: "m6",
    name: "Grilled Chicken Shawarma (Small)",
    price: 250,
  },
  {
    id: "m7",
    name: "Grilled Chicken Shawarma (Large)",
    price: 300,
  },
  {
    id: "m8",
    name: "Zinger Shawarma",
    price: 350,
  },
  {
    id: "m9",
    name: "Philly Steak Shawarma",
    price: 380,
  },
  {
    id: "m10",
    name: "(6) Buffalo Wings + Fries",
    price: 650,
  },
  {
    id: "m11",
    name: "(6) Cispy Wings + Fries",
    price: 620,
  },
  {
    id: "m12",
    name: "Tawa Chicken",
    price: 650,
  },
  {
    id: "m13",
    name: "(6) Aloo-Chicken Samosa",
    price: 400,
  },
  {
    id: "m14",
    name: "Masala Fries",
    price: 150,
  },
  {
    id: "m15",
    name: "Mayo Garlic Fries",
    price: 320,
  },
  {
    id: "m16",
    name: "Chicken Patty Burger",
    price: 320,
  },
  {
    id: "m17",
    name: "Zinger Roll Paratha ",
    price: 350,
  },
  {
    id: "m18",
    name: "Crispy Fried Chicken (1 Pc)",
    price: 200,
  },
  {
    id: "m19",
    name: "Value Bucket",
    description: "Filled with Crispy Fried Chicken (9-Pcs)",
    price: 950,
  },
  {
    id: "m20",
    name: "Amchoor Samosa Plate (Small)",
    price: 200,
  },
  {
    id: "m21",
    name: "Amchoor Samosa Plate (Large)",
    price: 310,
  },
];
const DEALS = [
  {
    id: "d1",
    name: "Student Meal",
    description: "Zinger Burger OR Beef Burger + (2) Wings + Fries",
    oldPrice: 580,
    price: 450,
  },
  {
    id: "d2",
    name: "Duo Box",
    description: "(2) Zinger Burgers + (2) Cripsy Chicken Pcs + (2) Fries ",
    oldPrice: 1300,
    price: 1000,
  },
  {
    id: "d3",
    name: "Family Deal (Zinger)",
    description: "(4) Zinger Burgers + (2) Chicken Pcs + (4) Wings (4) Fries ",
    oldPrice: 2500,
    price: 2000,
  },
  {
    id: "d4",
    name: "Family Deal (Beef)",
    description: "(4) Beef Burgers + (2) Chicken Pcs + (4) Wings (4) Fries ",
    oldPrice: 2700,
    price: 2000,
  },
];
const DHAMAL_DEALS = [
  {
    id: "d5",
    name: "Deal-1",
    description: "(1) Grilled Chicken Burger + (3) Wings + Fries ",
    price: 570,
  },
  {
    id: "d6",
    name: "Deal-2",
    description:
      "(1) Zinger Burger + (1) Zinger Shawarma + (1) Patty Burger + Fries ",
    price: 900,
  },
  {
    id: "d7",
    name: "Deal-3",
    description: "(4) Zinger Shawarma + (1) Free Zinger Shawarma ",
    price: 1200,
  },
  {
    id: "d8",
    name: "Deal-4",
    description:
      "(2) Zinger Burgers + (2) Cripy Chicken Pcs + (2) Wings + Fries ",
    price: 1400,
  },
  {
    id: "d9",
    name: "Deal-5",
    description:
      "(2) Zinger Burgers + (2) Patty Burger + (6) Wings + (2) Fries ",
    price: 1650,
  },
  {
    id: "d10",
    name: "Deal-6",
    description:
      "(2) Zinger Roll Paratha + (2) Patty Burger + (6) Wings + (2) Fries ",
    price: 1720,
  },
  {
    id: "d11",
    name: "Deal-7",
    description:
      "(1) Mighty Zinger Burger + (1) Zinger Burger + (2) Patty Burger + (6) Wings + Fries ",
    price: 1980,
  },
  {
    id: "d12",
    name: "ALL IN",
    description:
      "(1) Mighty Zinger Burger + (1) King Beef Burger + (1) Zinger Burger + (1) Patty Burger + (3) Chicken Pieces + (6) Wings + (2) Fries ",
    price: 2750,
  },
];
const PRE_WORKOUT = [
  {
    id: "w1",
    name: "Sugar Booster Salad",
    description:
      "Fine cut Premium fruits & Dry fruit salad enriched with Caramel & grounded Coffee Syrup!",
    price: 450,
  },
  {
    id: "w2",
    name: "Horse Meal",
    description:
      "Chickpeas & potatoes seasoned with lemon juice infused with herbs & Chimmichuri Sause!",
    price: 280,
  },
  {
    id: "w3",
    name: "Club Sandwich",
    description:
      "Layers of golden egg, crisp veggies and succulent grilled chicken unite in a harmonious dance of flavors. Crowned with a velvety cream finish served with fries!",
    price: 380,
  },
];
const POST_WORKOUT = [
  {
    id: "w4",
    name: "Ceaser Salad",
    description:
      "Ceaser's Sause Romain lettuce, Croutons, cheese, tomatoes, lemon juice & Grilled Chicken!",
    price: 290,
  },
  {
    id: "w5",
    name: "Protien Dose 1",
    description:
      "180 grams Beef, with a bowl of Chimmichuri Chickpeas, a bowl of Veggies!",
    price: 480,
  },
  {
    id: "w6",
    name: "Protien Dose 2",
    description:
      "250 grams Grilled Chicken Breast, with a bowl of Chimmichuri Chickpeas, a bowl of Veggies!",
    price: 480,
  },
];
const EXTRAS = [
  {
    id: "e1",
    name: "Coke (Small)",
    price: 120,
  },
  {
    id: "e2",
    name: "Coke (1 L)",
    price: 170,
  },
  {
    id: "e3",
    name: "Coke (1.5 L)",
    price: 220,
  },
  {
    id: "e4",
    name: "Pepsi (Small)",
    price: 120,
  },
  {
    id: "e5",
    name: "Pepsi (1 L)",
    price: 170,
  },
  {
    id: "e6",
    name: "Pepsi (1.5 L)",
    price: 220,
  },
  {
    id: "e7",
    name: "Fanta (Small)",
    price: 120,
  },
  {
    id: "e8",
    name: "Fanta (1 L)",
    price: 170,
  },
  {
    id: "e9",
    name: "Fanta (1.5 L)",
    price: 220,
  },
  {
    id: "e10",
    name: "Sprite (Small)",
    price: 120,
  },
  {
    id: "e11",
    name: "Sprite (1 L)",
    price: 170,
  },
  {
    id: "e12",
    name: "Sprite (1.5 L)",
    price: 220,
  },
];
const SAUCE = [
  {
    id: "s1",
    name: "Bechamel Sauce",
    price: 40,
  },
  {
    id: "s2",
    name: "Hot Sauce",
    price: 40,
  },
  {
    id: "s3",
    name: "Mayo Garlic",
    price: 40,
  },
  {
    id: "s4",
    name: "Buffalo Sauce",
    price: 80,
  },
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MealsAvailable = () => {
  const mealList = MEALS.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        stock={meal.stock}
      />
    );
  });
  const dealList = DEALS.map((deal) => {
    return (
      <MealItem
        key={deal.id}
        id={deal.id}
        name={deal.name}
        description={deal.description}
        oldPrice={deal.oldPrice}
        price={deal.price}
        stock={deal.stock}
      />
    );
  });
  const dhamalDealList = DHAMAL_DEALS.map((deal) => {
    return (
      <MealItem
        key={deal.id}
        id={deal.id}
        name={deal.name}
        description={deal.description}
        oldPrice={deal.oldPrice}
        price={deal.price}
        stock={deal.stock}
      />
    );
  });
  const pre_workoutList = PRE_WORKOUT.map((w) => {
    return (
      <MealItem
        key={w.id}
        id={w.id}
        name={w.name}
        description={w.description}
        oldPrice={w.oldPrice}
        price={w.price}
        stock={w.stock}
      />
    );
  });
  const post_workoutList = POST_WORKOUT.map((w) => {
    return (
      <MealItem
        key={w.id}
        id={w.id}
        name={w.name}
        description={w.description}
        oldPrice={w.oldPrice}
        price={w.price}
        stock={w.stock}
      />
    );
  });
  const extraList = EXTRAS.map((extra) => {
    return (
      <MealItem
        key={extra.id}
        id={extra.id}
        name={extra.name}
        price={extra.price}
        stock={extra.stock}
      />
    );
  });
  const sauceList = SAUCE.map((sauce) => {
    return (
      <MealItem
        key={sauce.id}
        id={sauce.id}
        name={sauce.name}
        price={sauce.price}
        stock={sauce.stock}
      />
    );
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Card>
        <h1 className={style.maincourse}>
          <b>Main Course</b>
        </h1>
        <ul>{mealList}</ul>
      </Card>
      <Card>
        <h1 className={style.maincourse}>
          <b>Deal Discount</b>
        </h1>
        <ul>{dealList}</ul>
      </Card>
      <Card>
        <h1 className={style.maincourse}>
          <b>Dhamal Deals</b>
        </h1>
        <ul>{dhamalDealList}</ul>
      </Card>
      <Card>
        <h1 className={style.maincourse}>
          <b>Pre-Workout Meals</b>
        </h1>
        <ul>{pre_workoutList}</ul>
      </Card>
      <Card>
        <h1 className={style.maincourse}>
          <b>Post-Workout Meals</b>
        </h1>
        <ul>{post_workoutList}</ul>
      </Card>
      <Card>
        <h1 className={style.maincourse}>
          <b>Drinks</b>
        </h1>
        <ul>{extraList}</ul>
      </Card>
      <Card>
        <h1 className={style.maincourse}>
          <b>Sauce</b>
        </h1>
        <ul>{sauceList}</ul>
      </Card>
    </>
  );
};

export default MealsAvailable;
