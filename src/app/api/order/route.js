import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";

export async function GET() {
    try {
        const orders = await prisma.order.findMany();
        return NextResponse.json({
            success: true,
            message: "List of orders",
            data: orders
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching orders",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function POST(request) {
    try {
        const { user_id,date_order } = await request.json();
        const newOrder = await prisma.order.create({
            data: {
                id: nanoid(),
                user_id: user_id,
                date_order:date_order
            }
        });
        return NextResponse.json({
            success: true,
            message: "Order created successfully",
            data: newOrder
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating order",
            error: error.message
        }, {
            status: 500
        });
    }
}
