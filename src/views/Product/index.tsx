/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { poppins } from "@/font/font";
import { lora } from "@/font/font";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const ProductsView = (props: any) => {
  const { product, category } = props;
  console.log(product);
  return (
    <div className="flex flex-wrap justify-center items-center gap-5 p-3 ">
      {product
        .filter((i: any) => i.category === category)
        .map((p: any) => {
          return (
            <Link
              href={`/product/${p.id}`}
              className="flex justify-center items-center gap-2 flex-col bg-secondary rounded-md p-3"
              key={p.id}
            >
              <Image
                className="w-36 h-20"
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/serve-file?filename=${p.image}`}
                alt={p.name}
                width={100}
                height={100}
              ></Image>
              <p
                className={`${poppins.className} text-base font-medium text-light`}
              >
                {p.name}
              </p>
              <p
                className={`${poppins.className} text-base font-medium text-light`}
              >
                {parseFloat(p.price).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </Link>
          );
        })}
    </div>
  );
};

export default ProductsView;
