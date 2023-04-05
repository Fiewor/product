import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "../Search/Search";
import "./header.scss";

const Header = () => {
  const nav = useNavigate();
  const location = useLocation();

  return (
    <div className="header">
      <Search />
      {location.pathname !== "/form" && (
        <button onClick={() => nav("/form")} className="header__button">
          Add Product
        </button>
      )}
    </div>
  );
};

export default Header;
