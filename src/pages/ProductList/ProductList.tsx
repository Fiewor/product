import React, { useMemo } from "react";
import { product, useGetAllProductsQuery } from "../../services/product";
import "./productlist.scss";
import Table from "../../components/Table/Table";
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { deleteProduct } from "../../features/products/productSlice";

const ProductList = () => {
  const { searchInput } = useSelector((state: any) => state.product);
  const { data, error, isLoading, isError } = useGetAllProductsQuery();
  const dispatch = useAppDispatch();
  const { productList } = useAppSelector((state) => state.product);

  const tableData = useMemo(() => {
    if (!data || !data.products) return [];
    // filter name and category by search input

    if (searchInput) {
      return data.products.filter(
        (product: product) =>
          product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          product.category.toLowerCase().includes(searchInput.toLowerCase())
      );
      // if productlist is not empty, return the productlist
    } else if (productList.length > 0) {
      return productList;
    } else {
      return data.products;
    }
  } , [data, searchInput, productList]);

  const columns = useMemo(
    () => [
      {
        Header: "Products",
        columns: [
          {
            Header: "ID",
            id: 1,
            accessor: "id",
          },
          {
            Header: "Title",
            id: 2,
            accessor: "title",
          },
          {
            Header: "Description",
            id: 3,
            accessor: "description",
          },
          {
            Header: "Price",
            id: 4,
            accessor: "price",
            // format price as dollars
            Cell: ({ cell: { value } }: {cell: {value: number}}) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(value),
          },
          {
            Header: "Photo",
            id: 5,
            accessor: "photo",
          },
          {
            Header: "rating",
            id: 6,
            accessor: "rating",
          },
          {
            Header: "Stock",
            id: 7,
            accessor: "stock",
          },
          {
            Header: "Category",
            id: 8,
            accessor: "category",
          },
          // add an extra column for the delete button
          {
            Header: "Delete Product",
            id: 9,
            accessor: "id",
            Cell: ({ cell: { value } }: {cell: {value: number}}) => (
              <button
                className="delete-button"
                onClick={() => {
                  console.log(value);
                  dispatch(deleteProduct(value));
                }}
              >
                Delete
              </button>
            ),
          },

        ],
      },
    ],
    []
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }
  // if productList is empty, return the table headers with no data
  if (productList.length === 0) {
    return <Table columns={columns} data={[]} searchInput={searchInput} />;
  }

  return <Table columns={columns} data={tableData} searchInput={searchInput} />;
};

export default ProductList;
