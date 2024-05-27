import React, { useRef, useState } from "react";

import Input from "../UI/Input";
import classes from "./AdminMenuItemForm.module.css";

const AdminMenuItemForm = (props) => {
  const [amountValidity, setAmountValidity] = useState(true);
  const amountRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmountS = amountRef.current.value;
    const enteredAmount = +enteredAmountS;
    if (enteredAmountS.trim().length === 0) {
      setAmountValidity(false);
      return;
    }
    setAmountValidity(true);
    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {props.name !== "Masala Fries" ? (
        <Input
          // label={"Amount "}
          reference={amountRef}
          input={{
            key: props.id,
            type: "number",
            min: "1",
            max: "20",
            step: "1",
            defaultValue: "1",
          }}
        />
      ) : (
        <Input
          label={"Price "} 
          reference={amountRef}
          input={{
            key: props.id,
            type: "number",
            min: "50",
            max: "1000",
            step: "10",
            defaultValue: "120",
          }}
        />
      )}
      <button>+</button>
      {!amountValidity && <p>Enter Valid Amount (1-20)</p>}
    </form>
  );
};

export default AdminMenuItemForm;
