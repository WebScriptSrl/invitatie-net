import ComingSoon from "@/components/main/comingSoon";

export default function Invites() {
  return (
    <>
      <ComingSoon
        title="Invitații"
        message="Invitațiile noastre online vor fi disponibile in curand!"
        options={{
          promo: "50% reducere",
          additionalMessage: "Dar raspundem solicitarilor dvs intre timp!",
          extraDetails:
            "În plus vă oferim o reducere de 50% la modelul Poetry disponibil! 🎉 Detalii pe Whatsapp!",

          buttonText: "Demo model disponibil",
          buttonHref: "/invitatii/nunta/poetry",
        }}
      />
    </>
  );
}
