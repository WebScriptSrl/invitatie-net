import styles from "@/styles/modules/mainHeader.module.css";

import clsx from "clsx";

import MainNav from "./nav";
import Button from "./button";

const imagesApi = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_BASE_URL;

const menuItems = [
  {
    handle: "",
    title: "Acasă",
    styles: ["home"],
  },
  {
    handle: "invitatii",
    title: "Invitații",
    styles: ["products"],
  },
  {
    handle: "servicii",
    title: "Servicii",
    styles: ["services"],
  },
  {
    handle: "blog",
    title: "Blog",
    styles: ["blog"],
  },

  {
    handle: "contact",
    title: "Contact",
    styles: ["contact"],
  },
];

export default function MainHeader({
  item,
  options,
}: {
  item?: {
    handle: string;
    title: string;
    styles: string[];
  };
  options?: { [key: string]: string };
}) {
  const menuImage = "dominicana-mobile-2.jpg";

  const classes = clsx(
    styles.mainHeader,
    menuItems.map((item) => item.styles)
  );
  return (
    <header
      className={classes}
      style={
        {
          // color: "#850000",
        }
      }
    >
      <MainNav
        items={menuItems}
        options={{
          imageSrc: `${imagesApi}?file=${options?.imageSrc || menuImage}`,
          navType: options?.navType || "main",
        }}
      />

      {options?.navType === "main" && (
        <Button
          options={{
            href: "/login",
            disabled: "disabled",
          }}
        >
          Contul meu
        </Button>
      )}
    </header>
  );
}
