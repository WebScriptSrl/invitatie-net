import { ReactNode, Suspense } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}
