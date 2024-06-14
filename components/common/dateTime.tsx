"use client";

import styles from "@/styles/modules/components/invites/common.module.css";
import headerStyles from "@/styles/modules/components/invites/inviteHeader.module.css";

import Image from "next/image";
import clsx from "clsx";

import { capitalize, loadFont } from "@/lib/utils";
import TimeRemaining from "../invites/pieces/timeRemaining";
import useWindowSize from "@/lib/hooks/use-window-size";

export default function DateTimeComponent({
  dateTime,
  dateInMs,
  options,
}: {
  dateTime: string;
  dateInMs: number;
  options?: { [key: string]: any };
}) {
  const introText = options?.dateTimeIntroText || "Ziua noastră !";

  const font = loadFont(options?.preferredFont!);
  const secondaryFont = loadFont(options?.secondaryFont!);

  const weekDay = capitalize(dateTime.split(" ")[0]);
  const day = dateTime.split(" ")[1];
  const month = capitalize(dateTime.split(" ")[2]);
  const year = dateTime.split(" ")[3];

  const time = dateTime.split(" ")[5];

  const { isDesktop } = useWindowSize();

  return (
    <section className={clsx(secondaryFont?.className, styles.dateTimeSection)}>
      <h2 className={styles.dateTimeHeading}>{introText}</h2>
      <span className={styles.lineBreak}></span>
      <p
        className={clsx(font?.className, styles.weekDay)}
        style={{
          fontSize: options?.fontSize,
          color: options?.color,
        }}
      >
        {weekDay}
      </p>
      <p
        className={clsx(secondaryFont?.className, styles.day)}
        style={{
          fontSize: options?.fontSize,
          color: options?.color,
        }}
      >
        {day}
      </p>
      <p
        className={clsx(font?.className, styles.month)}
        style={{
          fontSize: options?.fontSize,
          color: options?.color,
        }}
      >
        {month}
      </p>
      <p
        className={clsx(secondaryFont?.className, styles.year)}
        style={{
          fontSize: options?.fontSize,
          color: options?.color,
        }}
      >
        {year}
      </p>

      <span className={styles.lineBreak}></span>

      <TimeRemaining dateInMs={dateInMs} options={options} />

      {options?.image && (
        <Image
          className={headerStyles.backgroundImage}
          src={isDesktop ? options?.desktopImage : options?.image}
          alt="Wedding Image"
          width={isDesktop ? 1200 : 300}
          height={isDesktop ? 800 : 1200}
          style={{
            height: "100vh",
            width: "100%",
            objectFit: "cover",
            objectPosition: options?.imagePosition || "center",
            position: "absolute",
            zIndex: -10,
          }}
        />
      )}
    </section>
  );
}
