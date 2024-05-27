import React, { useEffect, useRef, useState } from "react";
import style from "./Admin.module.css";
// import Card from "../UI/Card";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import AdminItem from "./AdminOrders";
import {
  getOrders,
  getShopOrders,
  getShopStatus,
  updateShopStatus,
} from "../services/orderService";
import Header from "../UI/Header";
import { Howl } from "howler";
import chaiyanchaiyan from "../assets/chaiyanchaiyan.mp3";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminMenu from "./AdminMenu";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AdminInventory from "./AdminInventory";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [shopOrders, setShopOrders] = useState([]);
  const [showLogin, setShowLogin] = useState(true); /////////////////////////////
  const [showOrders, setShowOrders] = useState(false); /////////////////////////////
  const [showInventory, setShowInventory] = useState(false); /////////////////////////////
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [prevOrdersLength, setPrevOrdersLength] = useState(0);
  const [shop, setShop] = useState(false);
  const soundRef = useRef(null);
  const dropdownRef = useRef(null);
  // const ctx = useSelector((state) => state.cartReducer);
  // const dispatch = useDispatch();

  const fetchOrders = async () => {
    try {
      const ordersData = await getOrders();
      const ordersArray = Object.values(ordersData);
      setOrders(ordersArray);
    } catch (error) {
      <h1>Error Fetching Order</h1>;
    }
  };
  const fetchShopOrders = async () => {
    try {
      const ordersData = await getShopOrders();
      const ordersArray = Object.values(ordersData);
      setShopOrders(ordersArray);
    } catch (error) {
      <h1>Error Fetching Order</h1>;
    }
  };
  const fetchShopStatus = async () => {
    try {
      const shopS = await getShopStatus();
      setShop(shopS.status);
    } catch (error) {
      <h1>Error Fetching Shop Status</h1>;
    }
  };
  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, enteredUsername, enteredPassword)
      .then((userCredential) => {
        console.log(userCredential);
        console.log("Login Succesful !");
        setEnteredPassword("");
        setEnteredUsername("");
        setShowLogin(false);
        setShowOrders(true);
        fetchOrders();
        fetchShopOrders();
        fetchShopStatus();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const switchHandler = (e) => {
    const s = { status: e.target.checked };
    setShop(s.status);

    updateShopStatus(s)
      .then((response) => {
        console.log("Status sent successfully:", response);
        // props.onFormOrder();
      })
      .catch((error) => {
        // props.onFormError();
        window.alert("Error while Changing Shop Status ☹ .");
        console.log("Error while Changing Shop Status:", error);
      });
  };
  const doneHandler = () => {
    fetchShopOrders();
  };
  const inventoryHandler = () => {
    setShowInventory((showInventory) => !showInventory);
  };
  const downloadPdf = () => {
    html2canvas(dropdownRef.current, { backgroundColor: "#000000" }).then(
      (canvas) => {
        const pdf = new jsPDF("p", "pt", "a4");
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 600;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        let heightLeft = imgHeight - pdf.internal.pageSize.height;
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdf.internal.pageSize.height;
        }
        pdf.save(`BabaJanis Orders.pdf`);
      }
    );
  };
  useEffect(() => {
    if (orders.length > prevOrdersLength) {
      const sound = new Howl({
        src: [chaiyanchaiyan],
      });
      sound.play();
      // console.log("runningg");
      soundRef.current = sound;
      setPrevOrdersLength(orders.length);
    }
    //////////////////////////////////////////Stopping
    const stopSound = () => {
      if (soundRef.current) soundRef.current.stop();
    };
    document.addEventListener("click", stopSound);
    return () => {
      document.removeEventListener("click", stopSound);
    };
  }, [orders]);
  useEffect(() => {
    fetchShopStatus();
    let prevInterval;
    const checkAndReload = () => {
      if (showOrders) {
        fetchOrders();
        fetchShopStatus();
      }
    };
    if (showOrders) {
      prevInterval = setInterval(checkAndReload, 10000);
    }
    return () => {
      clearInterval(prevInterval);
    };
  }, [showOrders]);

  let dayTotals = 0;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={style.admin}>
      <Header />
      {showLogin && (
        <div>
          <form onSubmit={loginHandler} className={style.loginForm}>
            <u>Who Are You ?</u>
            <br />
            <label>
              Email
              <input
                type={"text"}
                value={enteredUsername}
                onChange={usernameChangeHandler}
              />
            </label>
            <label>
              Password
              <input
                type={"password"}
                value={enteredPassword}
                onChange={passwordChangeHandler}
              />
            </label>
            <button type="submit"> Login</button>
          </form>
        </div>
      )}
      {showOrders && (
        <>
          <h1>
            <u>ADMIN PANEL</u>
          </h1>
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ m: 2 }}
                checked={shop}
                onChange={switchHandler}
              />
            }
            label="Restaurant"
            sx={{
              borderTop: "4px solid white",
              borderBottom: "4px solid white",
              borderLeft: "1px solid grey",
              borderRight: "1px solid grey",
              padding: "5px 20px",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <button className={style.inventoryBtn} onClick={inventoryHandler}>
              {showInventory ? "Order Mode" : "Inventory Mode"}
            </button>
          </div>
          {!showInventory ? (
            <>
              <div className={style.card}>
                <AdminMenu onDone={doneHandler} />
              </div>
              <div className={style.card}>
                <header className={style.header}>ORDER LIST</header>
                <div className={style.form}>
                  <div className={style.part} ref={dropdownRef}>
                    <header>Shop Orders</header>
                    {shopOrders.length === 0 ? (
                      <h3>Empty...</h3>
                    ) : (
                      shopOrders?.map((order, index) => {
                        dayTotals += order.totalPrice;
                        return (
                          <AdminItem
                            key={index}
                            count={index}
                            items={order?.food}
                            totalPrice={order?.totalPrice}
                            payment={order.payment}
                            time={order?.time}
                          />
                        );
                      })
                    )}
                    <h1
                      style={{
                        borderTop: "4px solid white",
                        borderBottom: "4px solid white",
                      }}
                    >
                      Day Total: {dayTotals}
                    </h1>
                    <Button onClick={downloadPdf}>Download as PDF</Button>
                  </div>
                  <div className={style.part1}>
                    <header>Online Orders</header>
                    {orders.length === 0 ? (
                      <h3>Empty...</h3>
                    ) : (
                      orders?.map((order, index) => {
                        return (
                          <AdminItem
                            key={index}
                            items={order?.food}
                            totalPrice={order?.totalPrice}
                            name={order?.name}
                            address={order?.address}
                            phone={order?.phone}
                            time={order?.time}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <AdminInventory />
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
