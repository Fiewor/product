import { useParams, useLoaderData } from "react-router-dom";
import { useGetSingleProductQuery } from "../../services/product";
import "./product.scss";

const Product = () => {
  const { id } = useParams();

  const { data, isError, error, isLoading } = useGetSingleProductQuery(+id);
  {
    console.log("data: ", data);
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Oops! An error occurred</h1>;
  }

  return (
    <>
      <h1>{data?.title}</h1>
      <div className="container">
        {data?.images.length ? (
          <img className="image" src={data.images[0]} alt={data?.title} />
        ) : (
          ""
        )}
        <div className="details">
          <p>
            <em>Brand:</em> {data?.brand}
          </p>
          <p>
            <em>Description:</em> {data?.description}
          </p>
          <p>
            <em>Price:</em> {data?.price}
          </p>
          <p>
            <em>Rating:</em> {data?.rating}
          </p>
          <p>
            <em>Stock:</em> {data?.stock}
          </p>
        </div>
      </div>
    </>
  );
};

export default Product;
