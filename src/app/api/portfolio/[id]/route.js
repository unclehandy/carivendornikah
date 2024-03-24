import prisma from "../../../../../prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const portfolio = await prisma.portfolio.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(
    { portfolio },{
      status: 200,
    }
  );
}