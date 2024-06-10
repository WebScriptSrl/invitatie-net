import styles from "@/styles/modules/dashboard.module.css";

import { fetchInviteResponsesData } from "@/lib/fetchers/inviteResponseData";
import { capitalize } from "@/lib/utils";

// Testing purposes
// const userTestId = "clwzfi7ou1002v1y3zqotli21";
const userTestId = process.env.NEXT_PUBLIC_USER_ID;

export default async function Overview() {
  const response = await fetchInviteResponsesData(userTestId!);

  response.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const title = response.map((res) => res.invite?.title)[0];
  const capitalizeTitle = title?.split(" ").map(capitalize).join(" ");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      <h1>Overview Responses</h1>
      <h2>{capitalizeTitle}</h2>

      <ul
        className={styles.responseListWrapper}
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: "1rem",
        }}
      >
        {response.map((res) => (
          <li
            className={styles.responseListItem}
            key={res.createdAt.toString()}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <p>Data raspunsului:</p>
                <p>{res.createdAt.toLocaleString()}</p>
              </div>
              {res.response.map((r, i) => (
                <div key={i}>
                  <p>Invitat</p>
                  <p>{(r as any).guest}</p>
                  <div>
                    <p>Nr. persoane: {(r as any).persons.length}</p>
                  </div>
                </div>
              ))}
            </div>

            <span className={styles.line}></span>

            <div className={styles.personsDataWrapper}>
              <h2>Raspuns</h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "1rem",
                  padding: "1rem",
                  width: "100%",
                }}
              >
                {res.response.map((r, i) =>
                  (r as any).persons.map((resp: any, i: number) => (
                    <div
                      key={i}
                      style={{
                        border: "1px 1px 1px 0",
                        padding: ".5rem",
                        borderRadius: "5px",
                        width: "100%",
                        maxWidth: "500px",
                        borderTop: "1px solid silver",
                      }}
                    >
                      <p>Nume: {resp.guest}</p>
                      <p>Tip meniu: {resp.menu}</p>
                      <p>Telefon: {resp.phone}</p>
                      <p>Mesaj: {resp.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 * DO NOT PUSH INTO PRODUCTION
 */
