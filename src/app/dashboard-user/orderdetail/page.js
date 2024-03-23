"use client"
import { useEffect, useState } from 'react';
import { TemplateUser } from '@/components/templateUser';

export default function OrderDetail() {
    const [orderDetails, setOrderDetails] = useState([]);


    const fetchOrderDetails = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/order_detail');
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            setOrderDetails(data.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    console.log(orderDetails);
    useEffect(() => {
        // Lakukan pemanggilan API untuk mendapatkan detail pesanan
 

        fetchOrderDetails();
    }, []);

    return (
        <TemplateUser>
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold my-4">Order Details</h1>
                {orderDetails && orderDetails.map(orderDetail => (
                    <div key={orderDetail.id} className="border rounded-lg p-4 my-4">
                        <h2 className="text-xl font-semibold">{orderDetail.produk.nama}</h2>
                        <p className="text-gray-600">Order ID: {orderDetail.order_id}</p>
                        <p className="text-gray-600">Quantity: {orderDetail.qty}</p>
                        <p className="text-gray-600">Price: {orderDetail.produk.harga}</p>
                        <p className="text-gray-600">Status: {orderDetail.stat}</p>
                    </div>
                ))}
            </div>
        </TemplateUser>
    );
}
