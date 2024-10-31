"use client";

import useWindowSize from "@/lib/hooks/use-window-size";
import { loadFont } from "@/lib/utils";
import styles from "@/styles/modules/components/invites/personsPiece.module.css";
import clsx from "clsx";

export default function PersonsComponent({
  persons,
  isDone,
  options,
}: {
  persons: {
    name: string;
    role: string;
    image?: string;
  }[];
  isDone?: boolean;
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
        textAlign: "center",
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

      {isDone && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <h2
            style={{
              fontSize: options?.fontSize || "1.5rem",
              color: options?.fontColor || "black",
            }}
          >
            Nu există cuvinte care să exprime recunoștința noastră pentru
            sprijinul și dragostea pe care ne-ați oferit-o de-a lungul timpului.
            <br />
            Vă mulțumim din suflet!
          </h2>
          <p>
            P.S. Ne pare rău că nu am putut să stăm prea mult pe acasă după
            eveniment! 😅
          </p>
          <p>Și că s-a defectat mașina când am vrut să venim la voi! 😅</p>
          <span className={styles.lineBreak}></span>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: options?.fontSize || "1.5rem",
                color: options?.fontColor || "black",
              }}
            >
              Nu în ultimul rând, vă mulțumim tuturor celor care ați fost
              alături de noi în această zi !
            </h2>

            <p>
              Ne-ați făcut ziua mai frumoasă și mai specială ! Vă mulțumim din
              suflet !
            </p>

            <span className={styles.lineBreak}></span>
          </div>
        </div>
      )}
    </section>
  );
}
