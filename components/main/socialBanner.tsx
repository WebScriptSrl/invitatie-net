import styles from "@/styles/modules/components/utils.module.css";

import FacebookIcon from "../icons/facebook";
import InstagramIcon from "../icons/instagram";
import TwitterIcon from "../icons/twitter";
import YoutubeIcon from "../icons/youtube";
import WhatsappIcon from "../icons/whatsapp";
import clsx from "clsx";
import TiktokIcon from "../icons/tiktok";

const { COMPANY_PHONE } = process.env;

export default function SocialBanner(
  props: Readonly<{
    title: string;
    message: string;
    options?: { [key: string]: any };
  }>
) {
  const waStandardMessage =
    "Buna! Ma intereseaza o invitatie! Poti sa ma ajuti cu mai multe detalii?";

  const waMessage = encodeURIComponent(waStandardMessage);

  return (
    <div className={styles.socialMediaBanner}>
      {props.options?.showWA === true && (
        <div className={clsx(styles.whatsappContainer)}>
          {props.options?.isExample && <h2>Comandă acest model</h2>}
          <p>Contactează-ne pe Whatsapp!</p>
          <a
            href={`https://wa.me/${COMPANY_PHONE}?text=${waMessage}`}
            target="_blank"
            referrerPolicy="no-referrer"
            aria-label="Whatsapp"
            rel="noreferrer noopener"
          >
            <WhatsappIcon
              style={{
                height: props.options?.height || 48,
                width: props.options?.width || 48,
              }}
              bgColor={props.options?.whatsappBgColor}
              fgColor={props.options?.whatsappFgColor}
              as="span"
            />
          </a>
        </div>
      )}

      <p>{props.message}</p>
      <div className={clsx(styles.socialMediaContainer)}>
        <a
          href="https://www.facebook.com/invitatie.net"
          target="_blank"
          referrerPolicy="no-referrer"
          aria-label="Facebook"
          rel="noreferrer noopener"
        >
          <FacebookIcon
            style={{
              height: props.options?.height || 48,
              width: props.options?.width || 48,
            }}
            bgColor={props.options?.facebookBgColor}
            fgColor={props.options?.facebookFgColor}
            as="span"
          />
        </a>

        <a
          href="https://www.instagram.com/invitatie_net"
          target="_blank"
          referrerPolicy="no-referrer"
          aria-label="Instagram"
          rel="noreferrer noopener"
        >
          <InstagramIcon
            style={{
              height: props.options?.height || 48,
              width: props.options?.width || 48,
            }}
            bgColor={props.options?.instagramBgColor}
            fgColor={props.options?.instagramFgColor}
            as="span"
          />
        </a>

        <a
          href="https://x.com/InvitatieNet"
          target="_blank"
          referrerPolicy="no-referrer"
          aria-label="Twitter"
          rel="noreferrer noopener"
        >
          <TwitterIcon
            style={{
              height: props.options?.height || 48,
              width: props.options?.width || 48,
            }}
            bgColor={props.options?.xBgColor}
            fgColor={props.options?.xFgColor}
            as="span"
          />
        </a>

        <a
          href="https://www.youtube.com/@invitatie_net"
          target="_blank"
          referrerPolicy="no-referrer"
          aria-label="Youtube"
          rel="noreferrer noopener"
        >
          <YoutubeIcon
            style={{
              height: props.options?.height || 48,
              width: props.options?.width || 48,
            }}
            bgColor={props.options?.youtubeBgColor}
            fgColor={props.options?.youtubeFgColor}
            as="span"
          />
        </a>

        <a
          href="https://www.tiktok.com/@invitatie.net"
          target="_blank"
          referrerPolicy="no-referrer"
          aria-label="TikTok"
          rel="noreferrer noopener"
        >
          <TiktokIcon
            style={{
              height: props.options?.height || 48,
              width: props.options?.width || 48,
            }}
            bgColor={props.options?.tiktokBgColor}
            fgColor={props.options?.tiktokFgColor}
            as="span"
          />
        </a>
      </div>
    </div>
  );
}
