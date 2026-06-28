# AI 유지보수 가이드

이 프로젝트는 자신있나 병원향 이용 가이드 사이트입니다. AI가 수정할 때는 코드보다 콘텐츠 구조를 먼저 확인하세요.

## 핵심 구조

- `docs/`: 공개되는 가이드 문서입니다. 카테고리별 폴더로 나뉘며 Markdown frontmatter를 사용합니다.
- `src/data/site.json`: 사이트 이름, URL, 로고, 푸터 같은 전역 설정입니다.
- `src/data/home.json`: 홈 화면의 안내 문구와 주요 카테고리입니다.
- `src/css/custom.css`: 공개 사이트의 디자인 토큰과 레이아웃입니다.
- `static/admin/config.yml`: 직원용 CMS 카테고리 메뉴와 입력 필드입니다.
- `static/admin/cms.css`: CMS 화면 보정 스타일입니다.
- `static/admin/index.html`: Decap CMS 관리자 화면입니다.

## 문서 frontmatter

문서는 아래 필드를 기준으로 관리합니다.

```yaml
---
title: 문서 제목
description: 문서 요약
sidebar_position: 1
draft: false
owner: 담당 부서
reviewed_at: 2026-06-26
review_due_at: 2026-12-26
---
```

## 수정 원칙

- 의료적 판단, 진료 안내, 비용 안내는 병원 내부 검토가 필요한 문구로 취급합니다.
- 환자 개인정보나 식별 가능한 사례는 문서에 넣지 않습니다.
- 직원이 CMS에서 수정해야 하는 값은 가능하면 `docs/`, `src/data/site.json`, `src/data/home.json`, `static/admin/config.yml` 안에 둡니다.
- 공개 사이트는 검색 중심 문서 포털처럼 차분하고 읽기 쉬워야 합니다. 과한 장식, 큰 그림자, 불필요한 애니메이션은 피합니다.

## 배포 모델

운영 배포는 Cloudflare Pages를 기준으로 합니다.

1. `pnpm run build`로 정적 파일을 생성합니다.
2. `pnpm dlx wrangler pages deploy build --project-name jasinitna-partner-guide --branch main`으로 배포합니다.
3. 운영 URL은 `https://jasinitna-partner-guide.pages.dev`입니다.
4. CMS는 GitHub 저장소 `confidencelab19-max/jasinitna`를 사용합니다.

## CMS 로그인

- 관리자 주소는 `https://jasinitna-partner-guide.pages.dev/admin/`입니다.
- GitHub OAuth App의 callback URL은 `https://jasinitna-partner-guide.pages.dev/api/callback`이어야 합니다.
- Cloudflare Pages 환경변수 `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`이 있어야 로그인이 완료됩니다.
- `ADMIN_USER`, `ADMIN_PASS`를 추가하면 CMS 진입 전에 Basic Auth를 한 번 더 요구합니다.
