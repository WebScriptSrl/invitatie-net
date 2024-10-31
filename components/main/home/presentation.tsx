"use client";

import styles from "@/styles/modules/homepage.module.css";

import clsx from "clsx";
import Image from "next/image";

export default function ProductPresentation({
  invite,
  screen,
}: {
  invite: string;
  screen: string;
}) {
  return (
    <div className={clsx(styles.presentation)}>
      {screen === "mobile" && (
        <Image
          className={styles.presentationImage}
          src={"/images/telephone-7251242.svg"}
          alt="Invitatie Net"
          width={300}
          height={600}
          priority
        />
      )}

      {screen === "tablet" && (
        <Image
          className={styles.presentationImage}
          src={"/images/tablet-8353893.svg"}
          alt="Invitatie Net"
          width={300}
          height={600}
          priority
        />
      )}

      {screen === "laptop" && (
        <Image
          className={styles.presentationImage}
          src={"/images/laptop-2903310.svg"}
          alt="Invitatie Net"
          width={300}
          height={600}
          priority
        />
      )}
    </div>
  );
}
