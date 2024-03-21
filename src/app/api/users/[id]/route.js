import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(_, {params}) {
   
    const userId = params.id;

    //business logic
    const userData = await prisma.user.findFirst ({
        where: {
            id: userId
        },
        include: {
            profile: {
              select: {
                id: false,
                lokasi: true,
                bio: true,
                provinsi: true,
                kabupaten_kota: true,
                kode_pos: true,
                alamat_lengkap: true,
              },
            },
        }
    })

    //handling response
    return NextResponse.json ({mesagge:"get user by id success", data:userData})

}


export async function PATCH (req, {params}) {
    const userId = params.id;
    const {nama, password, role, email, phone } = await req.json()

    const updatedData = await prisma.user.update ({
        where: {
            id:userId,
        },
        data: {
            nama: nama,
            password: password,
            role: role,
            email,
            phone
        }
    })

    return NextResponse.json ({message: "Update user Success", data: updatedData})
}

export async function DELETE (_, {params}) {
    const userId = params.id;

        await prisma.user.delete({        
        where: {
            id: userId,
        },
    })

    return NextResponse.json ({mesagge:"Delete user success"});
}
