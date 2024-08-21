import React, { useEffect, useState } from "react";

import classes from "./AccountCard.module.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  Alert,
  Backdrop,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Modal from "../UI/Modal";
import googlePng from "../assets/google-png-pic.png";
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/store";
import { CookiesProvider, useCookies } from 'react-cookie'


const AccountCard = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showValidity, setShowValidity] = useState(false);
  const [showAlreadyExist, setShowAlreadyExist] = useState(false);
  const [showWait, setShowWait] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successG, setSuccessG] = useState(false);
  const [successC, setSuccessC] = useState(false);
  // const [userDetails, setUserDetails] = useState(null);

  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user'])


  const passwordIconClickHandler = () => setShowPassword((show) => !show);
  const passwordMouseDownHandler = (event) => {
    event.preventDefault();
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setShowWait(true);
    // signInWithEmailAndPassword();
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        console.log("USERRRRRRRR",JSON.stringify(userCredential.user)); ////////////////////////////////////////////////////
        setShowWait(false);
        setSuccess(true);
        setCookie('user', userCredential.user, { path: '/' })
        dispatch(cartActions.setuserDetails({name:userCredential.user.displayName, email: userCredential.user.email, uid: userCredential.user.uid, purl: userCredential.user.photoURL}));

        // setUserDetails(userCredential.user); // Set user details
        setTimeout(() => {
          setSuccess(false);
          setEnteredPassword("");
          setEnteredEmail("");
          props.onCartClose();
        }, 2000);
      })
      .catch((e) => {
        setShowWait(false);
        console.log(e);
        setShowValidity(true);
      });
  };
  const createHandler = (e) => {
    e.preventDefault();

    if (enteredPassword === confirmPassword) {
      setShowWait(true);
      createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userCredential) => {
          console.log("USERRRRRRRR",userCredential.user.email); ////////////////////////////////////////////////////
          setShowWait(false);
          setSuccessC(true);
          setCookie('user', userCredential.user, { path: '/' })
          dispatch(cartActions.setuserDetails({name:userCredential.user.displayName, email: userCredential.user.email, uid: userCredential.user.uid, purl: userCredential.user.photoURL}));

          // setUserDetails(userCredential.user); // Set user details
          setTimeout(() => {
            setSuccessC(false);
            setEnteredPassword("");
            setEnteredEmail("");
            setConfirmPassword("");
            props.onCartClose();
          }, 2000);
        })
        .catch((e) => {
          setShowWait(false);
          console.log(e);
          setShowAlreadyExist(true);
        });
    } else setShowValidity(true);
  };
  const googleHandler = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log("USERRRRRRRR",userCredential.user.email); ////////////////////////////////////////////////////
        setSuccessG(true);
        setCookie('user', userCredential.user, { path: '/' })
        dispatch(cartActions.setuserDetails({name:userCredential.user.displayName, email: userCredential.user.email, uid: userCredential.user.uid, purl: userCredential.user.photoURL}));
        // setUserDetails(userCredential.user); // Set user details
        setTimeout(() => {
          setSuccessG(false);
          setEnteredPassword("");
          setEnteredEmail("");
          props.onCartClose();
        }, 2000);
      })
      .catch((e) => {
        alert("Sign in with Google Failed");
      });
  };
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUserDetails(user);
  //     } else {
  //       setUserDetails(null);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Modal onCartClose={props.onCartClose}>
        {showLogin && (
          <form onSubmit={loginHandler} className={classes.loginForm}>
            <header>
              <u>Log In</u>
            </header>
            <TextField
              value={enteredEmail}
              onChange={(e) => {
                setEnteredEmail(e.target.value);
                setShowValidity(false);
              }}
              label="Email"
              size="small"
              type="email"
              required
            />
            <FormControl variant="outlined" size="small" required>
              <InputLabel htmlFor="outlined-adornment-password1">
                Password
              </InputLabel>
              <OutlinedInput
                value={enteredPassword}
                onChange={(e) => {
                  setEnteredPassword(e.target.value);
                  setShowValidity(false);
                }}
                id="outlined-adornment-password1"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={passwordIconClickHandler}
                      onMouseDown={passwordMouseDownHandler}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <div className={classes.lastDiv}>
              <Link
                className={classes.link}
                onClick={() => {
                  setShowLogin(false);
                  setShowCreate(true);
                  setShowValidity(false);
                }}
              >
                Create new Account.
              </Link>
              <button type="submit" className={classes.button}>
                Login
              </button>
            </div>
          </form>
        )}
        {showCreate && (
          <form onSubmit={createHandler} className={classes.loginForm}>
            <header>
              <u>New User</u>
            </header>
            <TextField
              value={enteredEmail}
              onChange={(e) => {
                setEnteredEmail(e.target.value);
                setShowValidity(false);
                setShowAlreadyExist(false);
              }}
              label="Email"
              size="small"
              type="email"
              required
            />
            <FormControl variant="outlined" size="small" required>
              <InputLabel htmlFor="outlined-adornment-password2">
                Password
              </InputLabel>
              <OutlinedInput
                value={enteredPassword}
                onChange={(e) => {
                  setEnteredPassword(e.target.value);
                  setShowValidity(false);
                }}
                id="outlined-adornment-password2"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={passwordIconClickHandler}
                      onMouseDown={passwordMouseDownHandler}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl variant="outlined" size="small" required>
              <InputLabel htmlFor="outlined-adornment-password3">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setShowValidity(false);
                }}
                id="outlined-adornment-password3"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={passwordIconClickHandler}
                      onMouseDown={passwordMouseDownHandler}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {showValidity && (
              <div className={classes.validityText}>
                Passwords should be atleast 6 characters and Same....
              </div>
            )}
            {showWait && (
              <div className={classes.validityText}>Please Wait....</div>
            )}
            {showAlreadyExist && (
              <div className={classes.validityText}>
                User with this Email Already Exist....Try Login.
              </div>
            )}
            <div className={classes.lastDiv}>
              <Link
                className={classes.link}
                onClick={() => {
                  setShowCreate(false);
                  setShowValidity(false);
                  setShowLogin(true);
                }}
              >
                Already have an Account.
              </Link>
              <button type="submit" className={classes.button}>
                Sign Up
              </button>
            </div>
          </form>
        )}
        <div className={classes["google-section"]}>
          <h3>
            <u>OR Sign In with</u>
          </h3>
          <button>
            <img
              src={googlePng}
              className={classes.googlePicture}
              alt="GOOGLE"
              onClick={googleHandler}
            />
          </button>
        </div>
        {showValidity && (
          <div className={classes.validityText}>
            Email and Password does not Match....
          </div>
        )}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showWait}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Modal>
      <Snackbar
        open={success || successG}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {successG
            ? "Sign in With Google Account Successful !"
            : successC
              ? "New User Created Successfully !"
              : "Login Successfully !"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AccountCard;
