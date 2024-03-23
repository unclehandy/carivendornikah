import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import slugify from "slugify";
import { uploadFile } from "@/lib/uploadFile";

export async function GET(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        const produk = await prisma.produk.findUnique({
            where: {
                id: id
            },
            include: {
                kategori: true
            }
        });

        if (!produk) {
            return NextResponse.json({
                success: false,
                message: "Produk not found",
                data: null
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Produk found",
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

export async function PATCH(request) {
    const { id } = parseIdFromUrl(request.url);
    const formData = await request.formData();


    const iduser = formData.get("user_id");
    const nama = formData.get("nama");
    const harga = formData.get("harga");
    const deskripsi = formData.get("deskripsi");
    const kategori_id = formData.get("kategori_id");
    const user_id = formData.get("user_id");
    const featuredImage = formData.get("gambar");



    
    try {
        await uploadFile({
          Body: featuredImage,
          Key: featuredImage.name,
          ContentType: featuredImage.type,
          Dir: `products/${iduser}`,
        });
    
      } catch (error) {
        console.log(error);
      }
    


    try {
        const updatedProduk = await prisma.produk.update({
            where: {
                id: id
            },
            data: {
                nama: nama,
                harga: parseInt(harga),
                gambar: slugify(featuredImage.name, { lower: true }),
                deskripsi: deskripsi,
                slug: slugify(nama, { lower: true }),
                kategori: {
                    connect: {
                        id: kategori_id
                    }
                }
            },
            include: {
                kategori: true
            }
        });

        return NextResponse.json({
            success: true,
            message: "Produk updated successfully",
            data: updatedProduk
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while updating produk",
            error: error.message
        }, {
            status: 500
        });
    }
}

export async function DELETE(request) {
    const { id } = parseIdFromUrl(request.url);

    try {
        await prisma.produk.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Produk deleted successfully",
            data: null
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while deleting produk",
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
