import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (!path) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "No path provided",
    });
  }

  revalidatePath(path);
  return Response.json({
    revalidated: true,
    now: Date.now(),
  });
}
