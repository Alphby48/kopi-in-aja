/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { poppins } from "@/font/font";
import { lora } from "@/font/font";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import ProductsView from "@/views/Product";

const ProductsPage = (props: any) => {
  const { product } = props;

  return (
    <>
      <Head>
        <title>Menu</title>
      </Head>
      <div className="w-full min-h-screen p-3">
        <h1 className={`${lora.className} text-4xl text-dark text-center`}>
          Menu di Kopi In Aja
        </h1>
        <div className="flex p-3 flex-col w-full mt-10">
          <h2 className={`${poppins.className} text-2xl text-dark mb-5`}>
            Minuman Kopi
          </h2>
          <ProductsView product={product} category="kopi"></ProductsView>
          <h2 className={`${poppins.className} text-2xl text-dark mt-20 mb-5`}>
            Minuman Lainnya
          </h2>
          <ProductsView product={product} category="minuman"></ProductsView>
          <h2 className={`${poppins.className} text-2xl text-dark mt-20 mb-5`}>
            Makanan
          </h2>
          <ProductsView product={product} category="makanan"></ProductsView>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
};
