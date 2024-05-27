import React from "react";
import classes from "./AdminOrders.module.css";

import { ListItem, ListItemText } from "@mui/material";

const AdminMenuOrderItem = (props) => {
  const item = (
    <div className={classes["form-item"]}>
      <div className={classes.name}>
        <h3>{props.name}</h3>
      </div>
      <div className={classes.summary}>
        <span className={classes.price}>Rs. {props.price}</span>
        {props.code && <span className={classes.amount}>{props.code}</span>}
        {props.amount && (
          <span className={classes.amount}>{props.amount}</span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <ListItem sx={{ pl: 4 }}>
        <ListItemText primary={item} />
      </ListItem>
    </>
  );
};

export default AdminMenuOrderItem;
