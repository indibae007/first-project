"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Check, CircleAlert, Inbox, RefreshCw } from "lucide-react";

type Inquiry = { id: number; company: string; name: string; phone: string; email: string; topic: string; message: string; status: string; createdAt: string };

export default function AdminInbox({ email }: { email: string }) {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/inquiries", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "문의 목록을 불러오지 못했습니다.");
      setRows(result.inquiries);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "문의 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function markContacted(row: Inquiry) {
    setSaving(row.id);
    setError("");
    try {
      const response = await fetch("/api/admin/inquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: row.id, status: row.status === "신규" ? "연락완료" : "신규" }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "상태를 저장하지 못했습니다.");
      setRows((current) => current.map((item) => item.id === row.id ? { ...item, status: item.status === "신규" ? "연락완료" : "신규" } : item));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "상태를 저장하지 못했습니다.");
    } finally {
      setSaving(null);
    }
  }

  const newCount = rows.filter((row) => row.status === "신규").length;
  return (
    <section className="inbox-page">
      <div className="inbox-heading"><div><p className="eyebrow">CRETOP CONSULTATION</p><h1>문의 관리</h1><p className="inbox-subtitle">상담 신청을 확인하고 진행 상태를 관리합니다.</p></div><button className="refresh-button" onClick={() => void load()} disabled={loading}><RefreshCw size={15} className={loading ? "spin" : ""} /> 새로고침</button></div>
      <div className="inbox-meta"><span><Inbox size={17} /> 전체 문의 <b>{rows.length}</b></span><span className="inbox-meta-dot" /><span>신규 <b className="new-count">{newCount}</b></span><span className="inbox-admin-email">로그인 계정: {email}</span></div>
      {error && <div className="admin-error"><CircleAlert size={17} />{error}</div>}
      {loading ? <div className="inbox-state">문의 목록을 불러오는 중입니다…</div> : rows.length === 0 ? <div className="inbox-empty"><span><Inbox size={23} /></span><h2>아직 접수된 문의가 없습니다.</h2><p>상담 신청이 접수되면 이곳에서 확인할 수 있습니다.</p></div> : <div className="inquiry-list">{rows.map((row) => <article className={`inquiry-card ${row.status === "신규" ? "is-new" : ""}`} key={row.id}><div className="inquiry-card-top"><span className={`status-pill ${row.status === "신규" ? "status-new" : "status-done"}`}>{row.status}</span><time>{formatDate(row.createdAt)}</time><span className="inquiry-topic">{row.topic}</span></div><div className="inquiry-card-body"><div className="inquiry-person"><h2>{row.company}<span>{row.name}</span></h2><div className="contact-lines"><a href={`tel:${row.phone.replace(/[^+\d]/g, "")}`}>{row.phone}<ArrowUpRight size={12} /></a>{row.email && <a href={`mailto:${row.email}`}>{row.email}<ArrowUpRight size={12} /></a>}</div></div>{row.message && <p className="inquiry-message">{row.message}</p>}<button className={`status-toggle ${row.status === "연락완료" ? "done" : ""}`} onClick={() => void markContacted(row)} disabled={saving === row.id}>{row.status === "신규" ? <><Check size={14} /> 연락 완료로 표시</> : <><RefreshCw size={13} /> 신규로 되돌리기</>}</button></div></article>)}</div>}
      <p className="inbox-privacy"><CircleAlert size={14} /> 고객 문의 정보는 상담에 필요한 범위에서만 확인하고 안전하게 관리해 주세요.</p>
    </section>
  );
}

function formatDate(value: string) {
  const date = new Date(`${value.replace(" ", "T")}+09:00`);
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Seoul" }).format(date);
}
