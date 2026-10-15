"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CircleAlert, LockKeyhole } from "lucide-react";

export default function AdminPasswordForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError(response.status === 401 ? "비밀번호를 다시 확인해 주세요." : "로그인할 수 없습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }
      window.location.reload();
    } catch {
      setError("로그인할 수 없습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-login">
      <div className="admin-login-icon"><LockKeyhole size={23} /></div>
      <p className="eyebrow">PRIVATE INBOX</p>
      <h1>관리자 비밀번호를 입력해 주세요.</h1>
      <p>관리자 계정으로 로그인한 뒤 비밀번호를 확인합니다.</p>
      <form className="admin-password-form" onSubmit={submit}>
        <label htmlFor="admin-password">관리자 비밀번호</label>
        <input id="admin-password" type="password" inputMode="numeric" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <button className="button button-primary" type="submit" disabled={busy}>{busy ? "확인 중…" : <>관리자 로그인 <ArrowRight size={16} /></>}</button>
        {error && <p className="admin-password-error" role="alert"><CircleAlert size={15} />{error}</p>}
      </form>
    </section>
  );
}
