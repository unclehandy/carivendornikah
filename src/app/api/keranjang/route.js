import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";

export async function GET() {
    try {
        const keranjangItems = await prisma.keranjang.findMany({
            include: {
                produk: true,
                user: true,
              },
        });
        return NextResponse.json({
            success: true,
            message: "List of items in keranjang",
            data: keranjangItems
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching keranjang items",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function POST(request) {
    try {
        const { user_id, produk_id, qty,status } = await request.json();
        const newKeranjangItem = await prisma.keranjang.create({
            data: {
                id: nanoid(),
                user_id: user_id,
                produk_id: produk_id,
                qty: qty,
                stat:status
                
            }
        });
        return NextResponse.json({
            success: true,
            message: "Keranjang item created successfully",
            data: newKeranjangItem
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating keranjang item",
            error: error.message
        }, {
            status: 500
        });
    }
}
