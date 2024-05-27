import classes from "./FormItem.module.css";

const FormItem = (props) => {
  const price = `Rs.${props.price.toFixed(0)}`;

  return (
    <li className={classes["form-item"]}>
      <div className={classes.name}>
        <h3>{props.name}</h3>
      </div>

      <div className={classes.summary}>
        <span className={classes.price}>{price}</span>
        <span className={classes.amount}>x {props.amount}</span>
      </div>
    </li>
  );
};

export default FormItem;
