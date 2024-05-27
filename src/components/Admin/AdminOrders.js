import React, { useState, useRef } from "react";
import classes from "./AdminOrders.module.css";
import ReactToPrint from "react-to-print";

import {
  Button,
  Collapse,
  // IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
import OrderItem from "./AdminMenuOrderItem";

const AdminOrders = (props) => {
  const [open, setOpen] = useState(true);
  const [dlt, setDlt] = useState("");
  let componentRef = useRef();

  const itemClass = props.isNew === true ? classes.new : "";

  // const deleteHandler = () => {
  //   setDlt("dlt");
  //   setOpen(false);
  // };
  const handleClick = () => {
    if (dlt !== "dlt") {
      setOpen(!open);
    }
  };
  const total = (
    <div className={classes.total}>
      <span>Total Price: </span>
      <span>Rs. {props.totalPrice}</span>
    </div>
  );
  const payment = (
    <div className={classes.payment}>
      <span>Payment: </span>
      <span>{props.payment}</span>
    </div>
  );
  return (
    <>
      <List
        className={dlt === "dlt" ? classes.dlt : itemClass}
        ref={(el) => (componentRef = el)}
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          {props.count >= 0 && (
            <ListItemText primary={`ORDER-${props.count + 1}`} />
          )}
          <ListItemText primary={props.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {props?.items?.map((item) => {
              return (
                <OrderItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  amount={item.amount}
                />
              );
            })}
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary={total} />
            </ListItem>
            {props.name && (
              <ListItem sx={{ pl: 4 }} className={classes.info}>
                ---{props.name}
              </ListItem>
            )}
            {props.phone && (
              <ListItem sx={{ pl: 4 }} className={classes.info}>
                ---{props.phone}
              </ListItem>
            )}
            {props.address && (
              <ListItem sx={{ pl: 4 }} className={classes.info}>
                ---{props.address}
              </ListItem>
            )}
            {props.payment && (
              <ListItem sx={{ pl: 4 }}>
                <ListItemText primary={payment} />
              </ListItem>
            )}
            <ListItem sx={{ pl: 4 }} className={classes.info}>
              {props.time}
            </ListItem>
            {/* <IconButton edge="end" aria-label="delete" onClick={deleteHandler}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton> */}
          </List>
          <ReactToPrint
            trigger={() => {
              return <Button>Print </Button>;
            }}
            content={() => componentRef}
            documentTitle="BABA Jani's "
            pageStyle="Print"
            // onAfterPrint={() => {
            //   window.alert("Order Printed..!");
            // }}
          />
        </Collapse>
      </List>
    </>
  );
};

export default AdminOrders;
