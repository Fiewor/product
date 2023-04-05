import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addToProductList,
  INewProduct,
} from "../../features/products/productSlice";
import { product } from "../../services/product";
import "./form.scss";

const SignUpForm = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [newProduct, setNewProduct] = useState<INewProduct>({
    name: "",
    author: "",
    yearOfPublication: 0,
    rating: 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nav("/");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      yearOfPublication: "",
      rating: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(300, "Must be 300 characters or less")
        .required("Required"),
      author: Yup.string()
        .max(200, "Must be 200 characters or less")
        .required("Required"),
      yearOfPublication: Yup.number()
        // year must be a valid 4 digit number
        .max(2023, "Must be a valid year")
        .min(0, "Must be a valid year")
        .required("Required"),
      rating: Yup.number()
        .moreThan(0, () => "Rating must be more than 0")
        .lessThan(10, () => "Rating must be less than 10")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(addToProductList(values));
    },
  });

  return (
    <div className="container">
      <>
        {formik.isSubmitting ? (
          <h1>Submitting...</h1>
        ) : formik.submitCount > 0 &&
          Object.keys(formik.errors).length === 0 ? (
          nav("/")
        ) : (
          <>
            <h1>Add new product</h1>
            <form onSubmit={formik.handleSubmit} className="form">
              <div className="form__content">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="form__error">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form__content">
                <label htmlFor="author">Author</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                />
                {formik.touched.author && formik.errors.author ? (
                  <div className="form__error">{formik.errors.author}</div>
                ) : null}
              </div>

              <div className="form__content">
                <label htmlFor="yearOfPublication">Year Of Publication</label>
                <input
                  id="yearOfPublication"
                  name="yearOfPublication"
                  type="string"
                  onChange={formik.handleChange}
                  value={formik.values.yearOfPublication}
                />
                {formik.touched.yearOfPublication &&
                formik.errors.yearOfPublication ? (
                  <div className="form__error">
                    {formik.errors.yearOfPublication}
                  </div>
                ) : null}
              </div>

              <div className="form__content">
                <label htmlFor="rating">Rating</label>
                <input
                  id="rating"
                  name="rating"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.rating}
                />
                {formik.touched.rating && formik.errors.rating ? (
                  <div className="form__error">{formik.errors.rating}</div>
                ) : null}
              </div>

              <button type="submit" className="button">
                Submit
              </button>
            </form>
          </>
        )}
      </>
    </div>
  );
};

export default SignUpForm;
