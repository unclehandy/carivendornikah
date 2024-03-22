import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { nanoid } from "nanoid";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const user_id = searchParams.get("user-id");

  if (!user_id) {
    return NextResponse.json(
      { errorMessage: "User ID is incorrect" },
      { status: 500 }
    );
  }

  try {
    const userProfile = await prisma.profile.findFirst({
            where: {
              user_id,
            },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Profile user berhasil diambil",
        data: userProfile,
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
  const {
    lokasi,
    bio,
    provinsi,
    kabupaten_kota,
    kode_pos,
    alamat_lengkap,
    user_id,
  } = await request.json();

  try {
    const profile = await prisma.profile.create({
      data: {
        id: nanoid(),
        lokasi: lokasi,
        bio: bio,
        provinsi: provinsi,
        kabupaten_kota: kabupaten_kota,
        kode_pos: kode_pos,
        alamat_lengkap: alamat_lengkap,
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
        message: "Profil berhasil diperbarui",
        data: profile,
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
