---
title: "휴진·임시 마감일 관리"
description: "휴진일과 임시 마감일을 제때 닫지 않으면 환자가 예약할 수 없는 시간에 예약을 요청할 수 있어요. 예약 가능 시간은 병원 일정 변경과 함께 관리해야 해요."
sidebar_position: 5
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 휴진·임시 마감일 관리

<div className="guide-visual guide-visual--appointments">
  <div className="guide-visual__copy">
    <strong>휴진·임시 마감일 관리 화면에서 이렇게 확인해요</strong>
    <p>휴진과 임시 마감 시간은 예약 가능 시간에서 미리 닫아두어야 해요.</p>
    <ol>
      <li>정기 휴무와 공휴일을 확인해요.</li>
      <li>담당 의사 부재와 장비 점검 시간을 닫아요.</li>
      <li>이미 예약된 환자에게 변경 안내를 진행해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="휴진·임시 마감일 관리 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>공휴일</span>
        <em>닫힘</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>장비 점검</span>
        <em>닫힘</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>기존 예약</span>
        <em>안내</em>
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
    <strong>공휴일부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>공휴일 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>장비 점검 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>기존 예약 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>정기 휴무와 공휴일을 확인해요.</li>
<li>담당 의사 부재와 장비 점검 시간을 닫아요.</li>
<li>이미 예약된 환자에게 변경 안내를 진행해요.</li>
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
        <tr><td>공휴일</td><td>공휴일 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
<tr><td>장비 점검</td><td>장비 점검 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
<tr><td>기존 예약</td><td>기존 예약 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
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
        <tr><td>예약 시간이 맞지 않아요</td><td>병원 내부 예약표와 파트너센터 예약 상태를 대조하고 환자에게 확정 시간을 다시 안내해요.</td></tr>
<tr><td>변경이나 취소가 잦아요</td><td>변경 사유, 대체 시간, 확정 여부를 메모로 남기고 상담팀과 공유해요.</td></tr>
<tr><td>방문완료와 노쇼 상태가 헷갈려요</td><td>내원 여부를 병원 내부 기록으로 확인한 뒤 방문완료, 취소, 노쇼 중 하나로 정리해요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

휴진일과 임시 마감일을 제때 닫지 않으면 환자가 예약할 수 없는 시간에 예약을 요청할 수 있어요. 예약 가능 시간은 병원 일정 변경과 함께 관리해야 해요.

## 닫아야 하는 일정

- 정기 휴무일
- 공휴일
- 임시 휴진일
- 병원 내부 교육일
- 담당 의사 부재일
- 수술실 또는 장비 점검 시간
- 예약이 이미 가득 찬 시간대

## 운영 기준

| 상황 | 처리 기준 |
| --- | --- |
| 하루 전체 휴진 | 해당 날짜 예약 가능 시간을 닫아요 |
| 일부 시간만 불가 | 해당 시간대만 닫아요 |
| 이미 예약이 있음 | 환자에게 먼저 변경 안내를 해요 |
| 광고 집행 중 | 랜딩 이벤트와 상담 안내도 같이 확인해요 |

## 확인 주기

최소 주 1회는 다음 2주 예약 가능 시간을 확인해요. 병원 내부 일정표와 자신있나 예약 가능 시간이 다르면 환자 상담과 예약 전환이 흔들릴 수 있어요.
