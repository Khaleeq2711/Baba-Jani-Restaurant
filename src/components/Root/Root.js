import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../UI/Footer";

const Root = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
