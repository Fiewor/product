import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Error from "./pages/Error";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
