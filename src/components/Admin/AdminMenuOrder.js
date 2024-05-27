import React, { useState } from "react";
// import classes from "./AdminItem.module.css";

import {
  Button,
  Collapse,
  // IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
import AdminMenuOrderItem from "./AdminMenuOrderItem";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/store";
import { sendShopOrder } from "../services/orderService";

const AdminMenuOrder = (props) => {
  const ctx = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [extraCharges, setExtraCharges] = useState(0);

  const total = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "1.5rem",
        margin: "1rem 0",
        color: "rgb(214, 89, 0)",
      }}
    >
      <span>Total Price: </span>
      <span>Rs. {ctx.totalPriceShop}</span>
    </div>
  );

  const handleClick = () => {
    setOpen(!open);
  };
  const handleInputFocus = (event) => {
    event.target.select();
  };
  const doneHandler = (e) => {
    e.preventDefault();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentTime = new Date();
    const formattedTime = `${currentTime.getDate().toString()}/${
      monthNames[currentTime.getMonth()]
    }----${currentTime.getHours().toString()}:${currentTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const order = {
      time: formattedTime,
      food: ctx.itemsShop,
      totalPrice: +ctx.totalPriceShop + +extraCharges,
      payment: ctx.payment,
    };
    console.log(order);
    ////////////////////////////////////Sending Order
    sendShopOrder(order)
      .then((response) => {
        console.log("ORDER sent successfully:", response);
        props.onDone();
        dispatch(cartActions.emptyCartShop());
      })
      .catch((error) => {
        window.alert("Error while Placing Order ☹");
        console.log("Error while sending ORDER:", error);
      });
  };
  const resetHandler = () => {
    dispatch(cartActions.emptyCartShop());
  };

  return (
    <>
      {ctx.itemsShop !== [] && (
        <>
          <hr />
          <form onSubmit={doneHandler}>
            <List sx={{ backgroundColor: "black", borderRadius: "10px" }}>
              <ListItemButton onClick={handleClick}>
                <ListItemText primary={`SHOP ORDER`} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {ctx.itemsShop.map((item) => {
                    return (
                      <AdminMenuOrderItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        amount={item.amount}
                        code={item.id}
                        totalPrice={ctx.totalPriceShop}
                      />
                    );
                  })}
                </List>
                <ListItem
                  sx={{
                    pl: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    id="outlined-controlled"
                    label="Extra Charges"
                    size="small"
                    type={"number"}
                    value={extraCharges}
                    onChange={(e) => setExtraCharges(e.target.value)}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "aqua",
                        },
                      },
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary={total} />
                </ListItem>
                <Button
                  onClick={resetHandler}
                  sx={{ marginRight: "50px" }}
                  type="reset"
                >
                  Cancel
                </Button>
                <Button type="submit">DONE</Button>
              </Collapse>
            </List>
          </form>
        </>
      )}
    </>
  );
};

export default AdminMenuOrder;
