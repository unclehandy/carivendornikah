import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { nanoid } from "nanoid";

export async function GET(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        const orderDream = await prisma.orderDream.findUnique({
            where: {
                id: id
            }
        });

        if (!orderDream) {
            return NextResponse.json({
                success: false,
                message: "OrderDream not found",
                data: null
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "OrderDream found",
            data: orderDream
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while retrieving OrderDream",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function PATCH(request) {
    const { id } = parseIdFromUrl(request.url);
    const { status } = await request.json();

    try {
        const updatedOrderDream = await prisma.orderDream.update({
            where: {
                id: id
            },
            data: {
                status
            }
        });

        return NextResponse.json({
            success: true,
            message: "OrderDream updated successfully",
            data: updatedOrderDream
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating OrderDream",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function DELETE(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        await prisma.orderDream.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({
            success: true,
            message: "OrderDream deleted successfully",
            data: null
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting OrderDream",
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
