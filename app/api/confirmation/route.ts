import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const data = await req.json();

  // Work in progress

  const reqUrl = req.url;

  const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");

  const navigator = req.geo;

  if (!data) {
    return NextResponse.json(
      { message: "Ups! Ceva nu a mers bine!" },
      { status: 400 }
    );
  }

  try {
    const invite = await prisma.invite.findUnique({
      where: {
        handle: data.inviteCode,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!invite) {
      return NextResponse.json(
        { message: "Ups! Ceva nu a mers bine!" },
        { status: 400 }
      );
    }

    const result = await prisma.inviteResponse.create({
      data: {
        inviteId: invite?.id,
        response: [data.confirmation],
        userId: invite?.userId,
      },
    });

    if (Number(data.numberOfPersons) === 0) {
      return NextResponse.json(
        {
          data: result,
          message:
            "Formularul a fost trimis cu succes! Ne pare rău ca nu puteți ajunge! Vă mulțumim pentru mesajul transmis! Iar dacă se schimbă ceva, nu ezitați să ne contactați!",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          data: result,
          message:
            "Formularul a fost trimis cu succes! Va multumim pentru confirmare și vă așteptăm cu drag la eveniment!",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ups! Ceva nu a mers bine!" },
      { status: 400 }
    );
  }
};
