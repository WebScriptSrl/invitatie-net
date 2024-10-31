import ComingSoon from "@/components/main/comingSoon";
import ProductPresentation from "@/components/main/home/presentation";
import TypeWriter from "@/components/main/typeWriter";
import styles from "@/styles/modules/homepage.module.css";

import Image from "next/image";

export default function Home({
  params,
  searchParams,
}: {
  params: { domain: string };
  searchParams: URLSearchParams;
}) {
  return (
    <main className={styles.main}>
      <ComingSoon
        title="Invitații online personalizate"
        message="Incă lucrăm din greu să aducem o experiență de neuitat!"
        options={{
          additionalMessage:
            "Pentru ințelegerea dvs vă oferim o reducere de 50% la modelul Poetry disponibil! 🎉 Detalii pe Whatsapp!",
          extraDetails:
            "Modelul Poetry vine la pachet cu un domeniu premium personalizat, hărți și nelimitat la invitați!",
          promo: "50% reducere",
          buttonText: "Model disponibil",
          buttonHref: "/invitatii/nunta/poetry",
        }}
      />

      {/* <div className={styles.description}>
        <p>
          Full website coming soon&nbsp;
          <code className={styles.code}>Invitatie Net</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built with{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div> */}

      {/* <h1>
        Invitatii online{" "}
        <span
          style={{
            color: "#97BE5A",
          }}
        >
          <TypeWriter
            text={[
              "personalizate",
              "moderne",
              "sustenabile",

              "pentru nunta",
              "botez",
              "petreceri",

              "orice eveniment",

              // "design adaptativ",

              "doar pe Invitatie.Net",
            ]}
            speed={100}
            delay={100}
            className={styles.title}
            type="presentation"
          />
        </span>
      </h1> */}

      {/* <div className={styles.center}>
        <Image
          src={`/images/computer-1271863.svg`}
          alt={"Invitatie Net computer image"}
          width={300}
          height={600}
          priority
        />
      </div> */}

      {/* PRODUCT PRESENTATION */}
      {/* <div className={styles.center}>
        <ProductPresentation invite="Invitatie Net" screen="mobile" />
      </div>
      <div className={styles.center}>
        <ProductPresentation invite="Invitatie Net" screen="tablet" />
      </div>
      <div className={styles.center}>
        <ProductPresentation invite="Invitatie Net" screen="laptop" />
      </div> */}

      {/* <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}

      {/* <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}
