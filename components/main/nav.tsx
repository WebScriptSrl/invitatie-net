"use client";

import styles from "@/styles/modules/mainHeader.module.css";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

import NavItem from "./navItem";
import Hamburger from "./hamburger";
import TextLogo from "../invites/pieces/textLogo";
import SocialBanner from "./socialBanner";

export default function MainNav(
  props: Readonly<{
    items: {
      handle: string;
      title: string;
      styles: string[];
    }[];
    options: { [key: string]: any };
  }>
) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [activePath, setActivePath] = useState<string | undefined>(undefined);

  const isActive = (handle: string) => {
    if (activePath === `/${handle}`) {
      return true;
    } else if (handle === "" && activePath === "/") {
      return true;
    } else if (activePath === `${handle}`) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (props.options.navType !== "main") {
      const hash = window.location.hash;

      if (hash) {
        setActivePath(hash);
      }

      return () => {
        setActivePath("");
      };
    }

    return () => {
      setActivePath(pathname);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const activeMenuClass = mobileMenu
    ? clsx(styles.active)
    : clsx(styles.inactive);

  return (
    <nav className={clsx(styles.mainNav, activeMenuClass)}>
      <Hamburger open={mobileMenu!} setOpen={setMobileMenu} />
      <TextLogo
        text={props.options?.textLogo || "Invitație.Net"}
        preferredFont={props.options?.preferredFont || "__variable_283def"}
        options={{ fontSize: "2.5rem", color: "red" }}
      />
      <ul>
        {props.items.map((item) => (
          <NavItem
            navType={props.options.navType}
            key={item.handle}
            handle={item.handle}
            title={item.title}
            styles={item.styles}
            active={isActive(item.handle)}
            setActivePath={setActivePath}
            setMobileMenu={setMobileMenu}
          />
        ))}
      </ul>
      {props.options.navType !== "main" &&
        props.options?.imageSrc !== false && (
          <Image
            className={styles.imageLogo}
            src={
              props.options?.imageSrc ? props.options.imageSrc : "/og-image.jpg"
            }
            alt="logo"
            width={mobileMenu ? 94 : 0}
            height={mobileMenu ? 94 : 0}
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              transition: "width 0.5s, height 0.5s",
              transitionDelay: "0.2s",
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: props.options?.imageShadow,
            }}
          />
        )}

      {props.options.navType === "main" && (
        <div
          className={clsx(
            styles.menuSocialBanner,
            mobileMenu ? styles.open : styles.closed
          )}
        >
          <SocialBanner
            title="Invitatie.Net"
            message="Urmărește-ne!"
            options={{
              height: 48,
              width: 48,
              facebookBgColor: "transparent",
              facebookFgColor: "red",
              xBgColor: "transparent",
              xFgColor: "red",
              instagramBgColor: "transparent",
              instagramFgColor: "red",
              youtubeBgColor: "transparent",
              youtubeFgColor: "red",
              tiktokBgColor: "transparent",
              tiktokFgColor: "red",
            }}
          />
        </div>
      )}
    </nav>
  );
}
