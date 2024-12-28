/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket/socket";
const OrderControlView = () => {
  const { data }: any = useSession();
  const [dataOrder, setDataOrder] = useState<any>([]);
  const [dataSocket, setDataSocket] = useState(null);

  useEffect(() => {
    socket.connect();
    socket.on("admin", (dataSoc: any) => {
      setDataSocket(dataSoc);
    });
  }, []);

  useEffect(() => {
    fetch(`/api/admin/process`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setDataOrder(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [dataSocket]);

  const handleChange = async (e: any) => {
    e.preventDefault();
    const dataUpdate = {
      id: e.target.id.value,
      statusOrder: e.target?.statusOrder?.value,
    };
    console.log(dataUpdate);
  };

  return (
    <div className="w-4/5 min-h-screen bg-slate-50 relative">
      <div className="flex flex-wrap p-4 gap-4">
        {dataOrder.length > 0 &&
          dataOrder.map((data: any) => {
            return (
              <div
                key={data.id}
                className=" bg-primaryDark text-light p-3 rounded-sm w-2/5 min-h-32"
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

                <div className="flex flex-col gap-3 mt-3">
                  <p className="text-xl font-bold">
                    Total Order : {data.totals}
                  </p>
                  <div className="p-3 bg-accent text-lg rounded-sm">
                    <form onSubmit={handleChange} className="flex gap-3">
                      <input type="hidden" name="id" value={data.id} id="id" />
                      <select name="statusOrder" id="statusOrder">
                        <option value={data.orderStatus}>
                          {data.orderStatus}
                        </option>
                        <option value="pesanan diproses">
                          Pesanan Diproses
                        </option>
                        <option value="pesanan selesai">Pesanan Selesai</option>
                      </select>
                      <button
                        type="submit"
                        className="text-light py-0 px-2 bg-light"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {dataSocket !== null && (
        <div className=" absolute top-3 right-3 p-5 bg-light rounded-md">
          <p>Pesanan dari {dataSocket}</p>
        </div>
      )}
    </div>
  );
};

export default OrderControlView;
