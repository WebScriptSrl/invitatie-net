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

const imagesApi = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_BASE_URL;

const api =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;

const googleMapsApiKey =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_DEV
    : process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default async function Poetry({
  params,
  searchParams,
}: {
  params: {
    [key: string]: any;
  };
  searchParams?: URLSearchParams;
}) {
  const model = decodeURIComponent(params.model);

  const newDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 90);
  const deadlineExample = new Date(Date.now() + 1000 * 60 * 60 * 24 * 80);

  const civilDate = new Date(params.civilDate);

  const date =
    params.isExample === false
      ? new Date(params.date)
      : new Date(newDate.toISOString());

  const exampleDateEvents = newDate.toLocaleDateString("ro-RO", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isDone = date < new Date();

  const eventsHeading = isDone
    ? "Știm că a fost o zi lungă! Vă mulțumim că ați fost împreună cu noi la :"
    : "Evenimentele din ziua noastră, la care va așteptăm să fiți alături de noi !";

  const dateInMs = isDone ? civilDate.getTime() : date.getTime();

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

  const defaultBackgroundImage = "francesca-si-calin-101131.avif";

  const mobileImageBackground = "francesca-si-calin-101131-mobile.avif";

  const dateTimeImageBackground = "francesca-si-calin-100907-portrait.avif";
  const dateTimeImageBackgroundDesktop = "francesca-si-calin-101092.avif";

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
          image: `${imagesApi}?file=${defaultBackgroundImage}`,
          mobileImage: `${imagesApi}?file=${mobileImageBackground}`,
          showMenu: false,
          guest: params.guestName,
          guestText: params.guestText,
          additionalText: isDone
            ? "Noul capitol din viața noastră a început alături de cei mai frumoși oameni din viața noastră !"
            : "",
        }}
      />

      <PersonsComponent
        persons={persons}
        isDone={isDone}
        options={{
          backgroundColor: "#f5f5f5",
          fontColor: "#333",
          preferredFont: primaryFont,
          font: secondaryFont,
          startText: !isDone
            ? personsStartText
            : "Mulțumim familiilor noastre pentru susținere și dragoste!",
        }}
      />

      <DateTimeComponent
        dateTime={dateString}
        dateInMs={dateInMs}
        isDone={isDone}
        options={{
          dateTimeIntroText: isDone
            ? "Ziua noastră a fost !"
            : "Ziua noastră !",
          preferredFont: primaryFont,
          secondaryFont: secondaryFont,
          timezoneOffset: timezoneOffset,
          // fontSize: "2rem",
          // color: "white",
          showSeconds: false,
          image: `${imagesApi}?file=${dateTimeImageBackground}`,
          desktopImage: `${imagesApi}?file=${dateTimeImageBackgroundDesktop}`,
          imagePosition: "bottom",
        }}
      />

      <div className={clsx(font?.className, styles.eventsHeadingContainer)}>
        <h2>{eventsHeading}</h2>
      </div>

      <DayEvents
        event={{
          time: "14:00",
          date:
            params.isExample === false ? "24 August 2024" : exampleDateEvents,
          location: "Foișor",
          address: "Parcul Central, Cluj-Napoca",
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
          date:
            params.isExample === false ? "24 August 2024" : exampleDateEvents,
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
          date:
            params.isExample === false ? "24 August 2024" : exampleDateEvents,
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

      {!isDone && (
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
              date:
                params.isExample === false
                  ? "09 August 2024"
                  : deadlineExample.toLocaleDateString("ro-RO", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }),
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
            button: {
              isExample: params.isExample,
            },
          }}
        />
      )}

      <InviteFooter
        params={{ model: model }}
        options={{
          preferredFont: secondaryFont,
          secondaryFont: primaryFont,
          logo: "Francesca & Călin",
          endTextColor: "rgba(255, 255, 255, 0.9)",

          endText: isDone
            ? "Vă mulțumim că ați fost alături de noi!"
            : "Vă mulțumim!",
          isExample: params.isExample,
          exampleText: "Aceasta este o invitație de exemplu.",
        }}
      />
    </>
  );
}
