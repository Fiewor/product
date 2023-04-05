import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { defaultProductList } from "../defaultProductList";
import {} from "../../features/products/productSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useGetProductQuery } from "../../services/product";
import { setSearchInput } from "../../features/products/productSlice";
import "./search.scss";

const Search = () => {
  const dispatch = useAppDispatch();

  const { productList } = useAppSelector((state) => state.product);
  const handleChange = ({ value }: any) => {
    dispatch(setSearchInput(value));
  };

  const options = productList.reduce((acc: any, { category, title }) => {
    if (!acc.some((option: any) => option.value === category)) {
      acc.push({ label: category, value: category });
    }
    if (!acc.some((option: any) => option.value === title)) {
      acc.push({ label: title, value: title });
    }
    return acc;
  }, []);

  return (
    <Select
      placeholder="Search for product by title or category"
      options={options}
      onChange={(value) => handleChange(value)}
      styles={{
        container: (baseStyles) => ({
          ...baseStyles,
          width: "90vmin",
          padding: ".5rem 0",
          display: "inline-block",
          margin: "0 0.5rem",
        }),
      }}
    />
  );
};

export default Search;
