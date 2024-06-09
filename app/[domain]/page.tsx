import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { UrlType } from "@/lib/types";
import { checkUrlType } from "@/lib/helpers";
import { fetchInviteData } from "@/lib/fetchers";
import Poetry from "@/components/invites/poetry";
import { Invite } from "@prisma/client";
import { Suspense } from "react";

export async function generateStaticParams() {
  const allInvites = await prisma.invite.findMany({
    select: {
      primaryDomain: true,
    },
    where: {
      isActive: true,
    },
  });

  if (!allInvites) {
    return notFound();
  }

  const allPaths = allInvites.flatMap(({ primaryDomain }) => [primaryDomain]);

  if (!allPaths) {
    return notFound();
  }

  return allPaths;
}

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: { domain: string };
  searchParams: URLSearchParams;
}) {
  const invitePath = decodeURIComponent(params.domain);

  const inviteDomain =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.PUBLIC_BASE_URL}/${invitePath}`
      : `http://localhost:3000/${invitePath}`;

  const inviteSearchParams = new URLSearchParams(searchParams).get("invite");

  const guestSearchParams = new URLSearchParams(searchParams).get("guest");

  let urlType: UrlType = checkUrlType(inviteSearchParams, guestSearchParams);

  let inviteUrl: string = "";
  let dbUrl: string = "";

  let inviteData: Invite | null = null;

  let model: string = "";
  let components: any = [];

  switch (urlType) {
    case "TITLE_QUERY":
      inviteUrl = `${inviteDomain}?invite=${inviteSearchParams}`;
      console.log(inviteUrl, "Invite title query");
      break;

    case "TITLE_GUEST_QUERY":
      inviteUrl = `${inviteDomain}?invite=${inviteSearchParams}&guest=${guestSearchParams}`;
      console.log(inviteUrl, "Invite title guest query");
      break;

    case "GUEST_QUERY":
      inviteUrl = `${inviteDomain}?guest=${guestSearchParams}`;
      console.log(inviteUrl, "guest");
      break;

    case "PREMIUM":
      inviteUrl = `${inviteDomain}`;
      const data = await fetchInviteData({
        baseUrl: inviteUrl,
        urlType,
      });

      if (data instanceof Error) {
        console.error(data.message);
        return notFound();
      }

      if (!data) {
        return notFound();
      }

      dbUrl = data.urlData.baseUrl;
      model = data.inviteData.model;

      inviteData = data.inviteData;

      break;

    default:
      break;
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      {model === "poetry-in-gold" ? (
        <Poetry
          params={{
            components: components,
            isExample: false,
            date: inviteData?.eventDate,
            inviteHandle: inviteData?.handle,
            personsStartText: "Alături de noi vor fi",
          }}
        />
      ) : (
        <section>
          <h1>Invitație</h1>
          <p>Invitația nu a fost găsită!</p>
        </section>
      )}
      <Suspense />
    </>
  );
}
