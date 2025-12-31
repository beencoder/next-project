# 🚀 Next.js Project Collection

이 저장소는 Next.js의 핵심 아키텍처와 풀스택 기능을 단계별로 학습하며 제작한 프로젝트들의 모음입니다.  
단순한 기능 구현을 넘어 **렌더링 최적화, 캐싱 전략, 보안 인증** 등 실제 서비스 운영에 필요한 핵심 기술들을 심도 있게 다루었습니다.

---

### 🍱 프로젝트 목록

#### 1. [FoodieHub 🥘](./next-community-app)
- **주제**: 클라우드 기반 레시피 공유 플랫폼
- **핵심**: SQLite에서 **Supabase(PostgreSQL)** 클라우드 환경으로의 아키텍처 이전 및 리팩토링.
- **기능**: Server Actions를 활용한 풀스택 CRUD, 클라우드 이미지 스토리지 연동, 사용자 게시글 암호화 관리.

#### 2. [KongNews 📰](./next-news-app)
- **주제**: 병렬 라우팅 및 동적 렌더링 기반 뉴스 애플리케이션
- **핵심**: Next.js의 고도화된 라우팅 시스템(**Parallel & Intercepting Routes**) 이해 및 적용.
- **기능**: 데이터 Fetching 시 사용자 경험을 고려한 Loading/Error 상태 처리 및 효율적인 레이아웃 설계.

#### 3. [Posts 📝](./next-posts-app)
- **주제**: 데이터 뮤테이션 및 미디어 핸들링 게시판
- **핵심**: **Next.js 15 & React 19**의 최신 Server Actions와 폼 상태 관리(`useActionState`) 활용.
- **기능**: **Cloudinary API** 연동을 통한 클라우드 미디어 관리 및 게시글 데이터 뮤테이션 로직 구현.

#### 4. [Auth 🔐](./next-user-auth-app)
- **주제**: Lucia Auth를 활용한 세션 기반 인증 시스템
- **핵심**: 외부 인증 라이브러리와 DB 어댑터를 활용한 **세션 기반 보안 인증** 흐름 구축.
- **기능**: 회원가입/로그인 프로세스, 세션 유효성 검증, 쿠키 제어를 통한 안전한 사용자 권한 관리.

#### 5. [Caching ⚡](./next-caching-course)
- **주제**: Next.js 캐싱 메커니즘 심화 학습 및 성능 최적화
- **핵심**: Next.js의 4가지 캐싱 계층(**Request Memoization, Data Cache, Full Route Cache, Router Cache**) 이해.
- **기능**: 불필요한 네트워크 비용을 절감하기 위한 데이터 캐싱 및 상황별 캐시 무효화(Revalidation) 전략 적용.

---

### 🛠 기술적 성장 포인트
- **Architecture**: 로컬 환경(SQLite)의 한계를 인식하고 클라우드 인프라(Supabase, Cloudinary)로 확장하는 아키텍처 설계 역량.
- **Modern Tech**: Next.js 15, React 19 등 최신 프론트엔드 생태계를 선제적으로 도입하고 실무 로직에 적용.
- **Performance**: 복잡한 캐싱 전략을 직접 제어하며 서버 부하를 줄이고 사용자 응답 속도를 개선하는 최적화 고민.