import React from "react";

import style from "./OrderDone.module.css";
import { useSelector } from "react-redux";
import FormItem from "../Form/FormItem";
import Alert from "@mui/material/Alert";
import FormModal from "../UI/FormModal";

const OrderDone = (props) => {
  const ctx = useSelector((state) => state.cartReducer);
  const cartItems = (
    <ul className={style.form}>
      {ctx?.items?.map((item) => {
        return (
          <FormItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
          />
        );
      })}
    </ul>
  );
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <FormModal onCartClose={props.onClose}>
      <div className={style.form}>
        <Alert severity="success" sx={{ fontSize: "15px" }}>
          Order is Placed Successfuly, Waiting for Confirmation.!
        </Alert>

        <div className={style.total}>
          <span>TO PAY: </span>
          <span>Rs.{ctx.totalPrice + ctx.delivery}</span>
        </div>
        <div className={style.wait}>
          ---A Representative of the Restaurant will call on the Number or
          Whatsapp to Confirm Order.
          <br />
          <br />
          --Please Wait..!
        </div>
        <br />
        <br />
        <header>Your Deatils</header>
        {cartItems}
      </div>
    </FormModal>
  );
};

export default OrderDone;
