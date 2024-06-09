import { customAlphabet, urlAlphabet } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { IUrl } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { urlExists } from "@/lib/urls";

const baseDomain =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.PUBLIC_BASE_URL}`
    : `http://localhost:3000`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const userId = cookies().get("userId");
  const invite = cookies().get("inviteId");

  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    "Unknown";

  const navigator = req.geo;

  const city = navigator?.city ? navigator.city : "Unknown";
  const country = navigator?.country ? navigator.country : "Unknown";

  if (!userId) {
    return new NextResponse(
      "Trebuie sa fiti autentificat pentru a crea un link",
      {
        status: 401,
      }
    );
  }

  const { body } = await req.json();
  const { title } = body;

  const type = body.type ? body.type : "title";

  const length = body.length ? body.length : 6;

  const validityPeriod = await prisma.baseSettings.findFirst({
    where: {
      key: "urlValidityPeriod",
    },
    select: {
      value: true,
    },
  });

  if (!validityPeriod) {
    return new NextResponse(
      "Ups! Baza de date a intampinat o problema! Incercati din nou!",
      {
        status: 500,
      }
    );
  }

  const urlValidityPeriod = Number(validityPeriod.value) * 24 * 60 * 60 * 1000;

  if (!title) {
    return new NextResponse("Un domeniu este necesar! Adaugati titlu", {
      status: 400,
    });
  }

  if (!baseDomain) {
    return new NextResponse(
      "Ups! Serverul a intampinat o problema! Incercati din nou!",
      {
        status: 500,
      }
    );
  }

  const baseInviteUrl = `${baseDomain}/${title
    .replace(/\s/g, "-")
    .toLowerCase()}`;

  const alias = customAlphabet(urlAlphabet, length)();

  switch (type) {
    case "premium":
      const customUrl = `${baseInviteUrl}`;

      const baseUrl = `${baseInviteUrl}?invite=${alias}`;

      const customUrlExists = await urlExists(baseUrl, "premium");

      if (customUrlExists) {
        return new NextResponse(
          "Acest link exista deja! Va rugam sa incercati altul",
          {
            status: 400,
          }
        );
      }

      const baseUrlExists = await urlExists(baseUrl);

      if (baseUrlExists) {
        return new NextResponse(
          "Eroare la crearea link-ului! Incercati din nou!",
          {
            status: 500,
          }
        );
      }

      try {
        const res = await prisma.url.create({
          data: {
            premium: true,
            premiumDomain: customUrl,
            baseUrl: baseUrl,
            alias: alias,
            urlType: "PREMIUM",
            locations: [city, country],
            expiration: new Date(Date.now() + urlValidityPeriod),
            userId: userId.value,
            invites: { connect: { id: invite?.value } },
            ips: [ip],
          },
        });

        return NextResponse.json(
          {
            data: res,
            message: "Link-ul a fost creat cu succes!",
          },
          { status: 201 }
        );
      } catch (error) {
        console.error(error);
        return new NextResponse(
          error instanceof Error
            ? error.message
            : "Baza de date a intampinat o problema!",
          {
            status: 500,
          }
        );
      }

    case "user-link":
      const userLink = `${baseInviteUrl}?invite=${alias}`;
      const userLinkExists = await urlExists(userLink);

      if (userLinkExists) {
        return new NextResponse(
          "Eroare la crearea link-ului! Incercati din nou!",
          {
            status: 400,
          }
        );
      }

      try {
        const res = await prisma.url.create({
          data: {
            premium: false,
            baseUrl: userLink,
            alias: alias,
            urlType: "TITLE_QUERY",
            locations: [city, country],
            expiration: new Date(Date.now() + urlValidityPeriod),
            userId: userId.value,
            ips: [ip],
          },
        });

        return NextResponse.json(
          {
            data: res,
            message: "Link-ul a fost creat cu succes!",
          },
          { status: 201 }
        );
      } catch (error) {
        console.error(error);
        return new NextResponse(
          error instanceof Error
            ? error.message
            : "Baza de date a intampinat o problema!",
          {
            status: 500,
          }
        );
      }

    default:
      const url = `${baseInviteUrl}?invite=${alias}`;

      const existingUrl = await urlExists(url);

      if (existingUrl) {
        return new NextResponse(
          "Eroare la crearea link-ului! Incercati din nou!",
          {
            status: 400,
          }
        );
      }

      try {
        const res = await prisma.url.create({
          data: {
            premium: false,
            baseUrl: url,
            alias: alias,
            urlType: "TITLE_QUERY",
            locations: [city, country],
            expiration: new Date(Date.now() + urlValidityPeriod),
            userId: userId.value,
            invites: { connect: { id: invite?.value } },
            ips: [ip],
          },
        });

        return NextResponse.json(
          {
            data: res,
            message: "Link-ul a fost creat cu succes!",
          },
          { status: 201 }
        );
      } catch (error) {
        console.error(error);
        return new NextResponse(
          error instanceof Error
            ? error.message
            : "Baza de date a intampinat o problema!",
          {
            status: 500,
          }
        );
      }
  }
}
