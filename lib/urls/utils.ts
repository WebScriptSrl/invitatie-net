import prisma from "../prisma";

export const urlExists = async (
  url: string,
  type?: string,
  alias?: string,
  guestAlias?: string
) => {
  switch (type) {
    case "premium":
      const customUrlExists = await prisma.url.findFirst({
        where: {
          premiumDomain: url,
        },
      });

      return customUrlExists;

    case "short":
      const shortUrlExists = await prisma.shortUrl.findFirst({
        where: {
          alias: alias,
        },
      });

      return shortUrlExists;

    case "guest":
      const guestUrlExists = await prisma.guestUrls.findFirst({
        where: {
          alias: guestAlias,
        },
      });

      return guestUrlExists;

    case "premiumGuest":
      const premiumGuestUrlExists = await prisma.premiumGuestUrls.findFirst({
        where: {
          alias: alias,
        },
      });

      return premiumGuestUrlExists;

    default:
      const urlExists = await prisma.url.findFirst({
        where: {
          baseUrl: url,
        },
      });

      return urlExists;
  }
};
