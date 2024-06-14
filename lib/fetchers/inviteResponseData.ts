import { IResponseData } from "../interfaces";
import prisma from "../prisma";

export async function fetchInviteResponsesData(userId: string) {
  const responses = await prisma.inviteResponse.findMany({
    where: {
      userId,
    },

    select: {
      response: true,
      invite: {
        select: {
          handle: true,
          title: true,
        },
      },
      createdAt: true,
    },
  });

  return responses as IResponseData[];
}
