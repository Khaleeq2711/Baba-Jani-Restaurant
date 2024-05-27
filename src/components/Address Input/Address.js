import React, { useEffect, useState } from "react";
import style from "./Address.module.css";
import AddressInput from "./AddressInput";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/store";
import AddressModal from "./AddressModal";

const sectors = [
  "H-13",
  "H-12 (Nust)",
  "H-11",
  "H-10",
  "I-11",
  "I-10",
  "I-9",
  "I-8",
  "G-14",
  "G-13",
  "G-12",
  "G-11",
  "G-10",
  "G-9",
  "G-8",
  "G-7",
  "F-11",
  "F-10",
  "F-8",
  "F-7",
  "F-6",
  "E-11",
  "E-9",
  "26-Number",
];
// const options = ["1", "2", "3", "4", "Markaz"];

function Address(props) {
  const [add1, setAdd1] = useState(sectors[0]);
  const [inputAdd1, setInputAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [addressValidity, setAddressValidity] = useState();

  //   const ctx = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const addressChangeHandler = (add1) => {
    setAdd1(add1);
  };
  const addressInputChangeHandler = (inputAdd1) => {
    setInputAdd1(inputAdd1);
  };
  const addressChangeHandler2 = (add2) => {
    setAdd2(add2);
  };
  const submitHandlerAddress = (e) => {
    e.preventDefault();
    if (add2 !== "") {
      dispatch(cartActions.setAddressD(`${add1} / ${add2}`));
    } else {
      dispatch(cartActions.setAddressD(`${add1}`));
    }
    props.onCartClose();
  };
  useEffect(() => {
    setAddressValidity(() => add1 !== null);

    if (add1 === "H-13" || add1 === "H-12 (Nust)")
      dispatch(cartActions.setDelivery(70)); // 1-4
    // else if ()
    //   dispatch(cartActions.setDelivery(100)); // 4-6
    else if (
      add1 === "G-11" ||
      add1 === "G-12" ||
      add1 === "G-13" ||
      add1 === "H-11" ||
      add1 === "26-Number"
    )
      dispatch(cartActions.setDelivery(120)); // 6-8
    else if (
      add1 === "H-10" ||
      add1 === "G-10" ||
      add1 === "G-14" ||
      add1 === "I-11"
    )
      dispatch(cartActions.setDelivery(150)); // 8-9
    else if (
      add1 === "G-9" ||
      add1 === "I-9" ||
      add1 === "I-10" ||
      add1 === "F-11" ||
      add1 === "F-10"
    )
      dispatch(cartActions.setDelivery(180)); // 10-12
    else if (
      add1 === "G-8" ||
      add1 === "G-7" ||
      add1 === "F-8" ||
      add1 === "F-7" ||
      add1 === "I-8" ||
      add1 === "E-9" ||
      add1 === "E-11"
    )
      dispatch(cartActions.setDelivery(220));
    else if (add1 === "F-6") dispatch(cartActions.setDelivery(250));
  }, [add1, add2, dispatch]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <AddressModal>
      <form className={style.form} onSubmit={submitHandlerAddress}>
        <h1 className={style.heading}>
          <u>Location</u>
        </h1>
        <AddressInput
          id="address"
          sectors={sectors}
          add1={add1}
          inputAdd1={inputAdd1}
          onChange={addressChangeHandler}
          onInputChange={addressInputChangeHandler}
          add2={add2}
          onChange2={addressChangeHandler2}
        />
        <button type="submit" className={style.btn} disabled={!addressValidity}>
          ADD
        </button>
        {!addressValidity ? (
          <div className={style.div1}>Please Select a Sector to Continue-!</div>
        ) : (
          <div className={style.div2}>
            Can't find your Location? <br />
            Choose Nearest Sector.
          </div>
        )}
      </form>
    </AddressModal>
  );
}
export default Address;
