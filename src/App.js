///////////////////////////////////////////REDUX, ACCOUNT DETAILS, NAME AVATAR, 
import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root/Root";
import Home from "./components/home/Home";
import Admin from "./components/Admin/Admin";
import ReactGA from 'react-ga4';
import { loadStripe } from "@stripe/stripe-js";
import Success from "./components/Form/Success";
import Cancel from "./components/Form/Cancel";



ReactGA.initialize("G-9QTVJBH0G0", { debug: true });


const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "admin panel username password", element: <Admin /> },
      { path: "success", element: <Success /> },
      { path: "cancel", element: <Cancel /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {


  return (
    <div className="App">
      <RouterProvider router={myRouter} />
    </div>
  );
}
export default App;

//shop
//    status:true
