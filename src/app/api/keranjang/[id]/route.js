import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        const keranjangItem = await prisma.keranjang.findUnique({
            where: {
                id: id
            }
        });
        if (!keranjangItem) {
            return NextResponse.json({
                success: false,
                message: "Keranjang item not found",
                data: null
            }, {
                status: 404
            });
        }
        return NextResponse.json({
            success: true,
            message: "Keranjang item found",
            data: keranjangItem
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while retrieving keranjang item",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function PATCH(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        const { qty,status } = await request.json();
        const updatedKeranjangItem = await prisma.keranjang.update({
            where: {
                id: id
            },
            data: {
                qty: qty,
                status:status.toString()
            }
        });
        return NextResponse.json({
            success: true,
            message: "Keranjang item updated successfully",
            data: updatedKeranjangItem
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating keranjang item",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function DELETE(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        await prisma.keranjang.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({
            success: true,
            message: "Keranjang item deleted successfully",
            data: null
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting keranjang item",
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
