import './index.css';
// import reportWebVitals from './reportWebVitals';

import * as React from "react";
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import Addproduct from './component/Addproduct';
import Aboutus from './component/Aboutus';
import Cart from './component/Cart';
import LikedProducts from './component/LikedProducts';
import ProductDetails from './component/ProductDetails';

// Temporary About component (you can create About.js separately later)
function About() {
  return <h2>About Page</h2>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/addproduct",
    element: <Addproduct />,
  },
  {
    path: "/aboutus",
    element: <Aboutus />,
  },
  {
    path: "/likedproducts",
    element: <LikedProducts />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
