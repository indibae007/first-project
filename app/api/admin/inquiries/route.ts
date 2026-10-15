import { desc, eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { inquiries } from "@/db/schema";
import { ADMIN_SESSION_COOKIE, isAdminSessionValid } from "@/lib/admin-auth";

async function isAdmin() {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("oai-authenticated-user-id");
  const sessionCookies = await cookies();
  return Boolean(userId && env.ADMIN_USER_ID && userId === env.ADMIN_USER_ID && await isAdminSessionValid(sessionCookies.get(ADMIN_SESSION_COOKIE)?.value));
}

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json({ error: "관리자 로그인이 필요합니다." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const rows = await getDb().select().from(inquiries).orderBy(desc(inquiries.createdAt), desc(inquiries.id)).limit(300);
    return Response.json({ inquiries: rows }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "문의 목록을 불러오지 못했습니다." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "관리자 로그인이 필요합니다." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  let payload: { id?: unknown; status?: unknown };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "요청 내용을 확인해 주세요." }, { status: 400 });
  }
  if (!Number.isInteger(payload.id) || Number(payload.id) < 1 || !["신규", "연락완료"].includes(String(payload.status))) {
    return Response.json({ error: "문의 상태를 확인해 주세요." }, { status: 400 });
  }

  try {
    const [updated] = await getDb().update(inquiries).set({ status: String(payload.status) }).where(eq(inquiries.id, Number(payload.id))).returning({ id: inquiries.id });
    if (!updated) return Response.json({ error: "해당 문의를 찾지 못했습니다." }, { status: 404 });
    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "문의 상태를 저장하지 못했습니다." }, { status: 500 });
  }
}
