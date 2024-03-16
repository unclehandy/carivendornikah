import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";

export async function GET() {
    try {
        const ratings = await prisma.rating.findMany();
        return NextResponse.json({
            success: true,
            message: "List of ratings",
            data: ratings
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while fetching ratings",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function POST(request) {
    try {
        const { user_id, rate } = await request.json();
        const newRating = await prisma.rating.create({
            data: {
                id: nanoid(),
                user_id: user_id,
                rate: rate
            }
        });
        return NextResponse.json({
            success: true,
            message: "Rating created successfully",
            data: newRating
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating rating",
            error: error.message
        }, {
            status: 500
        });
    }
}
