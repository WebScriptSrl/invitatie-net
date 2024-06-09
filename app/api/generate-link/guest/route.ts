import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { body } = await req.json();
  const { guest, baseInviteUrl } = body;

  if (!guest) {
    return new NextResponse("Un invitat este necesar! Adaugati numele!", {
      status: 400,
    });
  }

  const guestInviteUrl = `${baseInviteUrl}/${guest
    .replace(/\s/g, "-")
    .toLowerCase()}`;

  cookies().set("uniqueLink", baseInviteUrl, { httpOnly: true });

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Set-Cookie", `uniqueLink=${baseInviteUrl}; HttpOnly`);
  return new NextResponse(JSON.stringify({ guestInviteUrl }), {
    headers,
  });
}
