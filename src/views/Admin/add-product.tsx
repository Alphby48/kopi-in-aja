/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { poppins } from "@/font/font";
import { lora } from "@/font/font";
import { FormEvent, useState } from "react";
import Image from "next/image";

//import { AddProductsev } from "@/lib/axios/addproduct";
const AddProductView = () => {
  const [harga, setHarga] = useState("");
  const [image, setImage] = useState("/logo_cafe.png");
  const [isData, setIsData] = useState({
    status: false,
    statusCode: 0,
    message: "",
  });
  const [visible, setVisible] = useState(false);
  const numberFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const [stok, setStok] = useState("");

  const handlePreview = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSending = async (e: any) => {
    e.preventDefault();
    setVisible(false);
    const file = e.target.uploaded_file.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("price", harga);
    formData.append("stock", stok);
    formData.append("image", file);
    formData.append("category", e.target.category.value);

    await fetch("http://localhost:3000/api/admin/add-product", {
      method: "POST",

      body: formData,
    })
      .then((res) => res.json())
      .then((call) => {
        setIsData(call);
        setVisible(true);
      })
      .catch((err) => console.log(err));

    // try {
    //   await AddProductsev(formData, (call: any) => {
    //     setIsData(true);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="w-4/5 min-h-screen bg-slate-50 flex flex-col items-center p-3">
      <h1 className={`${lora.className} text-2xl text-center`}>
        Tambah Menu Produk
      </h1>
      {visible && (
        <p
          className={`${poppins.className} ${
            isData.status ? "text-green-600" : "text-red-600"
          }`}
        >
          {isData.message}
        </p>
      )}
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSending}
        className={`${poppins.className} flex gap-5 p-3 w-full`}
      >
        <div className="flex flex-col gap-3 my-5 w-1/2">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nama Produk</label>
            <input
              className="py-1 px-2 border-2 border-secondary rounded-md"
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="price">Harga Produk</label>
            <input
              className="py-1 px-2 border-2 border-secondary rounded-md"
              type="text"
              name="price"
              value={harga}
              id="price"
              required
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setHarga(value);
                }
              }}
              autoComplete="off"
            />
            <p className="text-sm text-red-400">{`* ${numberFormat.format(
              parseInt(harga)
            )}`}</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category">Kategori Produk</label>
            <select
              name="category"
              id="category"
              required
              className="py-1 px-2 border-2 border-secondary rounded-md"
            >
              <option value=""></option>
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="kopi">Kopi</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="price">Stok Produk</label>
            <input
              className="py-1 px-2 border-2 border-secondary rounded-md"
              type="text"
              name="price"
              required
              value={stok}
              id="price"
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setStok(value);
                }
              }}
              autoComplete="off"
            />
            <p className="text-sm text-red-400">{`* ${stok} pcs`}</p>
          </div>
          <div>
            <button
              type="submit"
              className="bg-accent hover:bg-secondary px-5 py-2 mt-5 rounded-md"
            >
              Tambah
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 my-5 w-1/2 items-center">
          <p>Preview</p>
          <div className="flex flex-col gap-1 items-center">
            <Image src={image} alt="logo" width={200} height={200}></Image>
            <div className="flex flex-col gap-1">
              <label htmlFor="uploaded_file">Upload Gambar Product</label>
              <input
                className="border-2 border-secondary rounded-md"
                type="file"
                accept="image/*"
                name="uploaded_file"
                id="uploaded_file"
                onChange={handlePreview}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductView;
