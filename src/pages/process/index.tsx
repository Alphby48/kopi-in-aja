/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { poppins } from "@/font/font";

const ProcessPage = () => {
  const { data }: any = useSession();
  const [dataOrder, setDataOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    fetch(`/api/process?fullname=${data?.user?.fullname}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setDataOrder(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [data]);

  return (
    <div
      className={`${poppins.className} flex flex-col gap-5 w-full min-h-screen p-4 text-dark`}
    >
      {dataOrder.length > 0 &&
        dataOrder.map((data: any) => {
          return (
            <div
              key={data.id}
              className=" bg-primaryDark text-light p-3 rounded-sm"
            >
              <p className="text-xl font-medium">Pesanan: {data.fullname}</p>
              <p className="text-lg font-medium">
                {data.method}

                {data.table !== "tidak ada" ? (
                  <span>{` | ${data.table}`}</span>
                ) : null}
              </p>

              <div className="bg-secondary rounded-sm p-3 mt-3">
                <table>
                  <tr>
                    <td className="pe-4 text-xl font-medium">Menu</td>
                    <td className="pe-4 text-xl font-medium">Jumlah</td>
                    <td className="pe-4 text-xl font-medium">Harga</td>
                    <td className="pe-4 text-xl font-medium">Total</td>
                  </tr>
                  {data.order.map((order: any) => {
                    return (
                      <tr key={order.idOrder}>
                        <td className="pe-4 text-base">{order.name}</td>
                        <td className="pe-4 text-center">{order.qty}</td>
                        <td className="pe-4 text-end">{order.price}</td>
                        <td className="pe-4">{order.total}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>

              <div className="flex justify-between items-center mt-3">
                <p className="text-xl font-bold">Total Order : {data.totals}</p>
                <div className="p-3 bg-accent text-lg rounded-sm">
                  {data.orderStatus}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProcessPage;
