import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  const invite = await prisma.invite.create({
    data: {
      userId: body.userId,
      handle: "mr-balls2",
      isActive: true,
      isExample: false,
      model: "poetry-in-gold",
      title: "Francesca & Călin",
      eventDate: new Date("2024-08-24T18:00:00Z"),
      category: "wedding",
    },
    select: {
      id: true,
    },
  });

  console.log(invite);

  return NextResponse.json(invite, { status: 201 });
}
