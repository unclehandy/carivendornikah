import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";
import slugify from "slugify";

export async function GET() {
    try {
        const produk = await prisma.produk.findMany();
        return NextResponse.json({
            success: true,
            message: "List data produk",
            data: produk
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while retrieving produk",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function POST(req,res) {
    const { nama, harga, gambar, deskripsi, kategori_id, user_id } = await req.body;
    console.log("Type of nama:", typeof nama);
    try {
        const newProduk = await prisma.produk.create({
            data: {
                id: nanoid(),
                nama: nama,
                harga: harga,
                gambar: gambar,
                deskripsi: deskripsi,
                slug: slugify(nama, { lower: true }),
                kategori: {
                    connect: {
                        id: kategori_id
                    }
                },
                user: {
                    connect: {
                        id: user_id
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Produk created successfully",
            data: newProduk
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while creating produk",
            error: error.message
        }, {
            status: 500
        });
    }
}