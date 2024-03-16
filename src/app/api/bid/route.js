import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";

export async function GET() {
    const bids = await prisma.bid.findMany();
    return NextResponse.json({
        success: true,
        message: "List of Bids",
        data: bids
    }, {
        status: 200
    });
}

export async function POST(request) {
    const { weding_dream_id, nama, harga, deskripsi, user_id } = await request.json();

    try {
        const newBid = await prisma.bid.create({
            data: {
                id: nanoid(),
                wedingdream: {
                    connect: { id: weding_dream_id }
                },
                nama,
                harga,
                deskripsi,
                user: {
                    connect: { id: user_id }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Bid created successfully",
            data: newBid
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating Bid",
            error: error.message
        }, {
            status: 500
        });
    }
}
