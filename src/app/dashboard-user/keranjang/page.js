"use client"
import { TemplateUser } from '@/components/templateUser';
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Keranjang() {
    const [keranjangData, setKeranjangData] = useState([]);
    const [totalHarga, setTotalHarga] = useState(0); 
    const router = useRouter();
    const user_id = JSON.parse(localStorage.getItem("user"));

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


    useEffect(() => {
        // Hitung total harga setiap kali data keranjang berubah
        if (keranjangData.data) {
            const total = keranjangData.data.reduce((acc, item) => acc + item.produk.harga, 0);
            setTotalHarga(total);
        }
    }, [keranjangData]);

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


    const handleCheckout = async () => {
        try {
            // Menyimpan data order
            const orderResponse = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id.id, // Sesuaikan dengan user yang sedang login
                    date_order: new Date().toISOString(),
                }),
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }

            const orderData = await orderResponse.json();

            const orderId = orderData.data.id 

            if (!orderId) {
                throw new Error('Failed to get order ID');
            }

            // Menyimpan data order detail untuk setiap item di keranjang
            for (const item of keranjangData.data) {

                console.log("data order");
                console.log(orderData.data.id);
                const orderDetailResponse = await fetch('http://localhost:3000/api/order_detail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order_id: orderId,
                        user_id: user_id.id, // Sesuaikan dengan user yang sedang login
                        produk_id: item.produk.id,
                        stat: "yes",
                        qty: 1,
                    }),
                });

                if (!orderDetailResponse.ok) {
                    throw new Error('Failed to create order detail');
                }

                await fetch(`http://localhost:3000/api/keranjang/${item.id}`, {
                    method: 'DELETE',
                });
            }

            // Jika berhasil, membersihkan keranjang
            setKeranjangData([]);
            setTotalHarga(0);
            toast.success('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order');
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

            <div className='text-2xl'>Total Harga: {totalHarga}</div> {/* Menampilkan total harga */}
            <button className="btn btn-primary mt-4" onClick={handleCheckout}>Checkout</button>

            
        </TemplateUser>
    );
}
