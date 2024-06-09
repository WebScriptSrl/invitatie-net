import Poetry from "@/components/invites/poetry";

export default async function InviteModel({
  params,
}: {
  params: { model: string };
}) {
  const model = decodeURIComponent(params.model);
  console.log("model", model);
  return (
    <>
      {model === "poetry" ? (
        <Poetry
          params={{
            model: model,
            components: ["location", "date", "time", "message"],
            images: ["background.jpg", "profile.jpg"],
          }}
          searchParams={new URLSearchParams()}
        />
      ) : (
        <h1>{model}</h1>
      )}
    </>
  );
}
