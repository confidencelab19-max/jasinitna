# 자신있나 병원향 이용 가이드

자신있나 병원 담당자가 기능 업데이트, 운영, 이벤트, 전후사진, 광고, 결제, 예약, 채팅상담 문서를 확인하고 수정할 수 있는 문서 포털입니다.

## 구조

- `docs/`: 카테고리별 가이드 문서
- `src/data/site.json`: 브랜드명, URL, 로고, 푸터 설정
- `src/data/home.json`: 홈 검색 영역과 전체 카테고리 목록
- `src/css/custom.css`: 공개 사이트 디자인
- `static/admin/config.yml`: 직원용 CMS 메뉴와 입력 필드
- `static/admin/cms.css`: CMS 화면 보정 스타일
- `AI_MAINTENANCE.md`: AI 수정 기준

## 로컬 실행

```bash
pnpm install
pnpm run dev
```

CMS를 로컬에서 테스트하려면 별도 터미널에서 다음을 실행합니다.

```bash
pnpm run cms:local
```

사이트는 `http://localhost:3000`, CMS는 `http://localhost:3000/admin/`에서 확인합니다.

## Cloudflare Pages 배포

현재 배포 대상은 Cloudflare Pages입니다.

1. `pnpm install`
2. `pnpm run build`
3. `pnpm dlx wrangler pages deploy build --project-name jasinitna-partner-guide --branch main`

운영 URL은 `https://jasinitna-partner-guide.pages.dev`입니다.

## CMS 운영

직원용 CMS 주소는 `https://jasinitna-partner-guide.pages.dev/admin/`입니다. 공개 사이트 안에는 관리자 링크를 노출하지 않습니다.

CMS는 GitHub 저장소 `confidencelab19-max/jasinitna`에 저장된 문서를 수정합니다. Cloudflare Pages에서 GitHub 로그인을 완료하려면 GitHub OAuth App을 만들고 아래 값을 Cloudflare Pages 환경변수로 등록해야 합니다.

- Homepage URL: `https://jasinitna-partner-guide.pages.dev`
- Authorization callback URL: `https://jasinitna-partner-guide.pages.dev/api/callback`
- Cloudflare Pages secret: `GITHUB_CLIENT_ID`
- Cloudflare Pages secret: `GITHUB_CLIENT_SECRET`

```bash
pnpm dlx wrangler pages secret put GITHUB_CLIENT_ID --project-name jasinitna-partner-guide
pnpm dlx wrangler pages secret put GITHUB_CLIENT_SECRET --project-name jasinitna-partner-guide
```

## 보안

- `functions/_middleware.js`에서 Cloudflare 국가 판별값이 `KR`이 아닌 요청을 차단합니다.
- `/admin/`은 검색 색인과 캐시를 막고, GitHub OAuth로 문서 수정 권한을 확인합니다.
- 추가로 `ADMIN_USER`, `ADMIN_PASS`를 설정하면 `/admin/` 진입 전에 Basic Auth를 한 번 더 요구합니다.
- 모든 응답에 기본 보안 헤더를 적용합니다.
- `/admin/`은 `noindex`, `no-store`로 설정합니다.
