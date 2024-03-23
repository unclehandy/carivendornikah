import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request, { params }) {
  const { id } = params;
  const portfolio = await prisma.portfolio.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json({ portfolio }, { status: 200 });
}
