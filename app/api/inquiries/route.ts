import { getDb } from "@/db";
import { inquiries } from "@/db/schema";

const topics = new Set(["기업정보 조회", "기업 신용 모니터링", "신규 거래처 발굴", "서비스 이용 상담", "기타"]);

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "입력 내용을 확인해 주세요." }, { status: 400 });
  }

  const company = typeof payload.company === "string" ? payload.company.trim() : "";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const topic = typeof payload.topic === "string" ? payload.topic.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const consent = payload.consent === true;

  if (!company || company.length > 100 || !name || name.length > 60 || !phone || phone.length > 30) {
    return Response.json({ error: "회사명, 담당자명, 연락처를 확인해 주세요." }, { status: 400 });
  }
  if (email.length > 254 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return Response.json({ error: "이메일 주소를 확인해 주세요." }, { status: 400 });
  }
  if (!topics.has(topic) || message.length > 2000 || !consent) {
    return Response.json({ error: "상담 분야와 개인정보 수집·이용 동의를 확인해 주세요." }, { status: 400 });
  }

  try {
    const [inquiry] = await getDb().insert(inquiries).values({ company, name, phone, email, topic, message }).returning({ id: inquiries.id });
    return Response.json({ id: inquiry.id }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
