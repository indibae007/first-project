"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

const topics = ["기업정보 조회", "기업 신용 모니터링", "신규 거래처 발굴", "서비스 이용 상담", "기타"];

export default function LeadForm() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setMessage("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = Object.fromEntries(values.entries());
    payload.consent = values.get("consent") === "on";
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "문의 접수에 실패했습니다.");
      form.reset();
      setSuccess(true);
      setMessage("문의가 접수되었습니다. 확인 후 연락드리겠습니다.");
    } catch (error) {
      setSuccess(false);
      setMessage(error instanceof Error ? error.message : "잠시 후 다시 시도해 주세요.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="form-row"><label>회사명 <i>*</i><input name="company" required maxLength={100} placeholder="회사명을 입력해 주세요" autoComplete="organization" /></label><label>담당자명 <i>*</i><input name="name" required maxLength={60} placeholder="성함을 입력해 주세요" autoComplete="name" /></label></div>
      <div className="form-row"><label>연락처 <i>*</i><input name="phone" type="tel" required maxLength={30} placeholder="010-0000-0000" autoComplete="tel" /></label><label>이메일 <small>선택</small><input name="email" type="email" maxLength={254} placeholder="name@company.com" autoComplete="email" /></label></div>
      <label>상담 분야 <i>*</i><select name="topic" required defaultValue=""><option value="" disabled>상담 분야를 선택해 주세요</option>{topics.map((topic) => <option value={topic} key={topic}>{topic}</option>)}</select></label>
      <label>문의 내용 <small>선택</small><textarea name="message" maxLength={2000} rows={3} placeholder="궁금하신 점이나 필요한 정보를 적어 주세요" /></label>
      <label className="consent-row"><input name="consent" type="checkbox" required /><span><b>[필수]</b> 상담을 위한 개인정보 수집·이용에 동의합니다.<small>수집 항목: 회사명, 담당자명, 연락처, 이메일(선택), 문의 내용 / 이용 목적: 상담 문의 확인 및 답변</small></span></label>
      {message && <p className={`form-feedback ${success ? "is-success" : "is-error"}`} aria-live="polite">{success && <CheckCircle2 size={17} />}{message}</p>}
      <button className="button button-primary submit-button" type="submit" disabled={sending}>{sending ? <>접수 중 <LoaderCircle className="spin" size={17} /></> : <>문의 접수하기 <ArrowRight size={17} /></>}</button>
      <p className="form-footnote">문의 내용은 상담 안내를 위해 확인되며, 불필요한 민감정보는 입력하지 말아 주세요.</p>
    </form>
  );
}
