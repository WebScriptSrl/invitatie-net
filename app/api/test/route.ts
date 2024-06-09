import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  const user = await prisma.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      role: "ADMIN",
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not created" }, { status: 500 });
  }

  console.log(user);

  return NextResponse.json(user, { status: 201 });
}
