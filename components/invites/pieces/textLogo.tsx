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
        textAlign: options?.textAlign || "center",
        justifyContent: options?.justifyContent || "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textShadow: `1px 1px 10px ${options?.textShadowColor || "red"}`,
        width: options?.width || "100%",
      }}
    >
      {text}
    </p>
  );
}
