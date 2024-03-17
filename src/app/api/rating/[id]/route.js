import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        const rating = await prisma.rating.findUnique({
            where: {
                id: id
            }
        });
        if (!rating) {
            return NextResponse.json({
                success: false,
                message: "Rating not found",
                data: null
            }, {
                status: 404
            });
        }
        return NextResponse.json({
            success: true,
            message: "Rating found",
            data: rating
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while retrieving rating",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function PATCH(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        const { rate } = await request.json();
        const updatedRating = await prisma.rating.update({
            where: {
                id: id
            },
            data: {
                rate: rate
            }
        });
        return NextResponse.json({
            success: true,
            message: "Rating updated successfully",
            data: updatedRating
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating rating",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function DELETE(request) {
    const { id } = parseIdFromUrl(request.url);
    try {
        await prisma.rating.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({
            success: true,
            message: "Rating deleted successfully",
            data: null
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting rating",
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
