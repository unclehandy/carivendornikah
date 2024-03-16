import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "../../../../prisma/client";


export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const role = searchParams.get("role");

  if (role )  {
      const allUser = await prisma.user.findMany({
          where: {
                    role: {
                      contains: role,                        
                  },
            }
      });

      return NextResponse.json ({mesage: "get all users by role  success", data: allUser})
  }  

  const allUser = await prisma.user.findMany();
  return NextResponse.json({message: "get all user success", data: allUser})
}


export async function POST(req) {
  const { nama, email, username, password, phone, role } = await req.json();

  try {
    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user to database
    const createUser = await prisma.user.create({
      data: {
        nama,
        email,
        username,
        password: hashedPassword,
        phone,
        role,
      },
    });

    return NextResponse.json(
      { data: createUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errorMessage: "Something went wrong. Please try again later" },
      { status: 500 }
    );
  }
}


