import { NextRequest } from "next/server";

// Change this - Work in progress

export default async function rateLimiter(req: NextRequest) {
  const rateLimitMap = new Map();

  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for") ||
    req.ip;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, 1);
  } else {
    rateLimitMap.set(ip, rateLimitMap.get(ip) + 1);

    if (rateLimitMap.get(ip) > 5) {
      return new Response("Too many requests", { status: 429 });
    }

    rateLimitMap.set(ip, rateLimitMap.get(ip) + 1);
  }

  return req;
}
