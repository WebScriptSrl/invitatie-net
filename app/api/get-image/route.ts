import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";

const basePath =
  process.env.NODE_ENV === "production"
    ? process.env.DATA_DIR_INVITATIE_NET
    : process.env.DATA_DIR_INVITATIE_NET_DEV;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const filename = req.nextUrl.searchParams.get("file");

  if (!filename) {
    return new NextResponse("Niciun fiser nu a fost selectat!", {
      status: 400,
    });
  }

  if (!basePath) {
    return new NextResponse(
      "Ups! Serverul a intampinat o problema! Incercati din nou!",
      {
        status: 500,
      }
    );
  }

  const filePath = join(basePath, filename);

  if (!filePath) {
    return new NextResponse("No file path provided", {
      status: 400,
    });
  }

  const fileBuffer = fs.readFileSync(filePath);

  const { size } = fs.statSync(filePath);

  const ext = filePath.split(".").pop();

  if (!fileBuffer) {
    return new NextResponse("File not found", {
      status: 404,
    });
  }

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": `image/${ext}`,
      "Content-Length": size.toString(),
    },
  });
}
