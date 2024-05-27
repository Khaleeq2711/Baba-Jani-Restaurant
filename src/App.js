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

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "admin panel username password 123", element: <Admin /> },
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
