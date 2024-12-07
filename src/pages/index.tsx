import Image from "next/image";
import { poppins } from "@/font/font";
import Head from "next/head";
//import { playfair } from "@/font/font";
import { lora } from "@/font/font";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="" style={{ height: "1000px" }}>
        <main className="bg-[url('/bg_cafe1.png')] w-full min-h-screen bg-cover bg-center bg-fixed">
          <div className="absolute -bottom-24 left-0 w-full h-1/3 bg-gradient-to-t from-[#181307] via-[#181307]/50 to-transparent blur-sm"></div>
          <div className="flex justify-center items-center w-full min-h-screen">
            <div className="flex flex-col justify-center items-center">
              <h1 className={`${lora.className} text-5xl text-secondary mb-5`}>
                Kopi In Aja dulu...
              </h1>
              <p className={`${lora.className} text-2xl text-dark `}>
                biar kalian nggak bosan
              </p>
              <div className="flex justify-center items-center">
                <Link
                  href={`/product`}
                  className="bg-accent hover:bg-secondary px-5 py-2 mt-5 rounded-md"
                >
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          </div>
        </main>
        <section className="flex flex-col w-full mt-7">
          <h1
            className={`${lora.className} text-3xl text-secondary mb-5 text-center`}
          >
            Kenapa harus Kopi In Aja?
          </h1>
          <div className="flex justify-around items-center w-full p-3">
            <div>
              <Image
                src={"/img_cafe.jpg"}
                width={400}
                height={300}
                alt="cafe"
                className="rounded-lg"
              ></Image>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <p className={`${poppins.className} text-base text-dark w-4/5`}>
                karena dengan minum kopi di Kopi In Aja, kalian bisa menikmati
                berbagai macam makanan, minuman dari kopi dan banyak lain lagi.
                Kopi In Aja menawrkan tempat yang estetik dan elegan, cocok
                untuk bekerja, nugas, nongkrong dan lain-lain
              </p>
              <div className="mt-5">
                <Link
                  href={`/product`}
                  className="bg-accent hover:bg-secondary px-5 py-2 rounded-md"
                >
                  Menu Produk
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
