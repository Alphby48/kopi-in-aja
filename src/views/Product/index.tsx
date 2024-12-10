/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { poppins } from "@/font/font";
import { lora } from "@/font/font";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const ProductsView = (props: any) => {
  const { product } = props;
  console.log(product);
  return (
    <>
      <Head>
        <title>Menu</title>
      </Head>
      <div className="w-full min-h-screen p-3">
        <h1 className={`${lora.className} text-3xl text-dark text-center`}>
          Menu di Kopi In Aja
        </h1>
        <div className="flex p-3 flex-col w-full mt-10">
          <h2 className={`${poppins.className} text-lg text-dark mb-5`}>
            Minuman Kopi
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-5 p-3 ">
            {product.map((p: any) => {
              return (
                <Link
                  href={`/product/${p.id}`}
                  className="flex justify-center items-center gap-2 flex-col bg-secondary rounded-md p-3"
                  key={p.id}
                >
                  <Image
                    className="w-36 h-20"
                    src={`/produkImg/${p.image}`}
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
        </div>
      </div>
    </>
  );
};

export default ProductsView;
