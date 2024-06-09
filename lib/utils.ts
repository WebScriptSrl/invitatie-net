import { clsx, type ClassValue } from "clsx";

import * as fonts from "@/styles/fonts";

export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}

export const ensureStartsWith = (stringToCheck: string, startsWith: string) => {
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;
};

export const toDateString = (date: Date) => {
  return new Date(date).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Bucharest",
    formatMatcher: "best fit",
    localeMatcher: "best fit",
  });
};

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
  });

  return response.json();
}

export const capitalize = (string: string) => {
  if (typeof string !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const loadFont = (variable: string) => {
  const fontsArray = Object.values(fonts);

  // console.log(fontsArray);

  const font = fontsArray.find((font) => font.variable === variable);

  if (font) {
    return font;
  }

  return null;
};
