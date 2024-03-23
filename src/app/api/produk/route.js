import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";
import slugify from "slugify";
import { uploadFile } from "@/lib/uploadFile";

export async function GET() {
  try {
    const produk = await prisma.produk.findMany(
      {
        include: {
          kategori: true,
          user: true,
        },
      }
    );
    return NextResponse.json(
      {
        success: true,
        message: "List data produk",
        data: produk,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while retrieving produk",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  const formData = await request.formData();

  const id = formData.get("user_id");
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
      Dir: `products/${id}`,
    });

  } catch (error) {
    console.log(error);
  }

  try {
    const newProduk = await prisma.produk.create({
      data: {
        id: nanoid(),
        nama: nama,
        harga: parseInt(harga),
        gambar: slugify(featuredImage.name, { lower: true }),
        deskripsi: deskripsi,
        slug: slugify(nama, { lower: true }),
        kategori: {
          connect: {
            id: kategori_id,
          },
        },
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Produk created successfully",
        data: newProduk,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while creating produk",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
