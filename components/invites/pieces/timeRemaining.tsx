"use client";

import styles from "@/styles/modules/components/invites/common.module.css";

import clsx from "clsx";

import { loadFont } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function TimeRemaining({
  dateInMs,
  options,
}: {
  dateInMs: number;
  options?: { [key: string]: any };
}) {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const now = Date.now();

  // get timzone offset
  const timeOffset = new Date().getTimezoneOffset() * 60000;

  const timeRemaining = dateInMs - (now - timeOffset);
  const remainigDays = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const remainigHours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const remainigMinutes = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  );
  const remainigSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(timeRemaining);
      setDays(remainigDays);
      setHours(remainigHours);
      setMinutes(remainigMinutes);
      setSeconds(remainigSeconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [
    timeRemaining,
    remainigDays,
    remainigHours,
    remainigMinutes,
    remainigSeconds,
  ]);

  const font = loadFont(options?.secondaryFont!);

  return (
    <div
      id="timeRemaining"
      className={clsx(font?.className, styles.timeRemainingContainer)}
      style={{
        color: options?.color || "white",
        fontSize: options?.fontSize || "1.5rem",
      }}
    >
      <p>Au mai rămas</p>
      <div className={clsx(styles.timeRemainingBox)}>
        <p>
          {days} {days === 1 ? "zi" : "zile"}
        </p>
        <p>
          {hours} {hours === 1 ? "oră" : "ore"}
        </p>
        <p>
          {minutes} {minutes === 1 ? "minut" : "minute"}
        </p>
        <p
          style={{
            display: options?.showSeconds ? "block" : "none",
          }}
        >
          {seconds} {seconds === 1 ? "secundă" : "secunde"}
        </p>
      </div>
      <span className={styles.lineBreak}></span>
    </div>
  );
}
