import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/font/font";

type sidebarTyoe = {
  children: React.ReactNode;
};

const SidebarLayout = (props: sidebarTyoe) => {
  const { children } = props;
  return (
    <div className={`flex w-full`}>
      <aside className="w-1/5 h-screen flex flex-col gap-5 p-5 bg-light">
        <div className="flex items-center gap-3">
          <Image
            src="/logo_cafe.png"
            alt="logo"
            width={70}
            height={70}
            className="rounded-full"
          ></Image>
          <h1 className={`${poppins.className}`}>
            <span className="text-xl text-secondaryDark">Kopi</span>{" "}
            <span className="text-xl text-light">In</span>{" "}
            <span className="text-xl text-secondaryDark">Aja</span>
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href={`/admin`}
            className={`${poppins.className} p-3 bg-accent hover:bg-secondary rounded-md`}
          >
            Dashboard
          </Link>
          <Link
            href={`/admin`}
            className={`${poppins.className} p-3 bg-accent hover:bg-secondary rounded-md`}
          >
            Add Product
          </Link>
          <Link
            href={`/admin`}
            className={`${poppins.className} p-3 bg-accent hover:bg-secondary rounded-md`}
          >
            Products Control
          </Link>
          <Link
            href={`/admin`}
            className={`${poppins.className} p-3 bg-accent hover:bg-secondary rounded-md`}
          >
            Users Control
          </Link>
        </div>
      </aside>
      {children}
    </div>
  );
};

export default SidebarLayout;
