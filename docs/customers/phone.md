---
title: "전화상담 운영 가이드"
description: "전화상담은 환자가 앱에서 상담을 요청하면 병원이 확인 후 연락하는 방식이에요. 콜백 속도가 상담 전환에 큰 영향을 줘요."
sidebar_position: 1
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 전화상담 운영 가이드

<div className="guide-visual guide-visual--customers">
  <div className="guide-visual__copy">
    <strong>전화상담 운영 가이드 화면에서 이렇게 확인해요</strong>
    <p>전화상담 화면은 새 문의와 부재중 콜백을 놓치지 않는 데 집중해요.</p>
    <ol>
      <li>새 전화상담 요청을 먼저 열어요.</li>
      <li>부재중이면 콜백 기준에 따라 재연락해요.</li>
      <li>상담 후 예약 여부와 다음 안내를 기록해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="전화상담 운영 가이드 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>새 전화상담</span>
        <em>먼저</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>콜백 필요</span>
        <em>처리</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>예약 연결</span>
        <em>기록</em>
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
    <strong>새 전화상담부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>새 전화상담 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>콜백 필요 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>예약 연결 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>새 전화상담 요청을 먼저 열어요.</li>
<li>부재중이면 콜백 기준에 따라 재연락해요.</li>
<li>상담 후 예약 여부와 다음 안내를 기록해요.</li>
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
        <tr><td>새 전화상담</td><td>새 전화상담 항목은 응답 여부, 다음 연락 시간, 상담 메모가 남아 있는지 확인해요.</td><td>상담 기록이 비어 있으면 담당자가 바뀔 때 같은 환자에게 다른 안내를 할 수 있어요.</td></tr>
<tr><td>콜백 필요</td><td>콜백 필요 항목은 응답 여부, 다음 연락 시간, 상담 메모가 남아 있는지 확인해요.</td><td>상담 기록이 비어 있으면 담당자가 바뀔 때 같은 환자에게 다른 안내를 할 수 있어요.</td></tr>
<tr><td>예약 연결</td><td>예약 연결 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
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
        <tr><td>상담 답변이 늦어져요</td><td>미응답, 콜백 필요, 첨부 확인 항목을 먼저 보고 담당자에게 다음 연락 시간을 남겨요.</td></tr>
<tr><td>환자에게 서로 다른 안내가 나갔어요</td><td>이벤트 문구, 가격, 예약 가능 시간, 상담 메모를 같은 기준으로 다시 맞춰요.</td></tr>
<tr><td>민감한 자료가 포함됐어요</td><td>상담·예약 목적에 필요한 범위만 확인하고 외부 공유, 임의 저장, 불필요한 재사용은 하지 않아요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

전화상담은 환자가 앱에서 상담을 요청하면 병원이 확인 후 연락하는 방식이에요. 콜백 속도가 상담 전환에 큰 영향을 줘요.

## 처리 흐름

1. 새 상담 요청을 확인해요.
2. 환자가 본 이벤트와 문의 내용을 확인해요.
3. 상담 가능 시간 안에 콜백해요.
4. 부재중이면 병원 내부 기준에 따라 재연락해요.
5. 상담 후 예약 여부와 후속 안내를 기록해요.

## 상담 전 확인할 내용

- 환자가 본 이벤트명
- 이벤트 가격과 옵션
- 추가 비용 가능성
- 예약 가능 시간
- 환자 문의 내용

## 상담 시 주의사항

환자 전화번호는 상담과 예약 목적에 한해 사용해 주세요. 광고 문자 발송이나 외부 마케팅 목적으로 사용할 수 없어요.
