---
title: "예약 변경·취소 처리"
description: "예약 변경과 취소는 환자 불만이 생기기 쉬운 구간이에요. 변경 사유, 대체 시간, 안내 내용을 남겨두면 같은 문의를 반복하지 않아도 돼요."
sidebar_position: 4
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 예약 변경·취소 처리

<div className="guide-visual guide-visual--appointments">
  <div className="guide-visual__copy">
    <strong>예약 변경·취소 처리 화면에서 이렇게 확인해요</strong>
    <p>예약 변경과 취소는 사유, 대체 시간, 안내 내용을 남겨 혼선을 막아요.</p>
    <ol>
      <li>변경 또는 취소 사유를 확인해요.</li>
      <li>환자에게 가능한 대체 시간을 안내해요.</li>
      <li>내부 예약표와 플랫폼 상태를 같이 수정해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="예약 변경·취소 처리 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>변경 사유</span>
        <em>기록</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>대체 시간</span>
        <em>안내</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>상태 수정</span>
        <em>완료</em>
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
    <strong>변경 사유부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>변경 사유 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>대체 시간 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>상태 수정 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>변경 또는 취소 사유를 확인해요.</li>
<li>환자에게 가능한 대체 시간을 안내해요.</li>
<li>내부 예약표와 플랫폼 상태를 같이 수정해요.</li>
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
        <tr><td>변경 사유</td><td>변경 사유 항목은 화면 값과 병원 내부 운영 기준이 일치하는지 확인해요.</td><td>기준이 다르면 상담, 예약, 광고 중 연결된 업무에서 추가 확인이 필요해져요.</td></tr>
<tr><td>대체 시간</td><td>대체 시간 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
<tr><td>상태 수정</td><td>상태 수정 항목은 화면 값과 병원 내부 운영 기준이 일치하는지 확인해요.</td><td>기준이 다르면 상담, 예약, 광고 중 연결된 업무에서 추가 확인이 필요해져요.</td></tr>
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

예약 변경과 취소는 환자 불만이 생기기 쉬운 구간이에요. 변경 사유, 대체 시간, 안내 내용을 남겨두면 같은 문의를 반복하지 않아도 돼요.

## 변경이 필요한 경우

- 병원 내부 예약표와 시간이 겹쳐요.
- 담당 의사 일정이 바뀌었어요.
- 환자가 다른 시간을 요청했어요.
- 상담 후 더 긴 시간이 필요해졌어요.
- 임시 휴진이나 장비 점검이 생겼어요.

## 처리 순서

1. 변경 또는 취소 사유를 확인해요.
2. 환자에게 가능한 대체 시간을 안내해요.
3. 환자가 동의한 시간을 예약 상태에 반영해요.
4. 내부 예약표에도 같은 시간으로 수정해요.
5. 변경 이력을 메모로 남겨요.

## 주의할 점

환자에게 안내한 시간과 플랫폼 예약 시간이 다르면 내원 당일 혼선이 생겨요. 전화로 안내한 내용도 예약 화면에 반영해 주세요.
