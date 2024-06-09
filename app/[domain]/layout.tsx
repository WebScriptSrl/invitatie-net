import { ReactNode } from "react";

export default function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const uri = decodeURIComponent(params.domain);

  return <div>{children}</div>;
}
