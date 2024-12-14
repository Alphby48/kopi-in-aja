/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { poppins, lora } from "@/font/font";
import { MdRestoreFromTrash } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

import Link from "next/link";
import LoadElement from "@/components/elements/loading";

const OrderPage = () => {
  const { data }: any = useSession();
  const [dataOrder, setDataOrder] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [msg, setMsg] = useState({ status: false, message: "" });
  const [action, setAction] = useState(false);
  useEffect(() => {
    fetch(`/api/order?email=${data?.user?.email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => setDataOrder(res.data[0].order))
      .catch((err) => console.log(err));

    fetch(`/api/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => setDataProduct(res.data))
      .catch((err) => console.log(err));
  }, [data, msg]);

  useEffect(() => {
    const totalPrice = dataOrder.reduce((act: any, item: any) => {
      const product: any = dataProduct.find((p: any) => p.id === item.idOrder);

      if (product) {
        return act + parseFloat(product.price) * item.qty;
      }
    }, 0);

    setTotalOrder(totalPrice);
  }, [dataOrder, dataProduct]);

  const handleRemove = async (id: any) => {
    setAction(true);
    const dataDelete = {
      idOrder: id,
    };
    await fetch(`/api/order?email=${data?.user?.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataDelete),
    })
      .then((res) => res.json())
      .then((res) => {
        setMsg(res);
        setAction(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="text-dark w-full min-h-screen p-3">
      {msg.status && (
        <div className="bg-accent p-3 text-light rounded-md relative">
          <p>{msg.message}</p>
          <IoMdCloseCircle
            size={25}
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setMsg({ status: false, message: "" })}
          />
        </div>
      )}
      <h1 className={`${lora.className} text-2xl text-center my-3`}>
        Order Sekarang Juga
      </h1>

      {dataOrder.length === 0 && (
        <div className="flex justify-center w-full">
          <Link
            href={`/product`}
            className="bg-accent hover:bg-secondary p-3 text-light rounded-md"
          >
            Pesan Sekarang
          </Link>
        </div>
      )}

      <div className="flex flex-wrap items-center w-full p-3 gap-5 pb-14">
        {dataProduct.length > 0 &&
          dataOrder.map((d: any) => {
            const dataView: any = dataProduct.find(
              (p: any) => p.id === d.idOrder
            );
            return (
              <div
                key={d.idOrder}
                className={`${poppins.className} flex gap-10 bg-secondary p-3 text-light rounded-md`}
              >
                <Image
                  className="rounded-md w-32 h-24"
                  src={`/produkImg/${dataView!.image}`}
                  width={100}
                  height={100}
                  alt={dataView!.name}
                ></Image>
                <div className="flex flex-col gap-2">
                  <p className="font-medium text-xl">{dataView!.name}</p>
                  <p>
                    Price :{" "}
                    {parseFloat(dataView!.price).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                  <p>Order : {d.qty} pcs</p>
                  <p>
                    Total :{" "}
                    {(d.qty * dataView!.price).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                  <button
                    onClick={() => handleRemove(d.idOrder)}
                    className="flex items-center justify-center text-sm bg-accentDark hover:bg-secondaryDark p-2 rounded-md text-dark"
                  >
                    <MdRestoreFromTrash size={25} />
                  </button>
                </div>
              </div>
            );
          })}
        <div className="flex justify-between items-center bg-primary p-3 text-light rounded-md fixed bottom-0 left-5 right-5">
          <div>
            <p className="font-medium text-xl text-dark">
              Total Belanja :{" "}
              {totalOrder &&
                totalOrder.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
            </p>
          </div>
          <div>
            <button className="bg-accent hover:bg-secondary p-2 rounded-md text-light">
              Bayar Pesanan
            </button>
          </div>
        </div>
      </div>
      {action && (
        <div className="flex justify-center items-center fixed bottom-0 left-0 right-0 top-0 bg-[rgba(0,0,0,0.5)]">
          <div className="flex justify-center items-center p-10 rounded-md">
            <LoadElement w="w-32" h="h-32" color="fill-blue-600"></LoadElement>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
