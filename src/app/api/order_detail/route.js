// Import dependencies
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";
import slugify from "slugify";

// Handle GET request
export async function GET() {
    try {
        const orderDetails = await prisma.orderDetail.findMany();
        return NextResponse.json({
            success: true,
            message: "List of order details",
            data: orderDetails
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching order details",
            error: error.message
        }, {
            status: 500
        });
    }
}

// Handle POST request
export async function POST(request) {
    try {
        const { order_id, produk_id, user_id, stat, qty } = await request.json();
        const data = await prisma.orderDetail.create({
            data: {
                id: nanoid(),
                order_id: order_id,
                produk_id: produk_id,
                user_id: user_id,
                stat: stat,
                qty: qty
            }
        });
        return NextResponse.json({
            success: true,
            message: "Order detail created successfully",
            data: data
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating order detail",
            error: error.message
        }, {
            status: 500
        });
    }
}
