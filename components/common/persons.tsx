"use client";

import useWindowSize from "@/lib/hooks/use-window-size";
import { loadFont } from "@/lib/utils";
import styles from "@/styles/modules/components/invites/personsPiece.module.css";
import clsx from "clsx";

export default function PersonsComponent({
  persons,
  options,
}: {
  persons: {
    name: string;
    role: string;
    image?: string;
  }[];
  options?: { [key: string]: any };
}) {
  const secondaryFont = loadFont(options?.font!);
  const primaryFont = loadFont(options?.preferredFont!);

  const { isDesktop } = useWindowSize();

  return (
    <section
      id="persons"
      className={clsx(secondaryFont?.className, styles.personsContainer)}
      style={{
        backgroundColor: options?.backgroundColor || "silver",
        color: options?.fontColor || "black",
      }}
    >
      <h2
        style={{
          fontSize: options?.fontSize || "1.5rem",
          color: options?.fontColor || "black",
        }}
      >
        {options?.startText}
      </h2>
      <span className={styles.lineBreak}></span>

      <h2>Nașii</h2>
      <div className={styles.parentsContainer}>
        {persons.map((person, index) =>
          person.role.toLowerCase().includes("nasi") ? (
            <div key={index}>
              <h2
                className={primaryFont?.className}
                style={{
                  fontSize: isDesktop ? "3.5rem" : "2.25rem",
                  color: options?.fontColor || "black",
                }}
              >
                {person.name}
              </h2>
            </div>
          ) : null
        )}
      </div>

      <span className={styles.lineBreak}></span>

      <h2>Părinții</h2>
      <div className={styles.parentsContainer}>
        {persons.map((person, index) =>
          person.role.toLowerCase().includes("parinti") ? (
            <div key={index}>
              <h2
                className={primaryFont?.className}
                style={{
                  fontSize: isDesktop ? "3.5rem" : "2.25rem",
                  color: options?.fontColor || "black",
                }}
              >
                {person.name}
              </h2>
            </div>
          ) : null
        )}
      </div>

      <span className={styles.lineBreak}></span>

      <h2>Mereu în sufletele noastre</h2>
      <div className={clsx(styles.parentsContainer)}>
        {persons.map((person, index) =>
          person.role.toLowerCase().includes("decedat") ? (
            <div key={index} className={styles.deceasedContainer}>
              <h2
                className={primaryFont?.className}
                style={{
                  fontSize: isDesktop ? "2.5rem" : "1.75rem",
                  color: options?.fontColor || "black",
                }}
              >
                {person.name}
              </h2>
            </div>
          ) : null
        )}
      </div>
      <span className={styles.lineBreak}></span>
    </section>
  );
}
