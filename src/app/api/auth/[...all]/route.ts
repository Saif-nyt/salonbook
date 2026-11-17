import { NextResponse, type NextRequest } from "next/server";

const BACKEND_URL = (
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  ""
).replace(/\/$/, "");

type AuthRouteContext = { params: Promise<{ all: string[] }> };

async function handleAuthProxy(request: NextRequest, context: AuthRouteContext) {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "The authentication service is not configured" },
      { status: 503 },
    );
  }

  const { all } = await context.params;
  const target = new URL(`/api/auth/${all.join("/")}`, BACKEND_URL);
  target.search = request.nextUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");
  headers.delete("accept-encoding");
  headers.set("x-forwarded-host", request.nextUrl.host);
  headers.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", ""));

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: "manual",
    cache: "no-store",
  });

  const responseHeaders = new Headers(upstream.headers);
  const cookies = upstream.headers.getSetCookie();
  responseHeaders.delete("set-cookie");
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");
  responseHeaders.delete("transfer-encoding");

  const location = responseHeaders.get("location");
  if (location && location.startsWith(BACKEND_URL)) {
    responseHeaders.set(
      "location",
      location.replace(BACKEND_URL, request.nextUrl.origin),
    );
  }

  const response = new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });

  for (const cookie of cookies) {
    response.headers.append("set-cookie", cookie);
  }

  return response;
}

export {
  handleAuthProxy as GET,
  handleAuthProxy as POST,
  handleAuthProxy as PUT,
  handleAuthProxy as PATCH,
  handleAuthProxy as DELETE,
  handleAuthProxy as OPTIONS,
  handleAuthProxy as HEAD,
};
