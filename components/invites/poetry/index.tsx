import styles from "@/styles/modules/components/invites/common.module.css";

import clsx from "clsx";

import PersonsComponent from "@/components/common/persons";
import InviteFooter from "../pieces/footer";
import InviteHeader from "../pieces/header";
import DateTimeComponent from "@/components/common/dateTime";
import { loadFont, toDateString } from "@/lib/utils";
import DayEvents from "@/components/common/dayEvents";
import ConfirmationForm from "@/components/common/confirmationForm";

export const dynamic = "force-dynamic";

const api =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default async function Poetry({
  params,
  searchParams,
}: {
  params: {
    [key: string]: any;
  };
  searchParams?: URLSearchParams;
}) {
  const eventsHeading =
    "Evenimentele din ziua noastră, la care va așteptăm să fiți alături de noi !";

  const model = decodeURIComponent(params.model);

  const date =
    params.isExample === false
      ? new Date(params.date)
      : new Date(Date.now() + 1000 * 60 * 60 * 24 * 90);

  const dateInMs = date.getTime();

  const timezoneOffset = date.getTimezoneOffset() * 1000 * 60;

  date.setTime(date.getTime());

  const dateString = toDateString(date);

  const personsStartText =
    params.isExample === false
      ? params.personsStartText
      : "Alături de noi vor fi";

  const persons = [
    {
      name: "Roxana și  Tiberiu Mielu",
      role: "Nasi mireasa",
    },
    {
      name: "Ionela și Valentin Buciuman",
      role: "Nasi mire",
    },
    {
      name: "Claudia Ghișe",
      role: "Parinti mireasa",
    },
    {
      name: "Saveta și Luca Simion",
      role: "Parinti mire",
    },
    {
      name: "Nicolae Ghișe",
      role: "Decedat - mireasa",
    },
    {
      name: "Vasile Szekely",
      role: "Decedat - mire",
    },
  ];

  const quote = {
    text: "Poveștile de dragoste adevărate nu au niciodată sfârșit.",
    cite: "Richard Bach",
  };

  const defaultBackgroundImage = "default-header-background-image-1200x800.jpg";

  const mobileImageBackground = "dominicana-mobile-2.jpg";

  const dateTimeImageBackground = "dominicana-mobile-4.jpg";

  const mobileImage = await fetch(
    `${api}/get-image?file=${mobileImageBackground}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const image = await fetch(`${api}/get-image?file=${defaultBackgroundImage}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const dateTimeImage = await fetch(
    `${api}/get-image?file=${dateTimeImageBackground}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const primaryFont = "__variable_283def";
  const secondaryFont = "__variable_b7e023";

  const font = loadFont(secondaryFont);

  return (
    <>
      <InviteHeader
        logo={"Francesca & Călin"}
        menu={["Cine", "Cand", "Unde", "Ce", "Confirma"]}
        title={"Francesca & Călin"}
        quote={quote}
        options={{
          preferredLogoFont: primaryFont,
          secondaryFont: secondaryFont,
          image: image.url,
          mobileImage: mobileImage.url,
          showMenu: false,
          guest: params.guestName,
          guestText: params.guestText,
        }}
      />
      <PersonsComponent
        persons={persons}
        options={{
          backgroundColor: "#f5f5f5",
          fontColor: "#333",
          preferredFont: primaryFont,
          font: secondaryFont,
          startText: personsStartText,
        }}
      />

      <DateTimeComponent
        dateTime={dateString}
        dateInMs={dateInMs}
        options={{
          preferredFont: primaryFont,
          secondaryFont: secondaryFont,
          timezoneOffset: timezoneOffset,
          // fontSize: "2rem",
          // color: "white",
          showSeconds: false,
          image: dateTimeImage.url,
          desktopImage: image.url,
        }}
      />

      <div className={clsx(font?.className, styles.eventsHeadingContainer)}>
        <h2>{eventsHeading}</h2>
      </div>

      <DayEvents
        event={{
          time: "14:00",
          date: "24 August 2024",
          location: "Starea civilă",
          address: "Parcul Central, Cluj-Napoca, Foișor",
          event: "Cununia civilă",
        }}
        options={{
          preferredFont: secondaryFont,
          secondaryFont: primaryFont,
          googleMapsApiKey: googleMapsApiKey,
        }}
      />

      <DayEvents
        event={{
          time: "15:00",
          date: "24 August 2024",
          location: "Biserica Sfântul Ilie",
          address: "Str. Târnavelor, Cluj-Napoca",
          event: "Cununia religioasă",
        }}
        options={{
          preferredFont: secondaryFont,
          secondaryFont: primaryFont,
          googleMapsApiKey: googleMapsApiKey,
        }}
      />
      <DayEvents
        event={{
          time: "18:00",
          date: "24 August 2024",
          location: "Amiral Events & Style",
          address: "Str. Câmpina, Cluj-Napoca",
          event: "Petrecerea de nuntă",
        }}
        options={{
          preferredFont: secondaryFont,
          secondaryFont: primaryFont,
          googleMapsApiKey: googleMapsApiKey,
        }}
      />

      <ConfirmationForm
        invite={[
          {
            from: "Francesca & Călin",
            handle: params.inviteHandle,
            to: "Francesca & Călin",

            socials: {
              facebook: "https://www.facebook.com/",
              instagram: "https://www.instagram.com/",
              pinterest: "https://www.pinterest.com/",
              twitter: "https://www.twitter.com/",
              phone: "+40712345678",
              email: " [email protected]",
            },
          },
        ]}
        options={{
          baseApi: api,
          startText:
            "Vă așteptăm cu drag și vă rugăm să ne confirmați prezența!",
          deadline: {
            text: "Confirmarea se poate face până la data de",
            date: "09 August 2024",
          },
          preferredFont: secondaryFont,
          fields: [
            {
              name: "menu",
              label: "Meniu",
              type: "select",
              options: [
                { value: "default", label: "Meniu normal bazat pe carne" },
                { value: "vegetarian", label: "Meniu vegetarian" },
                {
                  value: "ovo-lacto-vegetarian",
                  label: "Meniu ovo-lacto-vegetarian",
                },
              ],
              required: true,
            },
            { name: "name", label: "Nume", type: "text", required: true },
            { name: "phone", label: "Telefon", type: "tel", required: false },
            {
              name: "message",
              label: "Mesaj",
              type: "textarea",
              required: false,
            },
          ],
        }}
      />

      <InviteFooter
        params={{ model: model }}
        options={{
          preferredFont: secondaryFont,
          secondaryFont: primaryFont,
          logo: "Francesca & Călin",
          endTextColor: "rgba(255, 255, 255, 0.9)",

          endText: "Vă mulțumim!",
        }}
      />
    </>
  );
}
