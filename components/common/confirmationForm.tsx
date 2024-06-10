"use client";

import { loadFont } from "@/lib/utils";
import styles from "@/styles/modules/components/invites/forms.module.css";

import clsx from "clsx";
import Image from "next/image";
import React, { useState, FormEvent, useEffect, Suspense } from "react";

export default function ConfirmationForm({
  invite,
  options,
}: {
  invite: { [key: string]: any };
  options?: { [key: string]: any };
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: any }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string>("");

  const [userMessage, setUserMessage] = useState<{ [key: string]: any }>({});
  const [selectedMenu, setSelectedMenu] = useState<{ [key: string]: any }>({});

  const [formFields, setFormFields] = useState<{ [key: string]: any }>({});
  const [selectNum, setSelectNum] = useState<string | undefined>("1");

  const confirmationMessage =
    "Formularul a fost trimis cu succes! Vă mulțumim pentru confirmare și vă așteptăm cu drag la eveniment!";

  const notComingMessage =
    "Ne pare rau ca nu puteti ajunge! Vă mulțumim pentru mesajul transmis! Iar dacă se schimbă ceva, nu ezitați să ne contactați!";

  useEffect(() => {
    options?.fields.map((field: any, index: number) => {
      setFormFields((prev: any) => {
        return { ...prev, [field.name]: field };
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const font = loadFont(options?.preferredFont!);

  const inviteCode = invite.map((i: any) => i.handle).join("");

  const invitedId = invite.map((i: any) => i.from).join("");

  const invitedName = invite.map((i: any) => i.to).join("");

  // Work in progress

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const formFields = Object.fromEntries(formData.entries());

      const answer = (key: string) => {
        return Object.keys(formFields).map((field) => {
          if (field.includes(key)) {
            return formFields[field].valueOf();
          }
        });
      };

      const data = {
        confirmation: {
          guest: answer("person1name")
            .map((i: any) => i)
            .join(""),

          persons: Array.from({ length: parseInt(selectNum!) }).map((_, i) => {
            return {
              guest: answer(`person${i + 1}name`)
                .map((i: any) => i)
                .join(""),
              phone: answer(`person${i + 1}phone`)
                .map((i: any) => i)
                .join(""),
              menu: answer(`person${i + 1}menu`)
                .map((i: any) => i)
                .join(""),
              message: answer(`person${i + 1}message`)
                .map((i: any) => i)
                .join(""),
            };
          }),
        },
        numberOfPersons: selectNum,
        inviteCode,
        invitedId,
        invitedName,
      };

      const stringData = JSON.stringify(data);

      const response = await fetch(`${options?.baseApi}/confirmation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: stringData,
      });

      const result = await response.json();

      if (response.status === 201) {
        setSuccessMessage(result.message);
      } else {
        console.error(result);
      }
    } catch (error) {
      console.error(error);
    }

    setIsSubmitting(false);
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);

    setSelectNum(value);

    Array.from({ length: parseInt(value) }).map((_, i) => {
      setSelectedMenu((prev: any) => {
        return { ...prev, [`Person ${i + 1} menu`]: "normal" };
      });
    });
  };

  const handleUserMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  const handleSelectedMenuChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);

    Array.from({ length: parseInt(selectNum!) }).map((_, i) => {
      setSelectedMenu((prev: any) => {
        return { ...prev, [`Person ${i + 1} menu`]: value };
      });
    });
  };

  return (
    <section className={clsx(font?.className, styles.confirmationFormSection)}>
      <h2>Confirmare prezență</h2>

      <span className={styles.lineBreak}></span>

      {isLoading && <div>Loading...</div>}

      {successMessage !== "" && (
        <div
          className={styles.successMessage}
          style={{
            color: options?.fontColor || "black",
            fontSize: "1.2rem",
            padding: "20px",
          }}
        >
          <p>{successMessage}</p>
          <Image
            src={"/champagne-glases.svg"}
            alt="Petrecere"
            width={100}
            height={100}
            style={{
              filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.7))",
            }}
          />
        </div>
      )}

      {successMessage === "" && (
        <form
          onSubmit={onSubmit}
          className={styles.confirmationForm}
          style={{
            backgroundColor: options?.backgroundColor || "white",
            color: options?.fontColor || "black",
          }}
        >
          <h2>{options?.startText}</h2>
          <Image
            src={"/champagne-glases.svg"}
            alt="Petrecere"
            width={100}
            height={100}
            style={{
              filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.7))",
            }}
          />

          <span className={styles.lineBreak}></span>

          {options?.deadline && (
            <p
              style={{
                fontSize: "1.2rem",
              }}
            >
              {options?.deadline.text} <br />
              <span>{options?.deadline.date}</span>
              {options?.timezoneOffset && `GMT${options.timezoneOffset}`}
            </p>
          )}

          <label
            htmlFor="selectNum"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Selectează număr de persoane !
          </label>
          <select
            name="selectNum"
            id="selectNum"
            onChange={handleSelectChange}
            className={styles.selectField}
          >
            <option value="1">O persoană</option>
            <option value="2">Două persoane</option>
            <option value="3">Trei persoane</option>
            <option value="4">Patru persoane</option>
            <option value="5">Cinci persoane</option>
            <option value="6">Șase persoane</option>
            <option value="7">Șapte persoane</option>
            <option value="8">Opt persoane</option>
            <option value="9">Nouă persoane</option>
            <option value="0">Nu pot să ajung</option>
          </select>

          <span className={styles.lineBreak}></span>

          {/* Multiple forms based on selected num */}
          {Number(selectNum) > 0 ? (
            Array.from({ length: parseInt(selectNum!) }).map((_, i) => (
              <div key={i} className={styles.formFieldsContainer}>
                {
                  <p
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {i !== 0
                      ? `Alege pentru persoana ${i + 1}`
                      : "Alege meniu pentru tine"}
                  </p>
                }
                {Object.keys(formFields).map((field, index) => (
                  <div key={index} className={styles.formField}>
                    <label
                      htmlFor={`person${i + 1}${field}`
                        .toLowerCase()
                        .split(" ")
                        .join("")}
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {formFields[field].label}
                    </label>

                    {formFields[field].type === "select" && (
                      <select
                        name={`Person ${i + 1} ${field}`
                          .toLowerCase()
                          .split(" ")
                          .join("")}
                        id={`person${i + 1}${field}`
                          .toLowerCase()
                          .split(" ")
                          .join("")}
                        onChange={handleSelectedMenuChange}
                        required={formFields[field].required}
                        className={styles.selectField}
                      >
                        {formFields[field].options.map(
                          (option: any, index: number) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          )
                        )}
                      </select>
                    )}

                    {formFields[field].type! !== "select" &&
                      formFields[field].type! !== "textarea" && (
                        <input
                          type={formFields[field].type}
                          name={`Person ${i + 1} ${field}`
                            .toLowerCase()
                            .split(" ")
                            .join("")}
                          id={`person${i + 1}${field}`
                            .toLowerCase()
                            .split(" ")
                            .join("")}
                          onChange={handleChange}
                          required={formFields[field].required}
                          className={styles.inputField}
                          placeholder={
                            formFields[field].label.includes("Telefon")
                              ? "Opțional nr. 07xx xxx xxx"
                              : `Completează ${formFields[
                                  field
                                ].label.toLowerCase()} ...`
                          }
                          style={{
                            color: "black",
                            backgroundColor: "rgba(197, 175, 108, 0.3)",
                            borderRadius: "5px",
                            padding: "5px",
                            border: "none",
                            maxWidth: "400px",
                          }}
                        />
                      )}

                    {formFields[field].type === "textarea" && (
                      <textarea
                        name={`Person ${i + 1} ${field}`
                          .toLowerCase()
                          .split(" ")
                          .join("")}
                        id={`person${i + 1}${field}`
                          .toLowerCase()
                          .split(" ")
                          .join("")}
                        onChange={handleUserMessageChange}
                        required={formFields[field].required}
                        className={clsx(styles.inputField, styles.textarea)}
                        rows={5}
                        style={{
                          resize: "none",
                          width: "100%",
                          backgroundColor: "rgba(197, 175, 108, 0.1)",
                          borderRadius: "5px",
                          padding: "5px",
                          color: "black",
                          fontSize: "0.925rem",
                        }}
                        placeholder="Optional detalii suplimentare..."
                      ></textarea>
                    )}
                  </div>
                ))}
                <span className={styles.lineBreak}></span>
              </div>
            ))
          ) : (
            <div className={styles.formFieldsContainer}>
              <p>Ne pare rau ca nu puteti ajunge!</p>
              <div
                className={styles.formField}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <label htmlFor="person1name">Nume</label>
                <input
                  type="text"
                  name="person1name"
                  id="person1name"
                  onChange={handleChange}
                  required={true}
                  className={styles.inputField}
                  placeholder="Completează nume ..."
                  style={{
                    color: "black",
                    backgroundColor: "rgba(197, 175, 108, 0.3)",
                    borderRadius: "5px",
                    padding: "5px",
                    border: "none",
                    maxWidth: "400px",
                  }}
                />
                <label htmlFor="person1message">Mesajul tau...</label>
                <textarea
                  name="person1message"
                  id="person1message"
                  onChange={handleUserMessageChange}
                  rows={5}
                  className={clsx(styles.inputField, styles.textarea)}
                  style={{
                    resize: "none",
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "rgba(197, 175, 108, 0.1)",
                    borderRadius: "5px",
                    padding: "5px",
                    color: "black",
                    fontSize: "0.925rem",
                  }}
                  required
                  placeholder="Lasă un mesaj pentru noi..."
                ></textarea>
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
            style={{}}
          >
            {isSubmitting ? "Se trimite..." : "Trimite"}
          </button>
        </form>
      )}
    </section>
  );
}
