import styles from "@/styles/modules/mainHeader.module.css";

import clsx from "clsx";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function NavItem(
  props: Readonly<{
    navType: string;
    handle: string;
    title: string;
    styles: string[];
    active?: boolean;
    setActivePath: Dispatch<SetStateAction<string | undefined>>;
    setMobileMenu?: Dispatch<SetStateAction<boolean>>;
  }>
) {
  const classes = clsx(
    styles.navItem,
    props.styles.map((style) => styles[style]),
    props.active ? styles.activePath : ""
  );

  return (
    <Link
      href={props.navType !== "main" ? `#${props.handle}` : `/${props.handle}`}
      className={classes}
      onClick={() => {
        props.setActivePath(props.handle);
        if (props.setMobileMenu) {
          props.setMobileMenu(false);
        }
      }}
    >
      <li>{props.title.toUpperCase()}</li>
    </Link>
  );
}
