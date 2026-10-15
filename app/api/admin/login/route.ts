import { headers } from "next/headers";
import { env } from "cloudflare:workers";
import { ADMIN_SESSION_COOKIE, createAdminSessionValue, isConfiguredAdminUser, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const requestHeaders = await headers();
  if (!isConfiguredAdminUser(requestHeaders.get("oai-authenticated-user-id"))) {
    return Response.json({ error: "관리자 로그인이 필요합니다." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  const origin = requestHeaders.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return Response.json({ error: "요청을 확인해 주세요." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  let payload: { password?: unknown };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "요청 내용을 확인해 주세요." }, { status: 400 });
  }

  if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) {
    return Response.json({ error: "관리자 로그인을 설정하지 못했습니다." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  if (!(await verifyAdminPassword(payload.password))) {
    return Response.json({ error: "비밀번호를 다시 확인해 주세요." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const session = await createAdminSessionValue();
  if (!session) return Response.json({ error: "관리자 로그인을 설정하지 못했습니다." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  return Response.json({ success: true }, {
    headers: {
      "Cache-Control": "no-store",
      "Set-Cookie": `${ADMIN_SESSION_COOKIE}=${session}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`,
    },
  });
}
