import React, { useState } from "react";
import classes from "./Header.module.css";

import CartButton from "../Cart/CartButton";
import Logo from "../assets/logo.png";
import BabaJani from "../assets/BabaJani.svg";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Backdrop,
  CircularProgress,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Logout from "@mui/icons-material/Logout";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

const Header = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const openMenu = Boolean(anchorEl);
  const profileClickHandler = () => {
    setAnchorEl(null);
    navigate("/profile"); ///////////////
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    setLoading(true);
    console.log("Loging Out.......");
    signOut(auth)
      .then(() => {
        setLoading(false);
        console.log("Logout Successful");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      })
      .catch((e) => {
        setLoading(false);
        alert("Failed to Log out...");
        console.log(e);
      });
  };
  console.log(auth);

  return (
    <>
      <header className={classes.header}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            className={classes.logo}
            height="100px"
            width="auto"
            alt="BAba Jani's Logo"
            onClick={clickHandler}
          />
          <img
            src={BabaJani}
            className={classes.heading}
            height="70px"
            width="auto"
            alt="BAba Jani's Fast Food H-13"
          />
        </div>
        {props.cartVisibility && (
          <div className={classes.rightSide}>
            <Avatar
              style={{ cursor: "pointer" }}
              onClick={props.onProfileClick}
            />
            <Avatar
              sx={{ bgcolor: deepOrange[500], cursor: "pointer" }}
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              M
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={() => setAnchorEl(null)}
              onClick={() => setAnchorEl(null)}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              disableScrollLock={true}
            >
              <MenuItem onClick={profileClickHandler}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={logoutClickHandler}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>{" "}
            <CartButton onCartOpen={props.onCartOpen} />
          </div>
        )}
      </header>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={success}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Logout Successfully !
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
