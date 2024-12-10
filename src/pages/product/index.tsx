/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductsView from "@/views/Product";
import { useState } from "react";

const ProductsPage = (props: any) => {
  const { product } = props;

  const data = product.filter((p: any) => p.category === "kopi");

  return <ProductsView product={data}></ProductsView>;
};

export default ProductsPage;

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:3000/api/products`);
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
};
