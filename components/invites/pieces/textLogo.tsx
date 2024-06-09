import clsx from "clsx";

import { loadFont } from "@/lib/utils";

export default function TextLogo({
  text,
  preferredFont,
  options,
}: {
  text: string;
  preferredFont?: string;
  options?: { [key: string]: any };
}) {
  const fontSize = options?.fontSize || "3.5rem";

  const font = loadFont(preferredFont!);

  return (
    <p
      id="textLogo"
      className={clsx("textLogo", font?.className)}
      style={{
        fontSize: fontSize,
        marginTop: "1rem",
        color: options?.color || "#d4af37",
      }}
    >
      {text}
    </p>
  );
}
