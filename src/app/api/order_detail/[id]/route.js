// Import dependencies
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

// Handle GET request
export async function GET(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        const orderDetail = await prisma.orderDetail.findUnique({
            where: {
                id: id
            }
        });
        if (!orderDetail) {
            return NextResponse.json({
                success: false,
                message: "Order detail not found",
                data: null
            }, {
                status: 404
            });
        }
        return NextResponse.json({
            success: true,
            message: "Order detail found",
            data: orderDetail
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching order detail",
            error: error.message
        }, {
            status: 500
        });
    }
}

// Handle PATCH request
export async function PATCH(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        const { stat } = await request.json();
        const updatedOrderDetail = await prisma.orderDetail.update({
            where: {
                id: id
            },
            data: {
                stat: stat
            }
        });
        return NextResponse.json({
            success: true,
            message: "Order detail updated successfully",
            data: updatedOrderDetail
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating order detail",
            error: error.message
        }, {
            status: 500
        });
    }
}

// Handle DELETE request
export async function DELETE(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        await prisma.orderDetail.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({
            success: true,
            message: "Order detail deleted successfully",
            data: null
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting order detail",
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
