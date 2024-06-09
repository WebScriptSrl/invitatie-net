import prisma from "../prisma";
import { UrlType } from "../types";

export async function fetchInviteData({
  baseUrl,
  inviteId,
  urlType,
  searchParams,
}: {
  baseUrl: string;
  inviteId?: string;
  urlType: UrlType;
  searchParams?: {
    inviteSearchParams: string;
    guestSearchParams: string;
  };
}) {
  // : Promise<IDataInvite | Error>
  switch (urlType) {
    case "TITLE_QUERY":
      baseUrl = `${baseUrl}?invite=${searchParams!.inviteSearchParams}`;
      console.log(baseUrl, "Invite title query");

      break;

    case "TITLE_GUEST_QUERY":
      baseUrl = `${baseUrl}?invite=${searchParams!.inviteSearchParams}&guest=${
        searchParams!.guestSearchParams
      }`;
      console.log(baseUrl, "Invite title guest query");
      break;

    case "GUEST_QUERY":
      baseUrl = `${baseUrl}?guest=${searchParams!.guestSearchParams}`;
      console.log(baseUrl, "guest");
      break;

    case "PREMIUM":
      baseUrl = `${baseUrl}`;
      try {
        const urlData = await prisma.url.findUniqueOrThrow({
          where: {
            premiumDomain: baseUrl,
            active: true,
            premium: true,
          },
          select: {
            id: true,
            baseUrl: true,
            alias: true,
            userId: true,
          },
        });

        const inviteData = await prisma.invite.findUniqueOrThrow({
          where: {
            isActive: true,
            handle: urlData.alias,
          },
          select: {
            id: true,
            handle: true,
            category: true,
            title: true,
            name: true,
            model: true,
            code: true,
            isPublic: true,
            isActive: true,
            isExample: true,
            description: true,
            logo: true,
            content: true,
            eventDate: true,
            eventLocation: true,
            eventTime: true,
            eventTimeZone: true,
            font: true,
            fontColor: true,
            secondaryFont: true,
            background: true,
            color: true,
            mainImage: true,
            images: true,
            customDomain: true,
            primaryDomain: true,
            clicks: true,

            message401: true,
            message404: true,

            isDraft: true,
            publishedAt: true,
            validUntil: true,
            validityPeriod: true,
            createdAt: true,
            updatedAt: true,

            sent: true,
            sentAt: true,
            sentTo: true,
            used: true,
            usedAt: true,
            locationsUsed: true,

            urls: {
              where: {
                active: true,
              },
              select: {
                id: true,
                baseUrl: true,
                premiumDomain: true,
                alias: true,
                guestAlias: true,
                urlType: true,
              },
            },
            components: true,

            user: {
              select: {
                id: true,
              },
            },

            userId: true,

            uniqueInvites: true,
            responses: true,
          },
        });
        if (urlData && inviteData) {
          return {
            urlData,
            inviteData,
          };
        }
      } catch (error) {
        console.error(error);
        return new Error("Error fetching premium data!" + error); // Error
      }
      break;

    default:
      break;
  }
}
