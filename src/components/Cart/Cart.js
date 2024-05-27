import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

import Alert from "@mui/material/Alert";
import { cartActions } from "../store/store";

const Cart = (props) => {
  const [alertEmpty, setAlertEmpty] = useState(false);
  const dispatch = useDispatch();
  const ctx = useSelector((state) => state.cartReducer);

  const addItemHandler = (item) => {
    dispatch(cartActions.addOneItem(item));
  };
  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const orderCartHandler = () => {
    if (ctx.items.length === 0) {
      setAlertEmpty(true);
    } else {
      setAlertEmpty(false);
      props.onCartOrder();
    }

    setTimeout(() => {
      setAlertEmpty((alertEmpty) => (alertEmpty = false));
    }, 2000);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx?.items?.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={removeItemHandler.bind(null, item.id)}
            onAdd={addItemHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  console.log(ctx.addressD);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Modal onCartClose={props.onCartClose}>
      <div className={classes["cart-items"]}>
        {cartItems}
        {ctx.totalPrice ? (
          <>
            <div className={classes.total}>
              <span>Total:</span>
              <span>Rs.{ctx.totalPrice}</span>
            </div>
          </>
        ) : (
          <div
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "20px",
              paddingBlock: "20px",
            }}
          >
            Cart is Empty. Let's Add Some Food.
          </div>
        )}
        <div className={classes.actions}>
          <button
            className={classes["button--close"]}
            onClick={props.onCartClose}
          >
            Close
          </button>
          <button className={classes.button} onClick={orderCartHandler}>
            Next
          </button>
          {alertEmpty && <Alert severity="error">Your Cart is Empty-!</Alert>}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
