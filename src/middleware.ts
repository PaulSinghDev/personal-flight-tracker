import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const [AUTH_USERS, AUTH_PASS] = (process.env.ACCESS_AUTH || ":").split(":");

const isAuthenticated = (req: NextRequest) => {
  const authheader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authheader) {
    return false;
  }

  const auth = Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const user = auth[0];
  const pass = auth[1];

  if (AUTH_USERS.includes(user) && pass == AUTH_PASS) {
    return true;
  } else {
    return false;
  }
};

export function middleware(req: NextRequest) {
  console.log("middle");
  if (!isAuthenticated(req)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }

  return NextResponse.next();
}
