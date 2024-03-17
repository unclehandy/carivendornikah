import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";

export async function GET() {
    const orderDreams = await prisma.orderDream.findMany();
    return NextResponse.json({
        success: true,
        message: "List of OrderDreams",
        data: orderDreams
    }, {
        status: 200
    });
}

export async function POST(request) {
    const { weding_dream_id, bid_id, status } = await request.json();

    try {
        const newOrderDream = await prisma.orderDream.create({
            data: {
                id: nanoid(),
                wedingdream: {
                    connect: { id: weding_dream_id }
                },
                bid: {
                    connect: { id: bid_id }
                },
                status
            }
        });

        return NextResponse.json({
            success: true,
            message: "OrderDream created successfully",
            data: newOrderDream
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating OrderDream",
            error: error.message
        }, {
            status: 500
        });
    }
}
