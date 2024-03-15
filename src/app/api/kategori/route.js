import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";
import slugify from "slugify";

export async function GET(){
    const kategori = await prisma.kategori.findMany();
    return NextResponse.json({
        success:true,
        message:"list data kategori",
        data:kategori
    },{
        status:200
    })
}

export async function POST(request) {
    //get all request
    const { kategori } = await request.json();
  
    //create data post
    const datakategori = await prisma.kategori.create({
      data: {
        id:nanoid(),
        kategori: kategori,
        slug: slugify(kategori, { lower: true })
      },
    });
  
    //return response JSON
    return NextResponse.json({
        success:true,
        message:"list data kategori",
        data:null
    },{
        status:201
    })
  }