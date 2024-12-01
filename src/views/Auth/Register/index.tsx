/* eslint-disable @typescript-eslint/no-explicit-any */
import { poppins } from "@/font/font";
import { AuthReg } from "@/lib/axios/register.axios";
import { signIn } from "next-auth/react";
//import { dataApi } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterView = () => {
  const { query } = useRouter();
  const callBackUrl = query.callbackUrl || "/";
  const [datas, setDatas] = useState({
    status: false,
    statusCode: 0,
    message: "",
  });
  const [activity, setActivity] = useState(false);
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setActivity(true);
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      fullname: e.target.fullname.value,
      role: "member",
    };

    try {
      await AuthReg(data, (call: any) => {
        setDatas(call);
        setActivity(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-light">
      <div className="flex items-center justify-center flex-col w-1/2">
        <h1
          className={`text-4xl text-light ${poppins.className} mb-2 font-bold`}
        >
          Register
        </h1>
        {activity === false && (
          <p
            className={`${poppins.className} mb-2 ${
              datas && datas?.status ? "text-green-500" : "text-red-500"
            }`}
          >
            {datas && datas?.message}
          </p>
        )}
        <form
          method="post"
          onSubmit={handleRegister}
          className="flex flex-col shadow-boxNav p-3 rounded-md bg-secondary w-3/4"
        >
          <div className="my-2 w-full flex flex-col">
            <label
              htmlFor="email"
              className={`${poppins.className} mb-1 text-light`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`${poppins.className} w-full rounded-md p-2 border-2 border-light`}
            />
          </div>
          <div className="my-2 w-full flex flex-col">
            <label
              htmlFor="fullname"
              className={`${poppins.className} mb-1 text-light`}
            >
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              className={`${poppins.className} w-full rounded-md p-2 border-2 border-light`}
            />
          </div>
          <div className="my-2 w-full flex flex-col">
            <label
              htmlFor="password"
              className={`${poppins.className} mb-1 text-light`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`${poppins.className} w-full rounded-md p-2 border-2 border-light`}
            />
          </div>
          {activity === false ? (
            <button
              className={`my-2 w-full rounded-md p-2 bg-accent text-slate-50 ${poppins.className}`}
            >
              Register
            </button>
          ) : (
            <button
              className={`my-2 w-full rounded-md p-2 bg-accent text-slate-50 ${poppins.className}`}
              disabled
            >
              Loading...
            </button>
          )}
        </form>
        <div className="flex flex-col justify-center items-center p-3 w-3/4">
          <p>Register with</p>
          <button
            className="my-2 w-full rounded-md p-2 bg-slate-50 flex items-center justify-center"
            onClick={() =>
              signIn("google", {
                callbackUrl: callBackUrl as string,
                redirect: false,
              })
            }
          >
            <Image src="/google.svg" width={30} height={30} alt="google" />
            {"Google"}
          </button>
          <p>
            {`Have an account? `}
            <Link className="text-accent" href="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
