import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import UserForm from "../Form/UserForm";
import BannerHome from "../home/Banner";
import MealsAvailable from "../Meals/MealsAvailable";
import MealsSummary from "../Meals/MealsSummary";
import Header from "../UI/Header";

import OrderDone from "../OrderDone/OrderDone";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/store";
import Address from "../Address Input/Address";
import { getShopStatus } from "../services/orderService";
import AccountCard from "../Account/AccountCard";

function Home() {
  const [cartShow, setCartShow] = useState(false);
  const [formShow, setFormShow] = useState(false);
  const [orderShow, setOrderShow] = useState(false);
  const [addressShow, setAddressShow] = useState(true);
  const [accountShow, setAccountShow] = useState(false);

  const [shop, setShop] = useState(true);

  const dispatch = useDispatch();
  const ctx = useSelector((state) => state.cartReducer);

  const fetchShopStatus = async () => {
    try {
      const shopS = await getShopStatus();
      setShop(shopS.status);
    } catch (error) {
      <h1>Error Fetching Shop Status</h1>;
    }
  };

  const CartOpenHandler = () => {
    if (ctx.orderStatus !== true) {
      setCartShow(true);
      setOrderShow(false);
    } else if (ctx.orderStatus === true) {
      setOrderShow(true);
      setCartShow(false);
    }
  };
  const CartCloseHandler = () => {
    setCartShow(false);
    setAddressShow(false);
  };
  const CartOrderHandler = () => {
    setCartShow(false);
    setFormShow(true);
  };
  const formOrderHandler = () => {
    setFormShow(false);
    setOrderShow(true);
    dispatch(cartActions.orderPlaced());
    setTimeout(() => {
      dispatch(cartActions.emptyCart());
      setOrderShow(false);
    }, 1800000);
  };
  const closeHandler = () => {
    setOrderShow(false);
    setFormShow(false);
    setAccountShow(false);
  };
  const profileClickHandler = () => {
    setAccountShow(true);
  };
  // console.log(ctx.shopStatus);

  useEffect(() => {
    fetchShopStatus();
  }, []);
  useEffect(() => {
    fetchShopStatus();
  }, [addressShow]);

  return (
    <>
      {shop ? (
        <>
          {addressShow && <Address onCartClose={CartCloseHandler} />}
          <Header
            onCartOpen={CartOpenHandler}
            cartVisibility={true}
            onProfileClick={profileClickHandler}
          />
          <BannerHome />
          <MealsSummary />
          <MealsAvailable />

          {cartShow && (
            <Cart
              onCartClose={CartCloseHandler}
              onCartOrder={CartOrderHandler}
            />
          )}
          {formShow && (
            <UserForm
              onFormClose={closeHandler}
              onFormOrder={formOrderHandler}
              onFormError={closeHandler}
            />
          )}
          {orderShow && (
            <OrderDone
              // status={orderStatus}
              onClose={closeHandler}
              // onFormOrder={FormOrderHandler}
            />
          )}
          {accountShow && <AccountCard onCartClose={closeHandler} />}
        </>
      ) : (
        <h2 style={{ padding: "20px", color: "aliceblue" }}>
          Restaurent Closed at the Moment. 🙄
        </h2>
      )}
    </>
  );
}
export default Home;
