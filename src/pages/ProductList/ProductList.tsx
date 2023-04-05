import React, { useMemo } from "react";
import { product, useGetAllProductsQuery } from "../../services/product";
import "./productlist.scss";
import Table from "../../components/Table/Table";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { searchInput } = useSelector((state: any) => state.product);
  const { data, error, isLoading, isError } = useGetAllProductsQuery();

  const tableData = useMemo(() => {
    if (!data || !data.products) return [];
    // filter name and category by search input

    if (searchInput) {
      return data.products.filter(
        (product: product) =>
          product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          product.category.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      return data.products;
    }
  }, [data, searchInput]);

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
            Cell: ({ cell: { value: number } }) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(number),
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

  return <Table columns={columns} data={tableData} searchInput={searchInput} />;
};

export default ProductList;
