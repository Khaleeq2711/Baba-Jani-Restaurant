import React, { useEffect, useState } from "react";

import classes from "./UserForm.module.css";
import useInput from "../UI/useInput";
import { useSelector } from "react-redux";
import Modal from "../UI/Modal";
import { sendOrder } from "../services/orderService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
// import CheckoutButton from "./CheckoutButton";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51POgeEP95vCoaGtreAgENxVWU5l8vToFjDeyVuO8M8VMibKcHij69xuzyxVUIUtR0hX0wtSl5c62Q18IQbTK11de00qkL0jHJW"
);

const UserForm = (props) => {
  const [formValidity, setformValidity] = useState(false);
  const [orderButton, setOrderButton] = useState("Order");
  const [payment, setPayment] = useState(null);

  const ctx = useSelector((state) => state.cartReducer);

  const orderFormHandler = (e) => {
    e.preventDefault();

    setOrderButton("Order ◌");
    const currentTime = new Date();
    const formattedTime = `${currentTime.getDate().toString()}/${(
      currentTime.getMonth() + 1
    ).toString()}--${currentTime.getHours().toString()}:${currentTime
      .getMinutes()
      .toString()}`;

    const redirectToCheckout = async (order) => {
      console.log("redirectToCheckout");
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: "price_1PcVSbP95vCoaGtr20PmKgOf",//300 margin
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });
    };

    const order = {
      name: enteredName,
      address: ctx.addressD,
      phone: enteredPhone,
      time: formattedTime,
      food: ctx.items,
      price: ctx.totalPrice + ctx.delivery,
      payment: payment,
    };
    console.log(order);

    if (payment === "online") {
      const checkoutOptions = {
        lineItems: [order],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      };
      redirectToCheckout(order);
    }

    sendOrder(order)
      .then((response) => {
        console.log("ORDER sent successfully:", response);
        props.onFormOrder();
      })
      .catch((error) => {
        props.onFormError();
        window.alert(
          "Error while Placing Order ☹ . \n Please Try Again. OR Use Contact Number to Order.!"
        );
        console.log("Error while sending ORDER:", error);
      });
  };
  // const paymentChangeHandler=()=>{

  // }
  const {
    enteredValue: enteredName,
    valueValidity: nameValidity,
    classInvalid: nameClassInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput((name) => {
    return name.trim().length >= 3;
  });
  const {
    enteredValue: enteredPhone,
    valueValidity: phoneValidity,
    classInvalid: phoneClassInvalid,
    valueChangeHandler: phoneChangeHandler,
    valueBlurHandler: phoneBlurHandler,
  } = useInput((phone) => {
    return phone.toString().trim().length >= 11;
  });
  useEffect(() => {
    if (nameValidity && phoneValidity && payment) {
      setformValidity(true);
    } else {
      setformValidity(false);
    }
  }, [nameValidity, phoneValidity, payment]);

  const nameClass =
    !nameClassInvalid && nameValidity
      ? classes.input + " " + classes.valid
      : classes.input;
  const addressClass = classes.input;
  const phoneClass =
    !phoneClassInvalid && phoneValidity
      ? classes.input + " " + classes.valid
      : classes.input;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Modal onCartClose={props.onFormClose}>
      <div className={classes.form}>
        {/* <header>Your Deatils</header>
        {cartItems}
        */}
        <form onSubmit={orderFormHandler}>
          <div className={nameClass}>
            <label htmlFor="name" style={{ width: "min-content" }}>
              Name
            </label>
            <input
              id="name"
              type={"text"}
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameClassInvalid && <span>Please Enter Valid Name-!</span>}
          </div>
          <div className={phoneClass}>
            <label htmlFor="phone" style={{ width: "min-content" }}>
              Phone
            </label>
            <input
              id="phone"
              type={"number"}
              value={enteredPhone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
              className={classes.number_input}
            />
            {phoneClassInvalid && (
              <span>Please Enter Valid Phone Number-!</span>
            )}
          </div>
          <div className={addressClass}>
            <label htmlFor="address" style={{ width: "min-content" }}>
              Address
            </label>
            <input id="address" value={ctx.addressD} disabled={true} />
          </div>
          <div className={addressClass}>
            <label htmlFor="paymentMethod" style={{ width: "min-content" }}>
              Payment
            </label>
            <RadioGroup
              row
              id="paymentMethod"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <FormControlLabel
                value="online"
                control={<Radio />}
                label="Online Payment"
              />
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </div>
          {ctx.totalPrice ? (
            <>
              <div className={classes.total}>
                <span>Order : </span>
                <span>{ctx.totalPrice}</span>
              </div>
              <div className={classes.total}>
                <span>Delivery : </span>
                <span> + {ctx.delivery}</span>
              </div>
              <div
                className={classes.total}
                style={{ fontSize: "x-large", marginTop: "20px" }}
              >
                <span>Total : </span>
                {ctx.delivery && (
                  <span>Rs.{ctx.delivery + ctx.totalPrice}</span>
                )}
              </div>
            </>
          ) : (
            ""
          )}

          <div className={classes.actions}>
            <button
              className={classes["button--close"]}
              onClick={props.onFormClose}
            >
              Cancel
            </button>
            <button className={classes.button} disabled={!formValidity}>
              {orderButton}
            </button>
          </div>
        </form>
        {/* <CheckoutButton /> */}
        {/* {loading && <p>Loaading.....</p >} */}
        {/* {error && <p>Something Went Wrong...</p>} */}
      </div>
    </Modal>
  );
};

export default UserForm;
