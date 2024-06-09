import prisma from "@/lib/prisma";

export default async function Overview() {
  const data = await prisma.inviteResponse.findMany({
    where: {
      // Testing purposes
      // userId: "clwzfi7ou1002v1y3zqotli21",
      userId: process.env.NEXT_PUBLIC_USER_ID,
    },
    select: {
      response: true,
      invite: {
        select: {
          handle: true,
          title: true,
        },
      },
      createdAt: true,
    },
  });

  // Work in progress

  const sortedPerInvite = data.reduce((acc: any, curr: any) => {
    if (!acc.hasOwnProperty(curr.invite.handle)) {
      acc[curr.invite.handle] = [];
    }
    acc[curr.invite.handle].push(curr);
    return acc;
  }, {});

  const sortedPerInviteArray = Object.entries(sortedPerInvite);

  let invite: string = "";

  for (const [key, value] of sortedPerInviteArray) {
    invite = key;

    (value as any[]).forEach((element: any) => {
      (element.response as any[]).forEach((response: any) => {
        // console.log(response);
      });
    });
  }

  return (
    <div>
      <h1>Overview Responses</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* {sortedPerInviteArray.map(([key, value]) => (
        <div key={key}>
          <h2>{key}</h2>
          {(value as any[]).map((element: any) => (
            <div key={element.createdAt}>
              {element.response.map((response: any) => (
                <div key={response}>{response.guest}</div>
              ))}
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
}
