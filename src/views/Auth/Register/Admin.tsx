/* eslint-disable @typescript-eslint/no-explicit-any */
import { poppins } from "@/font/font";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
const AdminRegisterView = () => {
  const { data } = useSession();
  const [info, setInfo] = useState({ status: false, message: "" });
  const [activity, setActivity] = useState(false);

  const handleRegAdmin = async (e: any) => {
    e.preventDefault();
    setActivity(false);
    const addData = {
      email: data?.user?.email,
      token: e.target.token.value,
    };
    console.log(addData);

    await fetch("/api/register/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addData),
    })
      .then((res) => res.json())
      .then((call) => {
        if (call.status) {
          setInfo(call);
          setActivity(true);
        } else {
          setInfo(call);
          setActivity(true);
        }
      });
  };
  return (
    <div className="flex justify-center items-center h-screen w-full bg-light">
      <div className="flex flex-col items-center w-1/2">
        <h1 className={`${poppins.className} text-xl text-light mb-3`}>
          Token Admin
        </h1>
        {activity && (
          <p
            className={`${poppins.className} mb-2 text-lg ${
              info.status ? "text-green-500" : "text-red-500"
            }`}
          >
            {info.message}
          </p>
        )}
        <form
          method="put"
          onSubmit={handleRegAdmin}
          className="flex flex-col shadow-boxNav p-3 rounded-md bg-secondary w-3/4"
        >
          <div className="my-2 w-full flex flex-col">
            <label
              htmlFor="token"
              className={`${poppins.className} mb-1 text-light`}
            >
              Token
            </label>
            <input
              type="text"
              name="token"
              required
              autoComplete="off"
              id="token"
              className={`${poppins.className} w-full rounded-md p-2 border-2 border-light`}
            />
          </div>
          <button
            type="submit"
            className={`${poppins.className} p-2 rounded-md bg-primary text-white mt-3`}
          >
            Submit
          </button>
        </form>
        {info.status && (
          <div className="flex flex-col p-3 ">
            <p>Proses berhasil. Silahkan logout lalu login kembali</p>
            <div className="flex justify-center items-center">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={`${poppins.className} p-2 rounded-md bg-primary text-white mt-3`}
              >
                logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRegisterView;
