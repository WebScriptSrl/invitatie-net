"use client";

import styles from "@/styles/modules/components/invites/inviteHeader.module.css";

import clsx from "clsx";
import Image from "next/image";

import TextLogo from "./textLogo";
import InviteIntro from "./intro";
import { loadFont } from "@/lib/utils";
import useWindowSize from "@/lib/hooks/use-window-size";

export default function InviteHeader({
  logo,
  menu,
  title,
  quote,
  options,
}: {
  logo: string;
  menu?: string[];
  title?: string;
  quote?: { text: string; cite: string };
  options?: {
    [key: string]: any;
  };
}) {
  const fontMenu = loadFont(options?.preferredMenuFont!);

  const additionalText = options?.additionalText
    ? options.additionalText
    : "Va invităm sa ne fiți alături la începerea unui nou capitol al poveștii noastre!";

  const { isMobile, isDesktop } = useWindowSize();

  return (
    <header className={styles.header}>
      <section className={styles.upperSection}>
        <TextLogo
          text={logo}
          preferredFont={options?.preferredLogoFont}
          options={{
            fontSize: isDesktop ? "2.5rem" : "1.5rem",
            color: "silver",
          }}
        />
        {menu && menu.length >= 4 && options?.showMenu && (
          <nav
            className={clsx(styles.menuUp, fontMenu?.className)}
            style={{
              fontSize: isDesktop ? "1.1rem" : "0.825rem",
            }}
          >
            {menu.map((item, index) => (
              <a key={index} href={`#${item.toLowerCase()}`}>
                {item === "Confirma"
                  ? "Confirmă"
                  : item === "Cine"
                  ? "Cine?"
                  : item === "Cand"
                  ? "Când?"
                  : item === "Unde"
                  ? "Unde?"
                  : item === "Ce"
                  ? "Ce?"
                  : item}
              </a>
            ))}
          </nav>
        )}
      </section>

      {options?.image && (
        <Image
          className={styles.backgroundImage}
          priority
          src={isDesktop ? options.image : options.mobileImage}
          alt="Invitation background image"
          width={isDesktop ? 1200 : 800}
          height={isDesktop ? 800 : 1200}
          layout="responsive"
          style={{
            height: "100vh",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute",
            zIndex: -10,
          }}
        />
      )}

      <section className={styles.lowerSection} id="cine">
        <InviteIntro
          options={{
            preferredFont: options?.preferredTitleFont
              ? options.preferredTitleFont
              : options?.preferredLogoFont,
            preferredQuoteFont: options?.secondaryFont,
            title: title,
            quote: quote,
            additionalText: additionalText,
            isMobile: isMobile,
            fontSize: isDesktop ? "7rem" : "5rem",
            color: options?.fontColor || "white",
          }}
        />
      </section>
    </header>
  );
}
