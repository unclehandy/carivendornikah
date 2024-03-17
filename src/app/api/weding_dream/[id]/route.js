import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { nanoid } from "nanoid";
import slugify from "slugify";

export async function GET(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        const wedingDream = await prisma.wedingDream.findUnique({
            where: {
                id: id
            }
        });

        if (!wedingDream) {
            return NextResponse.json({
                success: false,
                message: "Weding Dream not found",
                data: null
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Weding Dream found",
            data: wedingDream
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while retrieving Weding Dream",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function PATCH(request) {
    const { id } = parseIdFromUrl(request.url);
    const { judul, budget, deskripsi } = await request.json();

    try {
        const updatedWedingDream = await prisma.wedingDream.update({
            where: {
                id: id
            },
            data: {
                judul,
                budget,
                slug: slugify(judul, { lower: true }),
                deskripsi
            }
        });

        return NextResponse.json({
            success: true,
            message: "Weding Dream updated successfully",
            data: updatedWedingDream
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating Weding Dream",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function DELETE(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        await prisma.wedingDream.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Weding Dream deleted successfully",
            data: null
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting Weding Dream",
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
