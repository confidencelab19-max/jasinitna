---
title: "노쇼·방문완료 처리"
description: "예약 이후 상태를 정리해야 리포트와 상담 운영을 올바르게 볼 수 있어요. 환자가 내원했는지, 취소됐는지, 노쇼인지 구분해 주세요."
sidebar_position: 6
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 노쇼·방문완료 처리

<div className="guide-visual guide-visual--appointments">
  <div className="guide-visual__copy">
    <strong>노쇼·방문완료 처리 화면에서 이렇게 확인해요</strong>
    <p>방문완료, 노쇼, 취소 상태를 정리해야 리포트가 실제 운영과 맞아요.</p>
    <ol>
      <li>방문 여부를 확인해요.</li>
      <li>노쇼 또는 취소 여부를 구분해요.</li>
      <li>노쇼는 병원 내부 기준에 따라 기록해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="노쇼·방문완료 처리 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>방문완료</span>
        <em>기록</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>노쇼</span>
        <em>정리</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>취소</span>
        <em>정리</em>
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
    <strong>방문완료부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>방문완료 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>노쇼 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>취소 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>방문 여부를 확인해요.</li>
<li>노쇼 또는 취소 여부를 구분해요.</li>
<li>노쇼는 병원 내부 기준에 따라 기록해요.</li>
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
        <tr><td>방문완료</td><td>방문완료 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
<tr><td>노쇼</td><td>노쇼 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
<tr><td>취소</td><td>취소 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
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

예약 이후 상태를 정리해야 리포트와 상담 운영을 올바르게 볼 수 있어요. 환자가 내원했는지, 취소됐는지, 노쇼인지 구분해 주세요.

## 상태별 기준

| 상태 | 기준 |
| --- | --- |
| 방문완료 | 환자가 병원에 내원해 상담 또는 진료를 받았어요 |
| 노쇼 | 예약 시간에 환자가 오지 않았고 연락도 되지 않아요 |
| 취소 | 환자 또는 병원 사정으로 예약이 취소됐어요 |

## 노쇼가 생기면

노쇼와 관련된 비용이나 위약금은 자신있나 공통 안내처럼 임의로 고지하지 않아요. 병원 내부 기준이 있다면 예약 확정 전에 환자에게 명확히 안내하고, 상태를 정확히 기록해 주세요. 반복 노쇼가 있다면 상담 메모를 참고해 예약 전 확인 연락 기준을 세우는 것이 좋아요.

## 상태 정리가 중요한 이유

상태가 실제와 다르면 광고 리포트에서 상담과 예약 흐름을 잘못 볼 수 있어요. 광고 성과를 판단할 때 예약 요청만 많고 방문완료가 적은지, 상담은 적어도 방문 전환이 높은지 확인할 수 있어요.
