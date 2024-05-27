import React, { useEffect, useState } from "react";

import classes from "./UserForm.module.css";
import useInput from "../UI/useInput";
import { useSelector } from "react-redux";
import Modal from "../UI/Modal";
import { sendOrder } from "../services/orderService";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

// const sectors = [
//   "H-13",
//   "H-12 (Nust)",
//   "H-11",
//   "H-10",
//   "I-10",
//   "I-9",
//   "I-8",
//   "G-14",
//   "G-13",
//   "G-12",
//   "G-11",
//   "G-10",
//   "G-9",
//   "G-8",
//   "G-7",
//   "F-11",
//   "F-10",
//   "F-8",
//   "F-7",
//   "F-6",
//   "E-11",
//   "E-9",
//   "26-Number",
// ];
// const options = ["1", "2", "3", "4", "Markaz"];

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

    const order = {
      name: enteredName,
      address: ctx.addressD,
      phone: enteredPhone,
      time: formattedTime,
      food: ctx.items,
      totalPrice: ctx.totalPrice + ctx.delivery,
    };
    // console.log(order);
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
                value="easypaisa"
                control={<Radio />}
                label="Easypaisa (online)"
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
        {/* {loading && <p>Loaading.....</p>} */}
        {/* {error && <p>Something Went Wrong...</p>} */}
      </div>
    </Modal>
  );
};

export default UserForm;
