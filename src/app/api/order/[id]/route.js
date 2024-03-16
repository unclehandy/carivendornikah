import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function GET(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: id
            }
        });
        if (!order) {
            return NextResponse.json({
                success: false,
                message: "Order not found",
                data: null
            }, {
                status: 404
            });
        }
        return NextResponse.json({
            success: true,
            message: "Order found",
            data: order
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while retrieving order",
            error: error.message
        }, {
            status: 500
        });
    }
}


export async function PATCH(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        const { user_id,date_order } = await request.json();
        const updatedOrder = await prisma.order.update({
            where: {
                id: id,
                date_order:date_order
            },
            data: {
                user_id: user_id
            }
        });
        return NextResponse.json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating order",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function DELETE(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        await prisma.order.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({
            success: true,
            message: "Order deleted successfully",
            data: null
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting order",
            error: error.message
        }, {
            status: 500
        });
    }
}

// Function to parse ID from URL
function parseIdFromUrl(url) {
    const parts = url.split("/");
    const id = parts[parts.length - 1];
    return { id };
}
