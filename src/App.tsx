import { useState } from "react";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Error from "./pages/Error";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import Product from "./pages/Product/Product";
import { useGetSingleProductQuery } from "./services/product";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  Route,
} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "products/:id",
    element: <Product />,
  },
  {
    path: "form",
    element: <Form />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return <></>;
}

export default App;
