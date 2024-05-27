import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import style from "./AddressInput.module.css";

function AddressInput(props) {
  const addChangeHandler = (e) => {
    props.onChange2(e.target.value);
  };

  return (
    <div className={style.main}>
      <Autocomplete
        className={style.input}
        value={props.add1}
        onChange={(e, newValue) => {
          props.onChange(newValue);
        }}
        inputValue={props.inputAdd1}
        onInputChange={(e, newInputValue) => {
          props.onInputChange(newInputValue);
        }}
        id="controllable-states-demo"
        options={props.sectors}
        sx={{ width: 180 }}
        renderInput={(params) => <TextField {...params} label="Sector" />}
        size="small"
      />
      {/* <Autocomplete
        className={style.input}
        value={props.add2}
        onChange={(event, newValue) => {
          props.onChange2(newValue);
        }}
        inputValue={props.inputAdd2}
        onInputChange={(event, newInputValue) => {
          props.onInputChange2(newInputValue);
         */}
      <TextField
        sx={{ width: 180 }}
        label="Address"
        variant="outlined"
        size="small"
        defaultValue={props.add2}
        onChange={addChangeHandler}
      />
    </div>
  );
}

export default AddressInput;
