import styles from "@/styles/modules/components/utils.module.css";

import { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function Button({
  children,
  options,
}: {
  children: ReactNode;
  options: { [key: string]: string };
}) {
  const classes = clsx(styles.button, options?.styles);

  return (
    <Link href={options.href}>
      <button
        className={classes}
        style={{}}
        disabled={options?.disabled === "disabled"}
      >
        {children}
      </button>
    </Link>
  );
}
