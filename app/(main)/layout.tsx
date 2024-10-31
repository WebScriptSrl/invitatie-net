import styles from "@/styles/modules/homepage.module.css";

import clsx from "clsx";

import MainHeader from "@/components/main/mainHeader";

export default function MainLayout({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: { [key: string]: string };
}) {
  return (
    <div className={clsx(styles.mainContainer)} style={{}}>
      <MainHeader
        options={{
          navType: "main",
        }}
      />
      {children}
    </div>
  );
}
