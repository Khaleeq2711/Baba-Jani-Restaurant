import React, { useState } from "react";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      Login
      <form onSubmit={loginHandler}>
        <h1>Register as New Member</h1>
        <input
          type="text"
          placeholder="Enter Your Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter Your Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
