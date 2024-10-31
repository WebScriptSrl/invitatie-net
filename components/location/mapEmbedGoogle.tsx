import styles from "@/styles/modules/components/invites/location.module.css";

import { GoogleMapsEmbed } from "@next/third-parties/google";

export default function MapEmbedGoogle({
  options,
}: {
  options?: { [key: string]: any };
}) {
  const q =
    options?.location?.replace(" ", "+") +
    "," +
    options?.address.replace(", ", ",").replace(" ", "+");

  console.log(q);

  return (
    <div className={styles.locationContainer}>
      {/* <h1>{options?.location}</h1> */}
      <GoogleMapsEmbed
        apiKey={options?.googleMapsApiKey}
        width={options?.width || "600"}
        height={options?.height || "450"}
        mode="place"
        zoom="15"
        allowfullscreen={true}
        center={options?.center}
        region={options?.region || "RO"}
        q={q}
        style="border:0;"
      />
    </div>
  );
}
