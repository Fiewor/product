import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export interface IProduct {
  limit: number;
  products: product[];
  skip: number;
  total: number;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct, void>({
      query: () => `/products`,
    }),
    getProduct: builder.query<IProduct, string>({
      query: (searchInput: string) => `/search?query=${searchInput}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductQuery } = productApi;
