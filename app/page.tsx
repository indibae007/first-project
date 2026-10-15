import Link from "next/link";
import { ArrowDown, ArrowRight, BarChart3, Building2, Check, CircleHelp, FileSearch, Radar, ShieldCheck } from "lucide-react";
import LeadForm from "./lead-form";
import ThemeToggle from "./theme-toggle";

const benefits = [
  { icon: FileSearch, title: "기업을 더 입체적으로", text: "재무와 신용, 기본 기업정보를 함께 살펴보고 거래 전 확인에 참고할 정보를 정리합니다." },
  { icon: Radar, title: "변화를 놓치지 않도록", text: "관심 기업의 주요 정보를 주기적으로 확인하는 모니터링 활용을 상담합니다." },
  { icon: BarChart3, title: "필요한 정보에 맞춰", text: "거래처 발굴, 기업 검토, 내부 보고 등 업무 목적에 맞는 이용 방법을 안내합니다." },
];

const steps = [
  { number: "01", title: "문의 남기기", text: "회사와 필요한 상담 내용을 간단히 적어 주세요." },
  { number: "02", title: "상황에 맞춘 안내", text: "담당자가 문의를 확인하고 필요한 정보를 안내합니다." },
  { number: "03", title: "서비스 검토", text: "이용 목적과 범위를 확인한 뒤 도입 여부를 검토합니다." },
];

const plans = [
  { name: "월 80건 제공", monthly: "110,000원", annual: "1,188,000원", equivalent: "월 99,000원", note: "연납 10% 할인" },
  { name: "월 200건 제공", monthly: "220,000원", annual: "2,376,000원", equivalent: "월 198,000원", note: "연납 10% 할인", featured: true },
  { name: "무제한 사용", monthly: "330,000원", annual: "3,564,000원", equivalent: "월 297,000원", note: "연납 10% 할인" },
];

