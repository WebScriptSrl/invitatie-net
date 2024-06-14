import styles from "@/styles/modules/dashboard.module.css";

import { fetchInviteResponsesData } from "@/lib/fetchers";
import { capitalize } from "@/lib/utils";
import { IResponseData } from "@/lib/interfaces";

// Testing purposes
// const userTestId = "clwzfi7ou1002v1y3zqotli21";
const userTestId = process.env.NEXT_PUBLIC_USER_ID;

export default async function Overview() {
  const responseData: IResponseData[] = await fetchInviteResponsesData(
    userTestId!
  );

  responseData.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());

  const title = responseData.map((res) => res.invite?.title)[0];
  const capitalizeTitle = title
    ?.split(" ")
    .map(capitalize)
    .join(" ")
    .replace(" Si ", " & ");

  const guestResponse = responseData.map((res) => res.response);

  const personsResponse = guestResponse.flatMap((res) =>
    res?.map((r) => r.persons)
  );

  const persons = personsResponse.flatMap((res) => res);

  const confirmedPersons = persons.filter(
    (person) => person?.menu !== "Nu pot ajunge!"
  );

  const declinedPersons = persons.filter(
    (person) => person?.menu === "Nu pot ajunge!"
  );

  // console.log(confirmedPersons);

  let personsComing = true;

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
      <h1>Răspunsuri</h1>
      <h2>{capitalizeTitle}</h2>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "2rem",
          border: "1px solid silver",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        <div>
          <p>Total persoane</p>
          <p>{persons.length}</p>
        </div>

        <div>
          <p>Persoane confirmate</p>
          <p>{confirmedPersons.length}</p>
        </div>

        <div>
          <p>Invitatii declinate</p>
          <p>{declinedPersons.length}</p>
        </div>
      </div>

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
        {responseData.map((res) => (
          <li
            className={styles.responseListItem}
            key={res.createdAt!.toString()}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <p>Data răspunsului:</p>
                <p>{res.createdAt!.toLocaleString()}</p>
              </div>
              {res.response?.map((r, i) => (
                <div key={i}>
                  <p>Invitat</p>
                  <p>{r.guest}</p>
                  {r.persons.map((resp, i) => (
                    <div key={i}>
                      {resp.menu === "Nu pot ajunge!"
                        ? ((personsComing = false), (<p>Nr. persoane: 0</p>))
                        : (personsComing = true)}
                    </div>
                  ))}

                  {personsComing ? (
                    <p>Nr. persoane: {r.persons.length}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <span className={styles.line}></span>

            <div className={styles.personsDataWrapper}>
              <h2>Răspuns</h2>
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
                {res.response?.map((r, i) =>
                  r.persons.map((resp, i) => (
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
                      {resp.menu === "Nu pot ajunge!" ? (
                        <div>
                          <p>Invitatul nu poate ajunge!</p>
                          <p>Mesaj: {resp.message}</p>
                        </div>
                      ) : (
                        <div>
                          <p>Nume: {resp.guest}</p>
                          <p>Tip meniu: {resp.menu}</p>
                          <p>Telefon: {resp.phone}</p>
                          <p>Mesaj: {resp.message}</p>
                        </div>
                      )}
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
