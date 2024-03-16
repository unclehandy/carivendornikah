import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";
import slugify from "slugify";

export async function GET(){
    const wedingDreams = await prisma.wedingDream.findMany();
    return NextResponse.json({
        success:true,
        message:"List of Weding Dreams",
        data:wedingDreams
    },{
        status:200
    })
}

export async function POST(request) {
    const { user_id, judul, budget, deskripsi } = await request.json();
  
    try {
        const newWedingDream = await prisma.wedingDream.create({
            data: {
                id: nanoid(),
                user_id,
                judul,
                budget,
                slug: slugify(judul, { lower: true }),
                deskripsi,
                status: 'A' 
            }
        });
      
        return NextResponse.json({
            success: true,
            message: "Weding Dream created successfully",
            data: newWedingDream
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating Weding Dream",
            error: error.message
        }, {
            status: 500
        });
    }
}
