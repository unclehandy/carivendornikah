"use client";
import { useState, useEffect } from "react";
import { TemplateUser } from "@/components/templateUser";
import { UserRound } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { checkEnvironment } from "@/config/apiUrl";

import React from 'react'


export const ProductDisplayUser = () => {
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


  const addToCart = async (id) => {
    try {
      const response = await fetch(`${checkEnvironment()}/api/keranjang`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              user_id: JSON.parse(localStorage.getItem("user")).id, // Replace with actual user ID
              produk_id: id, // Assuming your produkData contains the ID
              status: "x",
              qty: 1
          }),
      });

      toast.success("sukses menambah ke keranjang");
      if (!response.ok) {
          throw new Error('Failed to add to cart');
      }
      console.log('Added to cart successfully');
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error, e.g., show an error message
    }
  };


  return (
    <TemplateUser>
      <div className="produk-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-9">
        {produkData.map((produk) => (
          <div
            className="card card-compact  bg-base-100 shadow-xl"
            key={produk.id}
          >
            <figure  className=" h-48 w-full">
              <img
                src={`https://nikahapp.s3.ap-southeast-1.amazonaws.com/products/${produk.user_id}/${produk.gambar}`}
              
               
               
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title capitalize">{produk.nama}</h2>
              <div className="flex flex-row justify-between ju w-full ">
              <div>{produk.harga}</div>
              <div><div className="badge badge-outline">{produk.kategori.kategori}</div> </div>
              </div>
         
            
              <div className="card-actions justify-end">
           
              <Link href={`produk/${produk.id}`} className="btn btn-sm btn-secondary">Detail</Link>
              <button className="btn btn-sm btn-primary" onClick={() => addToCart(produk.id)}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TemplateUser>
  );
}
