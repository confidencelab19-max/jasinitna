---
title: "상담 상태 관리 기준"
description: "상담 상태는 담당자가 지금 무엇을 처리해야 하는지 알려주는 운영 기준이에요. 상태를 정확히 남기면 미응답, 중복 연락, 예약 누락을 줄일 수 있어요."
sidebar_position: 3
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 상담 상태 관리 기준

<div className="guide-visual guide-visual--customers">
  <div className="guide-visual__copy">
    <strong>상담 상태 관리 기준 화면에서 이렇게 확인해요</strong>
    <p>상담 상태를 정확히 바꿔 미응답과 중복 연락을 줄여요.</p>
    <ol>
      <li>새 상담을 먼저 열어 이벤트 정보를 확인해요.</li>
      <li>콜백 필요와 상담완료 상태를 구분해요.</li>
      <li>예약으로 이어지면 예약 화면 상태와 맞춰요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="상담 상태 관리 기준 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>새 상담</span>
        <em>먼저</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>콜백 필요</span>
        <em>예정</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>예약연결</span>
        <em>반영</em>
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
    <strong>상담 상태로 미응답과 중복 연락을 막아요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>상태 필터</strong>
      <p>새 상담, 확인중, 콜백 필요, 상담완료, 예약연결을 나눠 봐요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상담 상세</strong>
      <p>환자가 본 이벤트, 문의 내용, 이전 연락 이력을 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>메모 영역</strong>
      <p>안내한 가격, 예약 가능 시간, 다음 연락 시간을 남겨요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>새 상담은 가장 먼저 열어 문의 의도를 확인해요.</li>
<li>담당자가 보는 중이면 확인중으로 바꿔 중복 처리를 막아요.</li>
<li>통화가 안 되면 콜백 필요로 바꾸고 다음 연락 시간을 남겨요.</li>
<li>상담이 끝나면 상담완료로 정리해요.</li>
<li>예약으로 이어지면 예약연결로 표시하고 예약 화면 상태도 확인해요.</li>
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
        <tr><td>새 상담</td><td>아직 병원이 처리하지 않은 문의예요.</td><td>오래 방치되면 상담 전환이 떨어져요.</td></tr>
<tr><td>확인중</td><td>담당자가 내용을 보고 있어요.</td><td>여러 명이 동시에 연락하지 않게 해요.</td></tr>
<tr><td>콜백 필요</td><td>다시 연락해야 해요.</td><td>시간을 남기지 않으면 누락돼요.</td></tr>
<tr><td>상담완료</td><td>상담이 끝났어요.</td><td>예약 여부를 메모하지 않으면 리포트 해석이 어려워요.</td></tr>
<tr><td>예약연결</td><td>예약으로 이어졌어요.</td><td>예약 화면 상태와 다르면 운영 흐름이 끊겨요.</td></tr>
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
        <tr><td>동일 환자가 여러 문의를 남겼어요</td><td>최근 문의를 기준으로 보고 이전 문의는 메모로 정리해요.</td></tr>
<tr><td>담당자가 교대됐어요</td><td>콜백 시간과 안내 조건을 먼저 확인한 뒤 이어서 응대해요.</td></tr>
<tr><td>광고 유입 상담이에요</td><td>랜딩 이벤트의 가격과 상담 안내가 같은지 반드시 확인해요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

상담 상태는 담당자가 지금 무엇을 처리해야 하는지 알려주는 운영 기준이에요. 상태를 정확히 남기면 미응답, 중복 연락, 예약 누락을 줄일 수 있어요.

## 상태별 처리 기준

| 상태 | 의미 | 처리 기준 |
| --- | --- | --- |
| 새 상담 | 아직 병원이 확인하지 않은 문의예요 | 가장 먼저 열어 환자가 본 이벤트를 확인해요 |
| 확인중 | 담당자가 내용을 보고 있어요 | 상담 가능 시간과 담당자를 내부에 공유해요 |
| 콜백 필요 | 환자에게 다시 연락해야 해요 | 재연락 시간과 담당자를 남겨요 |
| 상담완료 | 상담이 끝났어요 | 예약 여부와 다음 안내를 기록해요 |
| 예약연결 | 예약으로 이어졌어요 | 예약 관리 화면의 상태와 맞춰요 |
| 종료 | 추가 연락이 필요 없어요 | 광고성 재연락을 하지 않아요 |

## 상담 후 꼭 남겨요

- 환자가 문의한 이벤트명
- 안내한 가격과 추가 비용 가능성
- 예약 가능 시간 안내 여부
- 콜백이 필요한 시간
- 환자가 요청한 추가 확인 사항
- 민감자료 확인 여부와 처리 기준

## 상태를 비워두면 생기는 문제

담당자가 바뀌었을 때 같은 환자에게 반복 연락할 수 있어요. 상담은 끝났는데 예약 화면에는 반영되지 않을 수도 있어요. 특히 광고 유입 상담은 이벤트 조건을 다르게 안내하면 민원이 생길 수 있어요.
