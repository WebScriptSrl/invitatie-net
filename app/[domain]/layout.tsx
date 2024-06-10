import { ReactNode } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import prisma from "@/lib/prisma";
import { fetchInviteData } from "@/lib/fetchers";

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// Implement later -  Work in progress
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const imagesApi = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_BASE_URL;

  const id = params.id;

  const invitePath = decodeURIComponent(params.id);

  const inviteDomain =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.PUBLIC_BASE_URL}/${invitePath}`
      : `http://localhost:3000/${invitePath}`;

  const inviteData = await fetchInviteData({
    baseUrl: inviteDomain,
    urlType: "PREMIUM",
  });

  const previousImage = (await parent).openGraph?.images || [];

  // to implement later
  // const image = `${imagesApi}?file=og-image.jpg`

  if (!inviteData || inviteData instanceof Error) {
    return {
      openGraph: {
        images: previousImage,
      },
    };
  }

  return {
    title: inviteData?.inviteData.title,
    openGraph: {
      images: [
        // to implement later
        ...previousImage,
      ],
    },
  };
}

export default function InviteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const uri = decodeURIComponent(params.domain);

  return <div>{children}</div>;
}
