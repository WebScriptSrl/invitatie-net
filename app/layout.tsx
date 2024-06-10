import type { Metadata } from "next";
import { lora } from "@/styles/fonts";
import "@/styles/globals.css";
import { ensureStartsWith } from "@/lib/utils";

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME, COMPANY_NAME } = process.env;

const baseUrl = process.env.PUBLIC_BASE_URL
  ? `https://${process.env.PUBLIC_BASE_URL}`
  : `http://localhost:3000`;

const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, "@")
  : undefined;

const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, "@")
  : undefined;

export async function generateMetadata(): Promise<Metadata> {
  // const metadata = await getMetadata("rootLayout");

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Invitatie Net",
      template: `%s | ${SITE_NAME}`,
    },
    // to be continued
    // robots: {
    //   follow: true,
    //   index: true,
    // },
    description: "Invitatii online personalizate pentru evenimente speciale.",
    authors: [
      {
        name: COMPANY_NAME,
      },
    ],

    openGraph: {
      title: "Invitatie Net",
      description: "Invitatii online personalizate pentru evenimente speciale.",
      type: "website",
      locale: "ro_RO",
      url: baseUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Invitatie Net og image",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: twitterSite,
      creator: twitterCreator,
      title: "Invitatie Net",
      description: "Invitatii online personalizate pentru evenimente speciale.",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Invitatie Net og image",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={lora.className}>{children}</body>
    </html>
  );
}
