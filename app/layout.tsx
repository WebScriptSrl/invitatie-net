import type { Metadata } from "next";
import { lora } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Invitatie Net",
  description: "Invitatii online personalizate pentru orice eveniment special.",
};

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
