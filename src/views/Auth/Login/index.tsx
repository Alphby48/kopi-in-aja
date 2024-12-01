/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { poppins } from "@/font/font";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginView = () => {
  const { push, query } = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const callbackUrl = query.callbackUrl || "/";
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: callbackUrl as string,
      });

      if (res?.error) {
        setLoading(false);
        setError("Invalid email or password");
      } else {
        setLoading(false);
        push(callbackUrl as string);
      }
    } catch (error) {
      setLoading(false);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-light">
      <div className="flex items-center justify-center flex-col w-1/2">
        <h1
          className={`text-4xl text-light ${poppins.className} mb-2 font-bold`}
        >
          Login
        </h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form
          method="post"
          onSubmit={handleLogin}
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
          <button
            type="submit"
            className={`my-2 w-full rounded-md p-2 bg-accent text-slate-50 ${poppins.className}`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex flex-col justify-center items-center p-3 w-3/4">
          <p>Login with</p>
          <button
            className="my-2 w-full rounded-md p-2 bg-slate-50 flex items-center justify-center"
            onClick={() =>
              signIn("google", {
                callbackUrl: callbackUrl as string,
                redirect: false,
              })
            }
          >
            <Image src="/google.svg" width={30} height={30} alt="google" />
            {"Google"}
          </button>
          <p>
            {`Don't have an account? `}
            <Link className="text-accent" href="/auth/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
