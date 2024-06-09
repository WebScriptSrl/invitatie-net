import styles from "@/styles/modules/components/invites/common.module.css";

import clsx from "clsx";

import { loadFont } from "@/lib/utils";

export default async function InviteFooter({
  params,
  options,
}: {
  params: { model: string };
  options?: { [key: string]: any };
}) {
  const model = decodeURIComponent(params.model);

  const font = loadFont(options?.preferredFont!);

  const secondaryFont = loadFont(options?.secondaryFont!);

  const text = options?.endText || "Va multumim!";

  return (
    <footer className={clsx(font?.className, styles.footerInvite)}>
      <h2
        className={font?.className}
        style={{
          fontSize: options?.fontSize || "2.5rem",
          color: options?.endTextColor || "white",
        }}
      >
        {text}
      </h2>
      <p
        className={clsx(secondaryFont?.className, styles.footerLogo)}
        style={{
          fontSize: options?.fontSize || "3.5rem",
          color: options?.fontColor || " rgba(241, 237, 223, 0.7)",
        }}
      >
        {options?.logo}
      </p>
    </footer>
  );
}
