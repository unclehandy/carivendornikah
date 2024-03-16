import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { nanoid } from "nanoid";

export async function GET(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        const bid = await prisma.bid.findUnique({
            where: {
                id: id
            }
        });

        if (!bid) {
            return NextResponse.json({
                success: false,
                message: "Bid not found",
                data: null
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Bid found",
            data: bid
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while retrieving Bid",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function PATCH(request) {
    const { id } = parseIdFromUrl(request.url);
    const { nama, harga, deskripsi } = await request.json();

    try {
        const updatedBid = await prisma.bid.update({
            where: {
                id: id
            },
            data: {
                nama,
                harga,
                deskripsi
            }
        });

        return NextResponse.json({
            success: true,
            message: "Bid updated successfully",
            data: updatedBid
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating Bid",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function DELETE(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        await prisma.bid.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Bid deleted successfully",
            data: null
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting Bid",
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
