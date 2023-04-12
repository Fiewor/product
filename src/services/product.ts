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
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct, void>({
      query: () => `/products`,
    }),
    getProduct: builder.query<IProduct, string>({
      query: (searchInput: string) => `/search?query=${searchInput}`,
    }),
    addProduct: builder.mutation<IProduct, product>({
      query: (product: product) => ({
        url: "/products/add",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<any, number>({
      query: (id: number) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getSingleProduct: builder.query<any, number>({
      query: (id: number) => `/products/${id}`,
    }),
    // Pick out data and prevent nested properties in a hook or selector
    // transformResponse: (response: { data: Post }, meta, arg) => response.data,
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
} = productApi;
