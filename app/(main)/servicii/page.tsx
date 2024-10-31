import ComingSoon from "@/components/main/comingSoon";

export default function Services() {
  return (
    <>
      <ComingSoon
        title="Servicii"
        message="Serviciile noastre online vor fi disponibile in curand!"
        options={{
          promo: "50% reducere",
          additionalMessage: "Dar raspundem solicitarilor dvs intre timp!",
          extraDetails:
            "În plus vă oferim o reducere de 50% la invitația disponibilă! 🎉 Detalii pe Whatsapp!",
        }}
      />
    </>
  );
}
