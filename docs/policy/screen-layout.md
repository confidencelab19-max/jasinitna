---
title: "파트너 가이드 화면 구조"
description: "자신있나 파트너 가이드는 병원 담당자가 같은 구조로 문서를 읽을 수 있도록 레이아웃을 통일해요."
sidebar_position: 8
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 파트너 가이드 화면 구조

<div className="guide-visual guide-visual--policy">
  <div className="guide-visual__copy">
    <strong>파트너 가이드 화면 구조 화면에서 이렇게 확인해요</strong>
    <p>가이드 화면은 왼쪽 목록과 가운데 본문, 상단 진행 상태로 통일해요.</p>
    <ol>
      <li>왼쪽 사이드 패널에서 문서를 선택해요.</li>
      <li>가운데 본문에서 화면 설명과 운영 기준을 읽어요.</li>
      <li>필수 문서를 끝까지 보면 상단 진행 상태가 자동으로 바뀌어요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="파트너 가이드 화면 구조 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>Header</span>
        <em>좌측 로고</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>Side Panel</span>
        <em>문서 목록</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>Center Body</span>
        <em>본문</em>
      </div>
      <div className="visual-screen__table">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</div>

<div className="guide-playbook">
  <div className="guide-playbook__head">
    <strong>Header부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>Header 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>Side Panel 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>Center Body 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>왼쪽 사이드 패널에서 문서를 선택해요.</li>
<li>가운데 본문에서 화면 설명과 운영 기준을 읽어요.</li>
<li>필수 문서를 끝까지 보면 상단 진행 상태가 자동으로 바뀌어요.</li>
<li>화면에서 바꾼 내용이 실제 병원 운영 정보와 맞는지 확인해요.</li>
<li>상담, 예약, 광고, 정산 중 연결된 업무가 있으면 함께 확인해요.</li>
<li>처리 후 다음 담당자가 이어서 볼 수 있게 상태와 메모를 남겨요.</li>
      </ol>
    </div>
    <div className="guide-playbook__panel guide-playbook__panel--dark">
      <h2>담당자 인수인계 기준</h2>
      <p>다음 담당자가 이어서 처리할 수 있게 상태, 시간, 안내한 조건, 다음 행동을 남겨요. 화면 저장과 내부 공유가 다르면 예약·상담 누락이 생길 수 있어요.</p>
    </div>
  </div>
  <div className="guide-playbook__table">
    <h2>입력값과 자주 나는 실수</h2>
    <table>
      <thead>
        <tr><th>화면 항목</th><th>확인 기준</th><th>실수하면 생기는 문제</th></tr>
      </thead>
      <tbody>
        <tr><td>Header</td><td>Header 항목은 담당자가 같은 기준으로 이해할 수 있게 명칭과 위치를 확인해요.</td><td>용어와 화면 위치가 불명확하면 직원 교육과 문서 수정이 반복될 수 있어요.</td></tr>
<tr><td>Side Panel</td><td>Side Panel 항목은 담당자가 같은 기준으로 이해할 수 있게 명칭과 위치를 확인해요.</td><td>용어와 화면 위치가 불명확하면 직원 교육과 문서 수정이 반복될 수 있어요.</td></tr>
<tr><td>Center Body</td><td>Center Body 항목은 담당자가 같은 기준으로 이해할 수 있게 명칭과 위치를 확인해요.</td><td>용어와 화면 위치가 불명확하면 직원 교육과 문서 수정이 반복될 수 있어요.</td></tr>
<tr><td>담당자 메모</td><td>변경 사유, 안내한 조건, 다음 행동을 한 줄로 남겨요.</td><td>메모가 없으면 담당자가 바뀔 때 같은 환자나 같은 광고를 다시 확인해야 해요.</td></tr>
      </tbody>
    </table>
  </div>
  <div className="guide-playbook__table">
    <h2>문제가 생겼을 때</h2>
    <table>
      <thead>
        <tr><th>상황</th><th>처리 방법</th></tr>
      </thead>
      <tbody>
        <tr><td>등록해도 되는 표현인지 애매해요</td><td>효과 보장, 비교 우위, 환자 경험담, 과도한 혜택 표현을 먼저 제외해요.</td></tr>
<tr><td>환자 유인으로 보일 수 있어요</td><td>혜택 약속, 후기 대가, 외부 연락 유도처럼 오해될 행동은 하지 않아요.</td></tr>
<tr><td>같은 문제가 반복돼요</td><td>문구, 이미지, 상담 스크립트, 담당자 권한 중 어느 기준이 어긋났는지 함께 점검해요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

자신있나 파트너 가이드는 병원 담당자가 같은 구조로 문서를 읽을 수 있도록 레이아웃을 통일해요.

## 기본 레이아웃

| 영역 | 배치 기준 |
| --- | --- |
| Header / Top | 로고는 왼쪽에 배치해요 |
| Body | 왼쪽에는 사이드 패널, 가운데에는 본문을 배치해요 |
| Side Panel | 카테고리와 문서 목록을 보여줘요 |
| Center Body | 선택한 문서의 가이드와 화면 설명을 보여줘요 |
| Onboarding Tracker | 온보딩 중에는 상단 고정 영역에서 진행 상태를 보여줘요 |

## 읽는 순서

1. 왼쪽 사이드 패널에서 업무 카테고리를 선택해요.
2. 가운데 본문에서 화면 설명과 단계별 가이드를 확인해요.
3. 문서를 끝까지 확인하면 온보딩 트래커가 자동으로 완료 상태를 저장해요.
4. 다음 필수 문서로 이동해 같은 방식으로 확인해요.

## 병원이 알 수 있는 것

이 구조는 병원이 어떤 문서를 읽어야 하는지, 어떤 화면에서 무엇을 눌러야 하는지 쉽게 파악하도록 돕는 안내 구조예요. 화면 사용법과 문서 읽는 순서만 안내해요.
