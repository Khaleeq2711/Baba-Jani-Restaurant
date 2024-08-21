import React, { useEffect, useState } from "react";
import classes from "./Header.module.css";

import CartButton from "../Cart/CartButton";
import Profile from "../Account/Profile"
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
import { useCookies } from 'react-cookie'


const Header = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false); // State for profile modal
  const [cookies, removeCookie] = useCookies(['user'])
  const [loggedin, setloggedin] = useState(false);


  useEffect(() => {
    if (cookies.uid) {
      setloggedin(true);
    }
  }, [cookies]);


  const openMenu = Boolean(anchorEl);
  const profileClickHandler = () => {
    setAnchorEl(null);
    setProfileModalOpen(true); // Open the profile modal
  };
  const closeProfileModal = () => {
    setProfileModalOpen(false); // Close the profile modal
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
        removeCookie('user');
        setloggedin(false);
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
            {cookies.user && <Avatar
              sx={{ bgcolor: deepOrange[500], cursor: "pointer" }}
              onClick={(event) => setAnchorEl(event.currentTarget)}
              src={cookies.user?.photoURL || undefined} // Use undefined if photoURL is not present
            >
              {!cookies.user?.photoURL && <Avatar/>} {/* Fallback content */}
            </Avatar>}
            {!cookies.user && <div style={{ cursor: "pointer" }}
              onClick={props.onProfileClick}>
              <p className={classes.shimmer}>
                Sign In
              </p>
            </div>}
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
                <Avatar src={cookies.user?.photoURL || undefined} // Use undefined if photoURL is not present
            >
            </Avatar> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={logoutClickHandler}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>{" "}
            {cookies.user && <CartButton onCartOpen={props.onCartOpen} />}
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
      {profileModalOpen && <Profile onClose={closeProfileModal} />} {/* Render ProfileModal */}

    </>
  );
};

export default Header;
