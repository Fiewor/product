import { useEffect } from "react";
import { useGetAllProductsQuery } from "../../services/product";
import "./home.scss";
import { allProducts } from "../../features/products/productSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import ProductList from "../ProductList/ProductList";
import Header from "../../components/Header/Header";

const Home = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetAllProductsQuery();

  useEffect(() => {
    // if(error) dispatch(allProducts(error))
    // if(isLoading) dispatch(allProducts(isLoading))
    if (data && data.products) dispatch(allProducts(data.products));
  }, [data, error, isLoading]);

  return (
    <div className="home">
      <Header />
      <ProductList />
    </div>
  );
};

export default Home;
