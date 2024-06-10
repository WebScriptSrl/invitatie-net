import { loadFont } from "@/lib/utils";
import { ImageResponse } from "next/og";
import { inter } from "@/styles/fonts";
import Image from "next/image";

export const alt = "Invitatie Net";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/jpg";

export default async function OpenGraphImage({
  params,
  searchParams,
}: {
  params: {
    [key: string]: any;
  };
  searchParams?: URLSearchParams;
}): Promise<ImageResponse> {
  const font = loadFont("__variable_283def");

  const preferredFont = fetch(
    new URL(
      "../../styles/fonts/Bebas_Neue/BebasNeue-Regular.ttf",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const secondaryFont = fetch(
    new URL(
      "../../styles/fonts/Roboto_Slab/RobotoSlab-VariableFont_wght.ttf",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  const date = new Date(params.date);

  const dateString = date.toLocaleDateString();

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          src={"/og-image.jpg"}
          alt="Open Graph Image"
          style={{
            position: "absolute",
            top: "0",
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
          }}
        />
        <h1 style={{ font: font?.className, fontSize: 112, marginBottom: 20 }}>
          {params.title}
        </h1>
        <p style={{ font: font?.className, fontSize: 48 }}>{dateString}</p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bebas Neue",
          data: await preferredFont,
          style: "normal",
          weight: 400,
        },
        {
          name: "Roboto Slab",
          data: await secondaryFont,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
