# 크레탑 소개·문의 웹사이트

크레탑 서비스를 소개하고 고객 상담 문의를 접수·관리하는 웹 프로젝트입니다.

## 주요 기능

- 서비스 소개와 상담 신청 페이지
- 관리자 화면에서 문의 목록 확인 및 관리
- 모바일과 데스크톱 화면 지원
- Cloudflare D1 기반 문의 데이터 저장

## 개발 환경

- Node.js 22.13 이상
- React, TypeScript, Vinext/Vite
- Cloudflare Workers, D1, Drizzle ORM

## 로컬 실행

```bash
npm ci
npm run dev
```

빌드와 데이터베이스 마이그레이션 스크립트는 `package.json`에 있습니다. Cloudflare D1을 연결해 운영하려면 별도의 Cloudflare 계정과 환경 설정이 필요합니다.
