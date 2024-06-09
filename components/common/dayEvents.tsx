"use client";

import styles from "@/styles/modules/components/invites/common.module.css";

import clsx from "clsx";
import Image from "next/image";

import useWindowSize from "@/lib/hooks/use-window-size";
import { capitalize, loadFont } from "@/lib/utils";
import GoogleMapsLocation from "../location/googleMaps";
import MapEmbedGoogle from "../location/mapEmbedGoogle";

export default function DayEvents({
  event,
  options,
}: {
  event: {
    time: string;
    date: string;
    event: string;
    location?: string;
    address: string;
  };
  options?: { [key: string]: any };
}) {
  const eventTypeSVG = (
    event: string
  ): {
    src: string;
    type: string;
  } => {
    if (event.toLowerCase().includes("civil")) {
      return {
        src: "/wedding-rings.svg",
        type: "cununie civila",
      };
    } else if (event.toLowerCase().includes("religioas")) {
      return {
        src: "/building-church.svg",
        type: "cununie religioasa",
      };
    } else if (event.toLowerCase().includes("petrecere")) {
      return {
        src: "/champagne-glases.svg",
        type: "petrecere",
      };
    } else {
      return {
        src: event,
        type: event,
      };
    }
  };

  const font = loadFont(options?.preferredFont!);
  const secondaryFont = loadFont(options?.secondaryFont!);
  const { windowSize, isDesktop } = useWindowSize();

  return (
    <section className={clsx(font?.className, styles.dayEventsSection)}>
      <div className={clsx(styles.eventDetails)}>
        <h2
          className={clsx(styles.eventHeading)}
          style={{
            color: options?.color,
          }}
        >
          {event.event}
        </h2>

        <div>
          <Image
            src={eventTypeSVG(event.event).src}
            alt={event.event}
            width={100}
            height={100}
            style={{
              color:
                eventTypeSVG(event.event).type === "cununie religioasa"
                  ? "black"
                  : undefined,
            }}
          />
        </div>

        <span className={styles.lineBreak}></span>
        <p
          className={clsx(secondaryFont?.className, styles.eventDate)}
          style={{
            color: options?.color,
          }}
        >
          {event.date}
        </p>
        <p
          className={clsx(font?.className, styles.eventTime)}
          style={{
            color: options?.color,
          }}
        >
          {event.time}
        </p>
        <span className={styles.lineBreak}></span>
        <h2
          className={clsx(secondaryFont?.className, styles.eventName)}
          style={{
            fontSize: options?.fontSize,
            color: options?.color || "black",
          }}
        >
          {capitalize(event.event)}
        </h2>
        {event.location && (
          <p
            className={clsx(font?.className, styles.eventLocation)}
            style={{
              fontSize: options?.fontSize,
              color: options?.color,
            }}
          >
            {capitalize(event.location)}
          </p>
        )}

        {event.address && (
          <p
            className={clsx(font?.className, styles.eventAddress)}
            style={{
              fontSize: options?.fontSize,
              color: options?.color,
            }}
          >
            {capitalize(event.address)}
          </p>
        )}
      </div>
      <MapEmbedGoogle
        options={{
          googleMapsApiKey: options?.googleMapsApiKey,
          height: 400,
          width: isDesktop ? windowSize.width! - 40 : windowSize.width,
          address: event.address,
          location: event.location,
          color: options?.color,
          fontSize: options?.fontSize,
          preferredFont: options?.preferredFont,
        }}
      />
    </section>
  );
}
