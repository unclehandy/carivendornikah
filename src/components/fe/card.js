"use client";
import { useState, useEffect } from "react";
import { checkEnvironment } from "@/config/apiUrl";

export default function Card() {
  const [produkData, setProdukData] = useState([]);

  useEffect(() => {
    async function fetchProduk() {
      try {
        const response = await fetch(`${checkEnvironment()}/api/produk`);
        if (!response.ok) {
          throw new Error("Failed to fetch produk data");
        }
        const data = await response.json();
        setProdukData(data.data); // asumsi data API memiliki struktur yang sama dengan respons yang dikirimkan
      } catch (error) {
        console.error("Error fetching produk data:", error);
      }
    }

    fetchProduk();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-whitye font-bold ">Data Produk</h1>
      <div className="produk-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-9">
        {produkData.map((produk) => (
          <div
            className="card card-compact  bg-slate-100 shadow-xl"
            key={produk.id}
          >
            <figure className=" h-48 w-full">
              <img
                src={`https://nikahdevscale.s3.ap-south-1.amazonaws.com/products/${produk.user_id}/${produk.gambar}`}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title capitalize">{produk.nama}</h2>
              <div className="flex flex-row justify-between ju w-full ">
                <div>{produk.harga}</div>
                <div>
                  <div className="badge badge-outline">
                    {produk.kategori.kategori}
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
