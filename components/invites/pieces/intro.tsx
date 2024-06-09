import styles from "@/styles/modules/components/invites/inviteHeader.module.css";

import clsx from "clsx";

import { loadFont } from "@/lib/utils";

export default function InviteIntro({
  options,
}: {
  options?: { [key: string]: any };
}) {
  const font = loadFont(options?.preferredFont!);

  const quoteFont = loadFont(options?.preferredQuoteFont!);

  return (
    <div
      id="inviteIntro"
      className={clsx(styles.introContainer, quoteFont?.className)}
    >
      <blockquote
        className={styles.quoteContainer}
        style={{
          fontSize: options?.quoteFontSize || "1.5rem",
          color: options?.color || "white",
        }}
      >
        <q>{options?.quote?.text}</q>
        <br />
        <cite>{` - ${options?.quote?.cite}`}</cite>
      </blockquote>
      <h1
        className={clsx(
          styles.introHeading,
          font?.className,
          styles.titleShadow
        )}
        style={{
          fontSize: options?.fontSize || "5.5rem",
          color: options?.fontColor || "#d4af37",
        }}
      >
        {options?.isMobile
          ? options?.title.split(" ").map((word: string, index: number) => (
              <span key={index}>
                {word}
                <br />
              </span>
            ))
          : options?.title}
      </h1>
      <p
        className={clsx(styles.introText, quoteFont?.className)}
        style={{
          fontSize: options?.additionalTextSize || "1.5rem",
          maxWidth: options?.maxWidth || "30ch",
          color: options?.color || "white",
          fontStyle: options?.fontStyle,
          padding: options?.isMobile ? "0 2rem" : "0",
        }}
      >
        {options?.additionalText}
      </p>
    </div>
  );
}
