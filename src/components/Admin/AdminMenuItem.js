import React, { useState } from "react";

// import MealItemForm from "./MealItemForm";
import classes from "./AdminMenuItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/store";
import AdminMenuItemForm from "./AdminMenuItemForm";
import { Alert, Snackbar } from "@mui/material";

const AdminMenuItem = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

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
    setOpen(true);
    dispatch(cartActions.addItemShop(item));
  };
  const mealMain =
    props.stock !== false
      ? classes.mealMain
      : classes.mealMain + " " + classes.invalid;

  return (
    <li>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Item Added.!
        </Alert>
      </Snackbar>
      <div className={mealMain}>
        <div className={classes.mealInfo}>
          <h2>{props.id}</h2>
        </div>
        <div className={classes.mealForm}>
          <AdminMenuItemForm
            id={props.id}
            onAddToCart={AddToCartHandler}
            name={props.name}
          />
        </div>
      </div>
      <p style={{ paddingLeft: "10px", paddingRight: "10px" }}>{props.name}</p>
    </li>
  );
};

export default AdminMenuItem;
