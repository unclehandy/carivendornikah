"use client"
import { TemplateUser } from '@/components/templateUser';
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Keranjang() {
    const [keranjangData, setKeranjangData] = useState([]);
    const router = useRouter();

    async function fetchKeranjang() {
        try {
            const response = await fetch('http://localhost:3000/api/keranjang');
            if (!response.ok) {
                throw new Error('Failed to fetch keranjang data');
            }
            const data = await response.json();
            setKeranjangData(data);
        } catch (error) {
            console.error('Error fetching keranjang data:', error);
        }
    }
    
    useEffect(() => {


        fetchKeranjang();
    }, []);


    console.log(keranjangData.data)
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/keranjang/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete item from keranjang');
            }
            toast.success('Item deleted from keranjang');
           fetchKeranjang();
        } catch (error) {
            console.error('Error deleting item from keranjang:', error);
        }
    };

    return (
        <TemplateUser>
                  <div className="produk-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-9">
            {keranjangData.data && keranjangData.data.map(item => (
              <div
              className="card card-compact  bg-base-100 shadow-xl"
              key={item.id}
            >
              <figure  className=" h-48 w-full">
                <img
                  src={`https://nikahdevscale.s3.ap-south-1.amazonaws.com/products/${item.produk.user_id}/${item.produk.gambar}`}
                
                 
                 
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title capitalize">{item.produk.nama}</h2>
                <div className="flex flex-row justify-between ju w-full ">
                <div>{item.produk.harga}</div>

                </div>
           
              
                <div className="card-actions justify-end">
             

                <button className="btn btn-sm btn-primary" onClick={() => handleDelete(item.id)}>Hapus</button>
                </div>
              </div>
            </div>
            ))}
            </div>
        </TemplateUser>
    );
}
