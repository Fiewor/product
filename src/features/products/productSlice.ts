import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { product } from "../../services/product";

export interface INewProduct {
  name: string;
  author: string;
  yearOfPublication: string | number;
  rating: string | number;
}

interface IProductState {
  searchInput: string;
  productList: product[] | any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: IProductState = {
  searchInput: "",
  productList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    allProducts: (state, action: PayloadAction<any>) => {
      state.productList = action.payload;
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    addToProductList: (state, action: PayloadAction<INewProduct>) => {
      state.productList.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productList = state.productList.filter(
        (product: product) => product.id !== action.payload
      );
    },
  },
});

export const { allProducts, setSearchInput, addToProductList, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
