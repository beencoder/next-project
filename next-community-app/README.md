# 🥘 FoodieHub: 클라우드 기반 레시피 공유 플랫폼

> **Next.js 16와 Supabase를 활용하여 로컬 환경의 한계를 클라우드 아키텍처로 해결한 풀스택 프로젝트입니다.**

## 🔗 Link

- **Live Demo:** [https://foodiehub-rho.vercel.app](https://foodiehub-rho.vercel.app)

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (Cloud Image Hosting)
- **Security:** bcryptjs (Password Hashing), xss (Input Sanitization)
- **Library:** slugify, lucide-react

## 🔥 핵심 구현 사항

- **Full-Stack CRUD:** Next.js Server Actions를 활용한 보안 중심의 레시피 생성/조회/삭제 로직 구축
- **Cloud Architecture:** 데이터(Database)와 이미지(Storage)를 분리 저장하는 효율적인 클라우드 이원화 구조 설계
- **UX-Focused URL:** 한글 제목 입력 시에도 깨지지 않는 안정적인 '랜덤 ID 조합형 슬러그' 시스템 구현
- **Security:** 게시글 삭제 비밀번호의 단방향 암호화 저장 및 서버-클라이언트 이중 유효성 검사 적용

## 📋 핵심 트러블슈팅 (Refactoring)

### 1. 서버리스 배포 환경의 데이터 소실 문제 해결

- **문제:** 초기 단계에서 로컬 파일(`better-sqlite3`)에 데이터를 저장했으나, Vercel 서버리스 환경의 특성상 서버 재시작
  시 데이터가 휘발되는 현상 발생.
- **해결:** 데이터베이스를 클라우드 기반인 **Supabase**로 전면 이관하고, 동기적 쿼리 로직을 `async/await` 비동기 패턴으
  로 전면 리팩토링하여 데이터 영속성 확보.

### 2. 고아 파일(Orphan File) 방지를 위한 데이터 무결성 확보

- **문제:** DB 데이터 삭제 시 Supabase Storage에 업로드된 이미지가 그대로 남아 스토리지 용량을 불필요하게 점유하는 문제.
- **해결:** 이미지 URL에서 객체 경로(Object Path)를 추출하는 정규식 로직을 구현하여, 게시글 삭제 시 스토리지 파일까지 동
  시 제거하는 클린업 로직 작성.

### 3. 유효성 검사 실패 시 사용자 입력 값 보존 (UX)

- **문제:** 유효성 검사 실패로 페이지 리렌더링 시 사용자가 정성껏 작성한 폼 데이터와 비밀번호가 초기화되는 피로도 발생.
- **해결:** `useActionState`와 `defaultValue`를 활용하여 서버로부터 전달받은 이전 입력값(`state.values`)을 폼에 재바인딩
  하여 사용자 입력 경험 개선.

### 4. 한글 제목 슬러그의 가독성 및 안정성 개선

- **문제:** 한글 제목 사용 시 URL 인코딩으로 인해 주소가 지나치게 길어지거나 특수문자 처리가 불분명해지는 이슈.
- **해결:** `slugify`로 베이스를 잡고 5자리의 **Short ID**를 결합하여 중복을 방지하고, 어떤 브라우저에서도 깨지지 않는
  주소 체계 구축.

## 📂 Project Structure

```text
src/
├── app/             # App Router 기반 페이지 및 레이아웃
├── components/      # UI 및 기능별 공통 컴포넌트
├── lib/             # API 호출 및 데이터베이스 로직 (Supabase, Actions)
└── public/          # 정적 에셋 (이미지 등)
```
