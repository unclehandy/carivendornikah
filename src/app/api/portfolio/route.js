import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";
import slugify from "slugify";
import Cookies from "js-cookie";
import { stringToDate } from "@/lib/dateFunction";
import { uploadFile } from "@/lib/uploadFile";

export async function GET(req) {
  const vendor_id = Cookies.get("id");

  try {
    const vendorPortfolio = await prisma.portfolio.findMany({
      where: {
        vendor_id,
      },
    });
    return NextResponse.json(
      { vendorPortfolio },{
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while retrieving portfolio",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  const formData = await req.formData();
  console.log(formData);

  const id = nanoid();
  const judul = formData.get("judul");
  const date = formData.get("tanggal");
  const lokasi = formData.get("lokasi");
  const deskripsi = formData.get("deskripsi");
  const gambar = formData.get("gambar");
  const gambar_pendukung = formData.getAll("gambar_pendukung");
  const vendor_id = formData.get("vendor_id");
  const slug = slugify(judul, { lower: true });
  const images = gambar_pendukung.map((file) =>
    slugify(file.name, { lower: true })
  );
  const tanggal = stringToDate(date);

  // Upload
  try {
    await uploadFile({ Body: gambar, Key: gambar.name, ContentType: gambar.type, Dir: `portfolio/${id}` });
    for (let i = 0; i < gambar_pendukung.length; i++) {
      await uploadFile({ Body: gambar_pendukung[i], Key: gambar_pendukung[i].name, ContentType: gambar_pendukung[i].type, Dir: `portfolio/${id}` });
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const tambahPortfolio = await prisma.portfolio.create({
      data: {
        id,
        judul,
        tanggal,
        lokasi,
        deskripsi,
        gambar: slugify(gambar.name, { lower: true }),
        gambar_pendukung: JSON.stringify(images),
        slug,
        vendor_id,
      },
    });
    console.log(tambahPortfolio);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({});
}
