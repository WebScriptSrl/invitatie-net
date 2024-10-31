import styles from "@/styles/modules/mainHeader.module.css";

import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

export default function Hamburger({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const classes = clsx(
    styles.hamburger,
    open === true ? styles.open : styles.closed
  );

  return (
    <div className={classes} onClick={() => setOpen(!open)}>
      <div className={styles.hamburgerLine}></div>
      <div className={styles.hamburgerLine}></div>
      <div className={styles.hamburgerLine}></div>
    </div>
  );
}