export default function Home() {
  return (
    <main className="site-shell" data-theme="classic">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="크레탑 상담 가이드 홈"><img className="brand-logo" src="/cretop-ci.png" alt="CRETOP" /><span className="brand-caption">상담 가이드</span></a>
        <nav className="main-nav" aria-label="주요 메뉴"><a href="#value">서비스 안내</a><a href="#pricing">사용료 안내</a><a href="#process">상담 절차</a><a href="#faq">자주 묻는 질문</a></nav>
        <div className="header-actions"><ThemeToggle /><a className="header-cta" href="#inquiry">상담 문의 <ArrowRight size={16} /></a></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />기업정보를 바탕으로 더 나은 판단을</p>
          <a className="hero-rank" href="https://cretop.com/lib/introduction/cretop.html" target="_blank" rel="noreferrer"><b>대한민국 1등</b><span>기업정보 플랫폼</span><ArrowRight size={13} /></a>
          <h1>거래처를 살필 때,<br /><em>정보의 차이</em>가<br />판단의 차이가 됩니다.</h1>
          <p className="hero-description">기업정보 서비스 크레탑을 업무에 어떻게 활용할 수 있을지 상담해 드립니다. 필요한 정보와 활용 목적을 알려 주세요.</p>
          <div className="hero-data-point"><span className="hero-data-mark"><Building2 size={17} /></span><p><strong>기업정보 1,800만 개</strong><small>크레탑 기업정보 데이터</small></p></div>
          <div className="hero-actions"><a className="button button-primary" href="#inquiry">맞춤 상담 신청 <ArrowRight size={17} /></a><a className="text-link" href="#value">크레탑 알아보기 <ArrowDown size={15} /></a></div>
          <div className="trust-note"><ShieldCheck size={17} /><span>문의하신 내용은 상담 목적으로만 확인합니다.</span></div>
        </div>
        <div className="hero-visual" aria-label="기업정보를 살펴보는 화면을 표현한 그래픽">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="visual-card card-main">
            <div className="visual-topline"><span className="visual-icon"><Building2 size={18} /></span><span className="live-pill"><i /> 기업 정보 탐색</span></div>
            <p className="visual-label">BUSINESS INSIGHT</p><h2>기업을 이해하는<br />정보의 연결</h2>
            <div className="visual-chart"><div className="chart-header"><span>정보 흐름</span><span className="chart-dots">···</span></div><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="chart-baseline" /></div>
            <div className="visual-footer"><span><b>01</b> 기업정보</span><span><b>02</b> 신용분석</span><span><b>03</b> 모니터링</span></div>
          </div>
          <div className="floating-note note-top"><span className="note-check"><Check size={13} /></span><span><b>거래 전 확인</b><small>기업정보를 한눈에</small></span></div>
          <div className="floating-note note-bottom"><span className="note-spark">↗</span><span><b>목적에 맞는 활용</b><small>상담으로 확인해 보세요</small></span></div>
          <span className="visual-caption">Data-informed business decisions</span>
        </div>
        <a className="scroll-hint" href="#value"><span /> SCROLL TO EXPLORE</a>
      </section>

      <section className="section value-section" id="value">
        <div className="section-heading"><div><p className="eyebrow">WHY CRETOP</p><h2>기업을 아는 일이<br />비즈니스의 시작입니다.</h2></div><p className="section-intro">새 거래처를 검토할 때도, 기존 거래처의 변화를 살필 때도<br className="desktop-break" /> 필요한 것은 상황에 맞는 기업정보입니다.</p></div>
        <div className="benefit-grid">{benefits.map(({ icon: Icon, title, text }, index) => <article className="benefit-card" key={title}><div className="benefit-number">0{index + 1}</div><div className="benefit-icon"><Icon size={22} strokeWidth={1.7} /></div><h3>{title}</h3><p>{text}</p><span className="card-rule" /></article>)}</div>
        <p className="source-note">크레탑의 제공 정보와 기능은 상품 구성 및 이용 조건에 따라 다를 수 있습니다. 자세한 범위는 상담을 통해 확인해 주세요.</p>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="section-heading"><div><p className="eyebrow">CRETOP PRICING</p><h2>이용 건수에 맞춰<br />요금제를 선택하세요.</h2></div><p className="section-intro">첨부해 주신 크레탑 사용료 안내 기준입니다.<br className="desktop-break" /> 모든 금액은 부가세 포함이며, 연납은 10% 할인 금액입니다.</p></div>
        <div className="plan-grid">{plans.map((plan) => <article className={`plan-card${plan.featured ? " plan-featured" : ""}`} key={plan.name}>
          {plan.featured && <span className="plan-badge">많이 선택하는 요금제</span>}
          <h3>{plan.name}</h3>
          <div className="plan-price-row"><span>월납</span><b>{plan.monthly}</b></div>
          <div className="plan-price-row plan-annual"><span>연납</span><div><b>{plan.annual}</b><small>{plan.equivalent} · {plan.note}</small></div></div>
          <a href="#inquiry" className="plan-cta">이 요금제 상담하기 <ArrowRight size={15} /></a>
        </article>)}</div>
        <p className="pricing-note">요금과 제공 건수는 첨부된 사용료 안내 자료 기준입니다. 최신 상품 구성과 실제 이용 조건은 상담 시 확인해 주세요.</p>
      </section>

      <section className="quote-band"><div className="quote-mark">“</div><div><p>중요한 거래를 앞두고 있다면,<br className="mobile-break" /> 먼저 기업을 살펴보세요.</p><span>기업정보를 활용한 더 나은 업무 판단, 크레탑 상담으로 시작하세요.</span></div><a href="#inquiry" aria-label="상담 신청으로 이동"><ArrowRight size={21} /></a></section>

      <section className="section process-section" id="process"><div className="section-heading process-heading"><div><p className="eyebrow">HOW IT WORKS</p><h2>상담은 간단하게,<br />안내는 필요한 만큼.</h2></div><p className="section-intro">문의 내용을 먼저 확인한 뒤 업무 환경과<br className="desktop-break" /> 관심 있는 정보를 중심으로 안내합니다.</p></div><div className="process-list">{steps.map((step) => <article className="process-item" key={step.number}><span className="process-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><ArrowRight className="process-arrow" size={18} /></article>)}</div></section>

      <section className="inquiry-section" id="inquiry">
        <div className="inquiry-inner">
          <div className="inquiry-copy">
            <p className="eyebrow">LET’S TALK</p>
            <h2>우리 회사에 맞는<br /><em>크레탑 활용법</em>을<br />알아보세요.</h2>
            <p className="inquiry-description">상담에 필요한 정보만 남겨 주시면 확인 후 연락드리겠습니다.</p>
            <div className="inquiry-assurance"><span><ShieldCheck size={18} /></span><p><b>개인정보는 상담을 위해서만 사용합니다.</b><small>문의 접수 후 상담 안내를 위해 연락드립니다.</small></p></div>
            <div className="contact-placeholder">
              <span>직접 상담 문의</span>
              <div className="contact-details">
                <a href="tel:0532518835"><span>전화</span><b>053-251-8835</b></a>
                <a href="mailto:indibae@kodata.co.kr"><span>이메일</span><b>indibae@kodata.co.kr</b></a>
              </div>
            </div>
          </div>
          <div className="form-panel"><div className="form-heading"><div><span className="form-kicker">CONSULTATION</span><h3>상담 문의 남기기</h3></div><span className="required-note">* 필수 입력 항목</span></div><LeadForm /></div>
        </div>
      </section>

      <section className="faq-section section" id="faq"><div className="faq-title"><p className="eyebrow">GOOD TO KNOW</p><h2>자주 묻는 질문</h2><p>상담 전에 궁금한 점을 확인해 보세요.</p></div><div className="faq-list"><details><summary><span><CircleHelp size={18} /> 크레탑은 어떤 서비스인가요?</span><b>+</b></summary><p>한국평가데이터가 제공하는 기업정보 서비스입니다. 기업정보와 분석, 모니터링 등 제공 항목은 상품에 따라 다를 수 있습니다.</p></details><details><summary><span><CircleHelp size={18} /> 문의하면 바로 가입해야 하나요?</span><b>+</b></summary><p>아닙니다. 상담 신청은 서비스 안내를 받기 위한 문의이며, 상담 후 도입 여부를 검토하실 수 있습니다.</p></details><details><summary><span><CircleHelp size={18} /> 어떤 내용을 문의할 수 있나요?</span><b>+</b></summary><p>기업정보 조회, 신용 모니터링, 거래처 발굴, 이용 방법 등 궁금하신 내용을 남겨 주세요.</p></details></div></section>

      <footer className="site-footer"><a className="brand footer-brand" href="#top" aria-label="크레탑 상담 가이드 홈"><img className="brand-logo" src="/cretop-ci.png" alt="CRETOP" /><span className="brand-caption">상담 가이드</span></a><p>크레탑 서비스 상담 안내 페이지입니다. 서비스의 공식 제공 범위와 이용 조건은 상담 과정에서 확인해 주세요.</p><div className="footer-bottom"><span>© CRETOP Consultation Guide</span><Link href="/admin">관리자</Link><a href="https://cretop.com/lib/introduction/cretop.html" target="_blank" rel="noreferrer">크레탑 공식 소개 <ArrowRight size={12} /></a></div></footer>
    </main>
  );
}
