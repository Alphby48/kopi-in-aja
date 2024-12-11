/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { poppins } from "@/font/font";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { lora } from "@/font/font";
import { useState } from "react";

import CustomErrorPage from "../404";
const DetailProductPage = ({ product }: any) => {
  console.log(product);
  const [state, setState] = useState(1);
  const handlePlus = () => {
    if (state < product.stock) {
      setState(state + 1);
    }
  };
  const handleMinus = () => {
    if (state > 1) {
      setState(state - 1);
    }
  };

  if (product) {
    return (
      <div>
        <div className="flex justify-around items-center w-full min-h-screen text-dark">
          <div className="w-1/2 flex justify-center items-center">
            <Image
              src={`/produkImg/${product.image}`}
              alt="logo"
              width={400}
              height={200}
            ></Image>
          </div>
          <div className="flex flex-col w-1/2">
            <h1
              className={`${lora.className} text-4xl font-semibold text-center capitalize mb-5`}
            >
              {product.name}
            </h1>
            <p className={`${poppins.className} font-medium text-lg mb-3`}>
              Harga Menu :{" "}
              {parseFloat(product.price).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p className={`${poppins.className} font-normal text-lg mb-3`}>
              Stok Menu : {product.stock} pcs
            </p>
            <div className="flex w-full mt-8 justify-around items-center">
              <div className="flex justify-center items-center gap-6">
                <button
                  className="p-2 bg-accent rounded-lg text-light"
                  onClick={handleMinus}
                >
                  <FaMinus size={20} />
                </button>
                <p>{state} pcs</p>
                <button
                  className="p-2 bg-accent rounded-lg text-light"
                  onClick={handlePlus}
                >
                  <FaPlus size={20} />
                </button>
              </div>
              <div>
                <button className="py-2 px-4 bg-accent rounded-lg text-light flex gap-3 justify-center items-center">
                  <FaCartPlus size={20} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <CustomErrorPage></CustomErrorPage>;
  }
};

export default DetailProductPage;

export const getServerSideProps = async (contex: any) => {
  const { product } = contex.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${product}`
  );
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
};
