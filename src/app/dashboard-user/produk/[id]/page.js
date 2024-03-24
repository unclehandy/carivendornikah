"use client"
import { useState, useEffect } from 'react';
import { TemplateUser } from "@/components/templateUser";
import { checkEnvironment } from '@/config/apiUrl';
import toast from "react-hot-toast";
import { checkEnvironment } from '@/config/apiUrl';
import Cookies from "js-cookie";

export default function DetailProduk({params}) {
    const [produkData, setProdukData] = useState(null);
    const [loading, setLoading] = useState(true);

    // const user_id = JSON.parse(localStorage.getItem("user"));
    const user_id = Cookies.get("id");


    const id=params.id;
    useEffect(() => {
        async function fetchProduk() {
            
            try {
                const response = await fetch(`${checkEnvironment()}/api/produk/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch produk data');
                }
                const data = await response.json();
                setProdukData(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching produk data:', error);
                setLoading(false);
            }
        }

        fetchProduk();
    }, []);


    const addToCart = async () => {
        try {
            const response = await fetch(`${checkEnvironment()}/api/keranjang`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id.id, // Replace with actual user ID
                    produk_id: id, // Assuming your produkData contains the ID
                    status: "x",
                    qty: 1
                }),
               
            });
            toast.success("sukses menambah ke keranjang");
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            // Handle success, e.g., show a success message
        } catch (error) {
            console.error('Error adding to cart:', error);
            // Handle error, e.g., show an error message
        }
        
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    if (!produkData) {
        return <p>Produk not found</p>;
    }

    return (
        <TemplateUser>
            <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">
          
             
            
                <h1 className="text-3xl font-bold mb-4">{produkData.nama}</h1>
           
                <p className="text-gray-600 mb-2">Kategori: {produkData.kategori.nama}</p>
                <p className="text-gray-600 mb-2">Harga: {produkData.harga}</p>


                <div className='flex flex-row gap-6'>
                <div className='w-1/3'>
                <img
                src={`https://nikahapp.s3.ap-southeast-1.amazonaws.com/products/${produkData.user_id}/${produkData.gambar}`}
               className='rounded'
              />
              </div>
                <div className="text-gray-600 mb-4 w-2/3">Deskripsi: {produkData.deskripsi}</div>
                </div>
                <button className="btn btn-sm btn-primary" onClick={addToCart}>Add</button>
            </div>
        </TemplateUser>
    );
}
