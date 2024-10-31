import styles from "@/styles/modules/components/invites/common.module.css";

import clsx from "clsx";

import { loadFont } from "@/lib/utils";
import SocialBanner from "@/components/main/socialBanner";

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

  const text = options?.endText || "Vă mulțumim!";

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

      {options?.isExample && (
        <SocialBanner
          title="Invitatie.Net"
          message="Urmărește-ne pe rețelele de socializare!"
          options={{
            showWA: true,
            isExample: options?.isExample,
          }}
        />
      )}
    </footer>
  );
}
