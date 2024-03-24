"use client";
import { useEffect, useState } from 'react';
import { TemplateUser } from '@/components/templateUser';
import { checkEnvironment } from '@/config/apiUrl';
import { useRouter } from 'next/navigation'; // Changed next/navigation to next/router

export default function OrderDetail() {
    const [orderDetails, setOrderDetails] = useState([]);
    const router = useRouter();

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(`${checkEnvironment()}/api/order_detail`);
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            setOrderDetails(data.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    useEffect(() => {
        // Lakukan pemanggilan API untuk mendapatkan detail pesanan
        fetchOrderDetails();
    }, []);

    useEffect(() => {
        // After fetching order details, navigate to "/dashboard-user/orderdetail"
        if (orderDetails.length > 0) {
            router.push("/dashboard-user/orderdetail");
        }
    }, [orderDetails, router]);

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
