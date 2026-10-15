import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";
import { hasAdminSession, isConfiguredAdminUser } from "@/lib/admin-auth";
import AdminPasswordForm from "./admin-password-form";
import AdminInbox from "./admin-inbox";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getChatGPTUser();
  const isAdmin = isConfiguredAdminUser(user?.userId);
  const hasSession = isAdmin ? await hasAdminSession() : false;
  return (
    <main className="admin-shell">
      <header className="admin-topbar"><Link className="admin-back" href="/"><ArrowLeft size={16} /> 상담 페이지</Link><span className="admin-lock"><LockKeyhole size={15} /> 관리자 전용</span></header>
      {!user ? <section className="admin-login"><div className="admin-login-icon"><LockKeyhole size={23} /></div><p className="eyebrow">PRIVATE INBOX</p><h1>관리자 로그인이 필요합니다.</h1><p>사이트를 만든 관리자 계정으로 로그인해 주세요.</p><a className="button button-primary" href={chatGPTSignInPath("/admin")} target="_top">ChatGPT로 로그인 <ArrowLeft className="login-arrow" size={16} /></a></section> : !isAdmin ? <section className="admin-login"><div className="admin-login-icon"><LockKeyhole size={23} /></div><p className="eyebrow">PRIVATE INBOX</p><h1>관리자 계정이 아닙니다.</h1><p>사이트 관리자 계정으로 다시 로그인해 주세요.</p></section> : !hasSession ? <AdminPasswordForm /> : <AdminInbox email={user.email} />}
    </main>
  );
}
