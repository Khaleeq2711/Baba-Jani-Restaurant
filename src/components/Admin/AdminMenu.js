import React from "react";

import style from "./AdminMenu.module.css";
// import Card from "../UI/Card";
import AdminMenuItem from "./AdminMenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AdminMenuOrder from "./AdminMenuOrder";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/store";

const MEALS = [
  {
    id: "m1",
    name: "Zinger Burger",
    // description: "Crispy & Crunchy !",
    price: 350,
    // stock:true
  },
  {
    id: "m2",
    name: "Bechamel Zinger Burger",
    price: 370,
  },
  {
    id: "m3",
    name: "Grilled Chicken Burger",
    price: 420,
  },
  {
    id: "m4",
    name: "Caremalized Beef Burger",
    price: 540,
  },
  {
    id: "m5",
    name: "Creamy Mushroom Burger",
    price: 680,
  },
  {
    id: "m6",
    name: "Grilled Chicken Shawarma (Small)",
    price: 150,
  },
  {
    id: "m7",
    name: "Grilled Chicken Shawarma (Large)",
    price: 200,
  },
  {
    id: "m8",
    name: "Zinger Shawarma",
    price: 250,
  },
  {
    id: "m9",
    name: "Philly Steak Shawarma",
    price: 280,
  },
  {
    id: "m10",
    name: "(6) Buffalo Wings + Fries",
    price: 450,
  },
  {
    id: "m11",
    name: "(6) Cispy Wings",
    price: 350,
  },
  {
    id: "m12",
    name: "Tawa Chicken",
    price: 480,
  },
  {
    id: "m13",
    name: "(6) Aloo-Chicken Samosa",
    price: 360,
  },
  {
    id: "m14",
    name: "Masala Fries",
    price: 120,
  },
  {
    id: "m15",
    name: "Mayo Garlic Fries",
    price: 150,
  },
  {
    id: "m16",
    name: "Chicken Patty Burger",
    price: 270,
  },
  {
    id: "m17",
    name: "Zinger Roll Paratha ",
    price: 300,
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
    price: 1650,
  },
  {
    id: "m20",
    name: "Amchoor Samosa Plate (Small)",
    price: 130,
  },
  {
    id: "m21",
    name: "Amchoor Samosa Plate (Large)",
    price: 190,
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
    price: 1100,
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
    price: 1000,
  },
  {
    id: "d8",
    name: "Deal-4",
    description:
      "(2) Zinger Burgers + (2) Cripy Chicken Pcs + (2) Wings + Fries ",
    price: 1200,
  },
  {
    id: "d9",
    name: "Deal-5",
    description:
      "(2) Zinger Burgers + (2) Patty Burger + (6) Wings + (2) Fries ",
    price: 1550,
  },
  {
    id: "d10",
    name: "Deal-6",
    description:
      "(2) Zinger Roll Paratha + (2) Patty Burger + (6) Wings + (2) Fries ",
    price: 1620,
  },
  {
    id: "d11",
    name: "Deal-7",
    description:
      "(1) Mighty Zinger Burger + (1) Zinger Burger + (2) Patty Burger + (6) Wings + Fries ",
    price: 1920,
  },
  {
    id: "d12",
    name: "ALL IN",
    description:
      "(1) Mighty Zinger Burger + (1) King Beef Burger + (2) Zinger Burger + (2) Patty Burger + (9) Chicken Pieces + (6) Wings + (2) Fries ",
    price: 4750,
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
    price: 390,
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
const AdminMenu = (props) => {
  const ctx = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const doneHandler = () => {
    props.onDone();
  };
  const radioHandler = (e) => {
    dispatch(cartActions.setPayment(e.target.value));
    console.log(e.target.value);
  };
  const mealList = MEALS.map((meal) => {
    return (
      <AdminMenuItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        price={meal.price}
        stock={meal.stock}
      />
    );
  });
  const dealList = DEALS.map((deal) => {
    return (
      <AdminMenuItem
        key={deal.id}
        id={deal.id}
        name={deal.name}
        price={deal.price}
        stock={deal.stock}
      />
    );
  });
  const pre_workoutList = PRE_WORKOUT.map((deal) => {
    return (
      <AdminMenuItem
        key={deal.id}
        id={deal.id}
        name={deal.name}
        price={deal.price}
        stock={deal.stock}
      />
    );
  });
  const post_workoutList = POST_WORKOUT.map((deal) => {
    return (
      <AdminMenuItem
        key={deal.id}
        id={deal.id}
        name={deal.name}
        price={deal.price}
        stock={deal.stock}
      />
    );
  });
  const extraList = EXTRAS.map((extra) => {
    return (
      <AdminMenuItem
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
      <AdminMenuItem
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
      <h1 className={style.maincourse}>
        <b>Main Course</b>
      </h1>
      <ul className={style.example}>{mealList}</ul>
      <h1 className={style.maincourse}>
        <b>Deals</b>
      </h1>
      <ul className={style.example}>{dealList}</ul>
      <h1 className={style.maincourse}>
        <b>Drinks</b>
      </h1>
      <ul className={style.example}>{extraList}</ul>
      <h1 className={style.maincourse}>
        <b>Pre_Workout Meals</b>
      </h1>
      <ul className={style.example}>{pre_workoutList}</ul>
      <h1 className={style.maincourse}>
        <b>Post-Workout Meals</b>
      </h1>
      <ul className={style.example}>{post_workoutList}</ul>
      <h1 className={style.maincourse}>
        <b>Sauce</b>
      </h1>
      <ul className={style.example}>{sauceList}</ul>

      <FormControl>
        <FormLabel
          id="options"
          sx={{ fontSize: "larger", fontWeight: "bolder", color: "#d06602" }}
        >
          Payment Method
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="options"
          name="row-radio-buttons-group"
          onChange={radioHandler}
        >
          <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
          <FormControlLabel value="Online" control={<Radio />} label="Online" />
        </RadioGroup>
      </FormControl>

      {ctx.totalPriceShop !== 0 && <AdminMenuOrder onDone={doneHandler} />}
    </>
  );
};

export default AdminMenu;
