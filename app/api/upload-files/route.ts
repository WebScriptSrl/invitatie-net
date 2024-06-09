import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { revalidatePath } from "next/cache";

const path = process.env.DATA_DIR_INVITATIE_NET_DEV;

export const POST = async (req: NextRequest): Promise<Response> => {
  const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");

  const navigator = req.geo;
  console.log(ip, navigator);

  const formData = await req.formData();

  const keys = formData.keys().next().value;

  const files = formData.getAll(keys) as File[];

  if (files.length === 0) {
    return NextResponse.json(
      { error: "Ups! Ceva nu a mers bine!" },
      { status: 400 }
    );
  }

  if (!path) {
    throw new Error("Ups! Eroare la incarcarea fisierului");
  }

  for (const file of files) {
    const fileExtension = file.name.split(".").pop();
    const fileSize = file.size / 1024 / 1024; // in MB

    if (fileSize > 5) {
      return NextResponse.json(
        {
          message: `Fisierul ${file.name} este prea mare! Marimea maxima este de 5MB`,
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const dirFiles = await fs.promises.readdir(path);

    if (dirFiles.includes(file.name)) {
      return NextResponse.json(
        {
          message: `Un fisier cu numele ${file.name} exista deja!`,
        },
        { status: 400 }
      );
    }

    try {
      const fileUrl = await uploadFile(file.name, buffer, path);
      console.log(fileUrl);
      return NextResponse.json({
        message: "Fisierul a fost incarcat cu succes!",
        fileUrl,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Ups! Ceva nu a mers bine!",
        },
        { status: 500 }
      );
    }
  }

  revalidatePath("/");
  return NextResponse.json({ message: "Succes! Fisier incarcat!" });
};

async function uploadFile(
  name: string,
  buffer: Buffer,
  path: string
): Promise<string> {
  try {
    await fs.promises.writeFile(`${path}/${name}`, buffer);

    return `${path}/${name}`;
  } catch (error) {
    throw new Error(error as string);
  }
}
