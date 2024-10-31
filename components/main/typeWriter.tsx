"use client";

import clsx from "clsx";
import Typewriter from "typewriter-effect";

export default function TypeWriter({
  text,
  speed,
  delay,
  className,
  type,
}: {
  text: string[];
  speed: number;
  delay: number;
  className: string;
  type: string;
}) {
  switch (type) {
    case "main":
      break;

    case "presentation":
      return (
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(text[0])
              .pauseFor(2000)
              .deleteAll()
              .typeString(text[1])
              .pauseFor(2000)
              .deleteAll()
              .typeString(text[2])
              .pauseFor(2000)
              .deleteAll()
              .typeString(text[3])
              .pauseFor(2000)
              .deleteChars(5)
              .typeString(text[4])
              .pauseFor(2000)
              .deleteChars(text[4].length)
              .typeString(text[5])
              .pauseFor(2000)
              .deleteChars(text[5].length)
              .typeString(text[6])
              .pauseFor(2000)
              .deleteAll()
              .typeString(text[7])
              .pauseFor(2000)
              .start();
          }}
          options={{
            loop: true,
            delay: delay,
          }}
        />
      );

    default:
      return (
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString(text[0]).pauseFor(2000).deleteAll();
          }}
          options={{
            loop: true,
            delay: delay,
          }}
        />
      );
  }
}
