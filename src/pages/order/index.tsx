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
import { useRouter } from "next/router";

interface Product {
  id: number;
  name: string;
  price: number;
  // other properties
}

interface Order {
  idOrder: number;
  qty: number;
  price: number;
  name: string;
  // other properties
}

const OrderPage = () => {
  const { data }: any = useSession();
  const { push } = useRouter();
  const [dataOrder, setDataOrder] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [allData, setAllData] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [msg, setMsg] = useState({ status: false, message: "" });
  const [action, setAction] = useState(false);
  const [isValue, setIsValue] = useState("");
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

  useEffect(() => {
    if (dataProduct.length > 0) {
      const newOrd: any = dataOrder.map((d: any) => {
        const prd: any = dataProduct.find((p: any) => p.id === d.idOrder);
        return {
          idOrder: d.idOrder,
          qty: d.qty,
          price: prd?.price,
          name: prd?.name,
          total: prd?.price * d.qty,
        };
      });
      setAllData(newOrd);
    }
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

  const handleOrder = async (e: any) => {
    e.preventDefault();

    const dataAdd = {
      fullname: data?.user?.fullname,
      method: e.target.order.value,
      table: e.target?.table?.value || "tidak ada",
      order: allData,
    };
    await fetch("/api/orderInCashier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataAdd),
    })
      .then((res) => res.json())
      .then((res) => push("/process"))
      .catch((err) => console.log(err));

    console.log(allData);
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
                  src={`${
                    process.env.NEXT_PUBLIC_API_URL
                  }/api/serve-file?filename=${dataView!.image}`}
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
          <div className="flex gap-3 items-center">
            <form action="" className="flex gap-2" onSubmit={handleOrder}>
              <select
                className="p-2 rounded-md bg-primaryDark text-light"
                name="order"
                id="order"
                onChange={(e) => setIsValue(e.target.value)}
              >
                <option value="">Pilih Metode</option>
                <option value="dine in">Dine In</option>
                <option value="take away">Take Away</option>
              </select>
              {isValue === "dine in" && (
                <select
                  name="table"
                  id="table"
                  className="p-2 rounded-md bg-primaryDark text-light"
                >
                  <option value="meja 1">Meja 1</option>
                  <option value="meja 2">Meja 2</option>
                  <option value="meja 3">Meja 3</option>
                </select>
              )}
              <button
                type="submit"
                className="bg-accent hover:bg-secondary p-2 rounded-md text-light"
              >
                Pesan
              </button>
            </form>
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

// const dataAdd = {
//   fullname: data?.user?.fullname,
//   method: e.target.order.value,
//   table: e.target?.table?.value || "tidak ada",
//   order: dataOrder,
// };
// await fetch("/api/orderInCashier", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(dataAdd),
// })
//   .then((res) => res.json())
//   .then((res) => push("/process"))
//   .catch((err) => console.log(err));
