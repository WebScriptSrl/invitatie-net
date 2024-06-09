import { ReactNode, Suspense } from "react";

export default function InviteModelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}
