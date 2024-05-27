import React, { useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import classes from "./CartButton.module.css";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const ctx = useSelector((state) => state.cartReducer);

  const [btnBump, setBtnBump] = useState(false);

  const num_items = ctx.items.reduce((prevValue, item) => {
    return prevValue + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ""}`;

  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    setBtnBump(true);

    setTimeout(() => {
      setBtnBump(false);
    }, 300);
  }, [ctx.items]);

  return (
    <button className={btnClasses} onClick={props.onCartOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.cardText}>Your Cart</span>
      <span className={classes.badge}>{num_items}</span>
    </button>
  );
};

export default CartButton;
