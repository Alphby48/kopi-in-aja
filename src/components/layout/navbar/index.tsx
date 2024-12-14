/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const NavbarLayout = () => {
  const { data }: any = useSession();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const windowY = window.scrollY;

      if (windowY > lastScrollY && windowY > 100) {
        setVisible(false);
      } else if (windowY < lastScrollY) {
        setVisible(true);
      }

      setLastScrollY(windowY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      {visible && (
        <div className="fixed flex justify-between items-center p-1 w-full bg-[rgba(24,19,7,0.7)] border-b-2 border-primaryDark">
          <div className="flex items-center gap-3 justify-center">
            <Image
              className="rounded-full"
              src="/logo_cafe.png"
              alt="logo"
              width={70}
              height={70}
            />
            <h1 className={`${poppins.className}`}>
              <span className="text-xl text-secondary">Kopi</span>{" "}
              <span className="text-xl text-dark">In</span>{" "}
              <span className="text-xl text-secondary">Aja</span>
            </h1>
          </div>
          <div className="flex w-2/5 justify-evenly">
            <Link href="/" className={`text-xl text-dark ${poppins.className}`}>
              Home
            </Link>
            <Link
              href="/product"
              className={`text-xl text-dark ${poppins.className}`}
            >
              Menu
            </Link>
            <Link
              href="/order"
              className={`text-xl text-dark ${poppins.className}`}
            >
              Order
            </Link>
          </div>
          <div className={`flex items-center gap-3`}>
            {data && data.user.image ? (
              <Image
                className="rounded-full"
                src={data && data.user.image}
                alt="logo"
                width={60}
                height={60}
              ></Image>
            ) : null}
            <p className={`${poppins.className} text-xl text-dark`}>
              {data && data.user.fullname}
            </p>
            {data?.user?.fullname ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className={`${poppins.className} text-xl rounded-lg p-2 bg-accent`}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className={`${poppins.className} text-xl rounded-lg p-2 bg-accent`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarLayout;
