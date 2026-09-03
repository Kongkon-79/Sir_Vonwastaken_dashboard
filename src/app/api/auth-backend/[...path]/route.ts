import { NextRequest, NextResponse } from "next/server";

function backendBase() { return (process.env.NEXT_PUBLIC_BACKEND_URL || `${process.env.NEXT_PUBLIC_API_ORIGIN || process.env.VITE_API_ORIGIN || ""}/api`).replace(/\/$/, ""); }
async function forward(request: NextRequest, { params }: { params: { path: string[] } }) {
  const base = backendBase();
  if (!base || base === "/api") return NextResponse.json({ message: "Backend API is not configured." }, { status: 503 });
  const target = `${base}/${params.path.map((part) => encodeURIComponent(part)).join("/")}${request.nextUrl.search}`;
  const headers = new Headers(request.headers); headers.delete("host"); headers.delete("content-length");
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();
  const response = await fetch(target, { method: request.method, headers, body, redirect: "follow", cache: "no-store" });
  return new NextResponse(response.body, { status: response.status, headers: { "content-type": response.headers.get("content-type") || "application/json" } });
}
export const GET = forward; export const POST = forward; export const PUT = forward; export const PATCH = forward; export const DELETE = forward;
