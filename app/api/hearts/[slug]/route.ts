import { cookies } from "next/headers";

import { getHeartState, setHeart } from "@/lib/hearts";
import { getPost } from "@/lib/posts";

type Context = {
  params: Promise<{ slug: string }>;
};

const VISITOR_COOKIE = "seoneui_heart_visitor";

async function visitorId() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(VISITOR_COOKIE)?.value;
  if (existing) return existing;

  const created = crypto.randomUUID();
  cookieStore.set(VISITOR_COOKIE, created, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return created;
}

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  if (!getPost(slug)) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  const state = await getHeartState(slug, await visitorId());
  return Response.json(state);
}

export async function POST(request: Request, { params }: Context) {
  const { slug } = await params;
  if (!getPost(slug)) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as
    | { liked?: unknown }
    | null;

  if (typeof body?.liked !== "boolean") {
    return Response.json({ error: "liked must be boolean" }, { status: 400 });
  }

  const state = await setHeart(slug, await visitorId(), body.liked);
  return Response.json(state);
}
