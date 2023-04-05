import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetAllProductsQuery } from "../../services/product";
import "./home.scss";
import { allProducts } from "../../features/products/productSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import ProductList from "../ProductList/ProductList";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetAllProductsQuery();
  const { searchInput } = useAppSelector((state) => state.product);

  useEffect(() => {
    // if(error) dispatch(allProducts(error))
    // if(isLoading) dispatch(allProducts(isLoading))
    if (data && data.products) dispatch(allProducts(data.products));
  }, [data, error, isLoading]);

  return (
    <div className="home">
      <ProductList />
    </div>
  );
};

export default Home;
