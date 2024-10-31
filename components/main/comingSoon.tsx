import styles from "@/styles/modules/components/utils.module.css";

import SocialBanner from "./socialBanner";
import TextLogo from "../invites/pieces/textLogo";
import Link from "next/link";

export default function ComingSoon(
  props: Readonly<{
    title: string;
    message: string;
    options?: { [key: string]: any };
  }>
) {
  return (
    <div className={styles.commingSoonBox}>
      <TextLogo
        text="Invitatie.Net"
        preferredFont={"__variable_283def"}
        options={{ fontSize: "2.5rem", color: "red" }}
      />
      <h1>{props.title}</h1>

      {props.options?.promo && (
        <h2
          style={{
            color: "red",
            textAlign: "center",
            margin: "1rem 0",
            padding: "0 1rem",
            borderBottom: "1px solid red",
            fontSize: "2.5rem",
          }}
        >
          {props.options?.promo}
        </h2>
      )}

      <p>{props.message}</p>

      <p
        style={{
          textAlign: "center",
          margin: "1rem 0",
          textDecoration: "underline",
          textDecorationColor: "red",
          padding: "0 1rem",
          fontSize: "1.2rem",
        }}
      >
        {props.options?.additionalMessage}
      </p>

      {props.options?.extraDetails && (
        <p
          style={{
            textAlign: "center",
            margin: "1rem 0",
            padding: "0 1rem",
            fontSize: "1.2rem",
          }}
        >
          {props.options?.extraDetails}
        </p>
      )}
      <Link
        href={props.options?.buttonHref || "/invitatii"}
        className={styles.commingSoonBtn}
      >
        {props.options?.buttonText || "Vezi invitatii"}
      </Link>
      <SocialBanner
        title="Invitatie.Net"
        message="Urmareste-ne pe retelele de socializare!"
        options={{
          showWA: true,
        }}
      />
    </div>
  );
}
