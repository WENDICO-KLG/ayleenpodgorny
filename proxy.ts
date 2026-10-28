import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

const challenge = 'Basic realm="Ayleen Podgorny", charset="UTF-8"';

function unauthorized() {
  return new Response("Authentifizierung erforderlich.", {
    status: 401,
    headers: {
      "WWW-Authenticate": challenge,
      "Cache-Control": "no-store",
    },
  });
}

function matchesSecret(candidate: string, expected: string) {
  const candidateBytes = Buffer.from(candidate);
  const expectedBytes = Buffer.from(expected);
  return candidateBytes.length === expectedBytes.length && timingSafeEqual(candidateBytes, expectedBytes);
}

export function proxy(request: NextRequest) {
  const username = process.env.SITE_USERNAME;
  const password = process.env.SITE_PASSWORD;

  if (!username || !password) {
    return new Response("Site-Zugangsdaten sind nicht konfiguriert.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const authorization = request.headers.get("authorization")?.split(" ", 2);
  if (authorization?.[0]?.toLowerCase() !== "basic" || !authorization[1]) {
    return unauthorized();
  }

  let credentials: string;
  try {
    credentials = Buffer.from(authorization[1], "base64").toString("utf8");
  } catch {
    return unauthorized();
  }

  const separator = credentials.indexOf(":");
  if (separator < 0) return unauthorized();

  const suppliedUsername = credentials.slice(0, separator);
  const suppliedPassword = credentials.slice(separator + 1);
  if (!matchesSecret(suppliedUsername, username) || !matchesSecret(suppliedPassword, password)) {
    return unauthorized();
  }

  return NextResponse.next();
}