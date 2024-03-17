// [id]/route.js

import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { nanoid } from "nanoid";
import slugify from "slugify";

export async function GET(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        const kategori = await prisma.kategori.findUnique({
            where: {
                id: id
            }
        });

        if (!kategori) {
            return NextResponse.json({
                success: false,
                message: "Kategori not found",
                data: null
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Kategori found",
            data: kategori
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while retrieving kategori",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function PATCH(request) {
    const { id } = parseIdFromUrl(request.url);
    const { kategori } = await request.json();

    try {
        const updatedKategori = await prisma.kategori.update({
            where: {
                id: id
            },
            data: {
                kategori: kategori,
                slug: slugify(kategori, { lower: true })
            }
        });

        return NextResponse.json({
            success: true,
            message: "Kategori updated successfully",
            data: updatedKategori
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating kategori",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function DELETE(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        await prisma.kategori.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Kategori deleted successfully",
            data: null
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting kategori",
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
