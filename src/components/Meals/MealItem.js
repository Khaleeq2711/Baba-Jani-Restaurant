import React from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/store";

const MealItem = (props) => {
  // const ctx = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const AddToCartHandler = (amount) => {
    let item;
    if (props.name !== "Masala Fries") {
      item = {
        id: props.id,
        name: props.name,
        amount: +amount,
        price: props.price,
      };
    } else {
      item = {
        id: props.id,
        name: props.name,
        amount: 1,
        price: +amount,
      };
    }
    dispatch(cartActions.addItem(item));
  };
  const mealMain =
    props.stock !== false
      ? classes.mealMain
      : classes.mealMain + " " + classes.invalid;

  return (
    <li>
      <div className={mealMain}>
        <div className={classes.mealInfo}>
          <h2>{props.name}</h2>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>
            {props.oldPrice !== undefined ? (
              <>
                <span>Rs.</span>
                <span className={classes.cut}>
                  &nbsp;{props.oldPrice}&nbsp;
                </span>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {props.price}
                </div>
              </>
            ) : (
              <>Rs.{props.price}</>
            )}
          </div>
        </div>
        <div className={classes.mealForm}>
          {props.stock !== false ? (
            <MealItemForm
              id={props.id}
              onAddToCart={AddToCartHandler}
              name={props.name}
            />
          ) : (
            <div className={classes.out}>Not Available Yet</div>
          )}
        </div>
      </div>
    </li>
  );
};

export default MealItem;
