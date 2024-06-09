import isUrl from "validator/lib/isURL";
import { NextRequest, NextResponse } from "next/server";
import { customAlphabet, urlAlphabet } from "nanoid";
import { cookies } from "next/headers";

import prisma from "@/lib/prisma";
import { urlExists } from "@/lib/urls";

const nodeEnv = process.env.NODE_ENV;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const userId = cookies().get("userId");
  const urlId = cookies().get("urlId");

  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    "Unknown";

  const navigator = req.geo;

  const city = navigator?.city ? navigator.city : "Unknown";
  const country = navigator?.country ? navigator.country : "Unknown";

  if (!userId) {
    return NextResponse.json(
      { error: "Trebuie sa fiti autentificat pentru a crea un link" },
      { status: 401 }
    );
  }

  const { body } = await req.json();

  const { url, length, type } = body;

  const parsedUrl = new URL(url);

  const { origin, pathname, protocol, searchParams } = parsedUrl;

  let invite = searchParams.get("invite");
  let guest = searchParams.get("guest");

  if (protocol !== "http:" && protocol !== "https:") {
    return NextResponse.json(
      { error: "Invalid URL! Inserati intregul URL" },
      { status: 400 }
    );
  }

  if (
    !isUrl(parsedUrl.href, {
      require_tld: nodeEnv === "production" ? true : false,
    })
  ) {
    return NextResponse.json(
      { error: "URL invalid! Verifica si incearca din nou!" },
      { status: 400 }
    );
  }

  const alias = customAlphabet(urlAlphabet, length)();
  const guestAlias = customAlphabet(urlAlphabet, length)();

  let customUrl;

  const validityPeriod = await prisma.baseSettings.findFirst({
    where: {
      key: "urlValidityPeriod",
    },
    select: {
      value: true,
    },
  });

  if (!validityPeriod) {
    return NextResponse.json(
      {
        error: "Ups! Baza de date a intampinat o problema! Incercati din nou!!",
      },
      { status: 500 }
    );
  }

  const urlValidityPeriod = Number(validityPeriod.value) * 24 * 60 * 60 * 1000;

  switch (type) {
    case "SHORT_URL":
      customUrl = `${origin}/${alias}}`;

      const shortUrlExists = await urlExists(customUrl, "short", alias);

      if (shortUrlExists) {
        return NextResponse.json(
          { error: "Eroare la generarea link-ului! Incercati din nou!" },
          { status: 500 }
        );
      }

      try {
        const res = await prisma.shortUrl.create({
          data: {
            url: customUrl,
            baseUrl: { connect: { id: urlId?.value } },
            alias: alias,
            user: { connect: { id: userId.value } },
            expiration: new Date(Date.now() + urlValidityPeriod),
            locations: [city, country],
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

    case "TITLE_QUERY":
      customUrl = `${origin}${pathname}${invite ? `?invite=${alias}` : ""}`;

      const titleUrlExists = await urlExists(customUrl);

      if (titleUrlExists) {
        return NextResponse.json(
          { error: "Eroare la generarea link-ului! Incercati din nou!" },
          { status: 500 }
        );
      }

      try {
        const res = await prisma.url.create({
          data: {
            premium: false,
            baseUrl: customUrl,
            alias: alias,
            urlType: "TITLE_QUERY",
            locations: [city, country],
            expiration: new Date(Date.now() + urlValidityPeriod),
            user: { connect: { id: userId.value } },
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

    case "GUEST_QUERY":
      customUrl = `${origin}${pathname}${guest ? `?guest=${guestAlias}` : ""}`;

      const guestUrlExists = await urlExists(customUrl, "guest", guestAlias);

      if (guestUrlExists) {
        return NextResponse.json(
          { error: "Eroare la generarea link-ului! Incercati din nou!" },
          { status: 500 }
        );
      }

      try {
        const res = await prisma.guestUrls.create({
          data: {
            url: customUrl,
            alias: guestAlias,
            baseUrl: { connect: { id: urlId?.value } },
            locations: [city, country],
            expiration: new Date(Date.now() + urlValidityPeriod),
            user: { connect: { id: userId.value } },
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

    case "TITLE_GUEST_QUERY":
      customUrl = `${origin}${pathname}${invite ? `?invite=${alias}` : ""}${
        guest ? `&guest=${guestAlias}` : ""
      }`;

      const titleGuestUrlExists = await urlExists(
        customUrl,
        "",
        alias,
        guestAlias
      );

      if (titleGuestUrlExists) {
        return NextResponse.json(
          { error: "Eroare la generarea link-ului! Incercati din nou!" },
          { status: 500 }
        );
      }

      try {
        const res = await prisma.url.create({
          data: {
            premium: false,
            baseUrl: customUrl,
            alias: alias,
            guestAlias: guestAlias,
            urlType: "TITLE_GUEST_QUERY",
            locations: [city, country],
            expiration: new Date(Date.now() + urlValidityPeriod),
            user: { connect: { id: userId.value } },
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

    case "PREMIUM":
      customUrl = `${origin}${pathname}`;

      const premiumUrlExists = await urlExists(customUrl, "premium");

      if (premiumUrlExists) {
        return NextResponse.json(
          { error: "Eroare la generarea link-ului! Incercati din nou!" },
          { status: 500 }
        );
      }

      try {
        const res = await prisma.url.update({
          where: {
            id: urlId?.value,
          },
          data: {
            premium: true,
            premiumDomain: customUrl,
            expiration: new Date(Date.now() + urlValidityPeriod),
            urlType: "PREMIUM",
          },
        });

        return NextResponse.json(
          {
            data: res,
            message: "Link-ul premium a fost creat cu succes!",
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

    case "PREMIUM_GUEST":
      customUrl = `${origin}${pathname}/${guestAlias}`;

      const premiumGuestUrlExists = await urlExists(
        customUrl,
        "premiumGuest",
        "",
        guestAlias
      );

      if (premiumGuestUrlExists) {
        return NextResponse.json(
          { error: "Eroare la generarea link-ului! Incercati din nou!" },
          { status: 500 }
        );
      }

      try {
        const res = await prisma.premiumGuestUrls.create({
          data: {
            url: customUrl,
            baseUrl: { connect: { id: urlId?.value } },
            alias: guestAlias,
            locations: [city, country],
            expiration: new Date(Date.now() + urlValidityPeriod),
            user: { connect: { id: userId.value } },
            ips: [ip],
          },
        });

        return NextResponse.json(
          {
            data: res,
            message: "Link-ul premium a fost creat cu succes!",
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
      return NextResponse.json(
        { error: "Tipul de link nu este suportat! Incercati din nou!" },
        { status: 400 }
      );
  }
}
