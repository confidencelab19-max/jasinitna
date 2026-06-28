---
title: "예약 가능 시간 설정"
description: "예약 가능 시간은 환자가 직접 선택하는 기준이에요. 실제 진료와 상담이 가능한 시간만 열어두면 변경 연락과 예약 취소를 줄일 수 있어요."
sidebar_position: 2
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 예약 가능 시간 설정

<div className="guide-visual guide-visual--appointments">
  <div className="guide-visual__copy">
    <strong>예약 가능 시간 설정 화면에서 이렇게 확인해요</strong>
    <p>환자가 선택할 수 있는 시간은 실제 상담과 진료가 가능한 시간만 열어둬요.</p>
    <ol>
      <li>진료시간, 점심시간, 휴무일을 반영해요.</li>
      <li>담당자 부재와 수술실 일정을 확인해요.</li>
      <li>다음 2주 예약 가능 시간을 주기적으로 봐요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="예약 가능 시간 설정 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>진료시간</span>
        <em>열림</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>점심시간</span>
        <em>닫힘</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>임시휴진</span>
        <em>닫힘</em>
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
    <strong>예약 가능 시간을 실제 운영표와 맞춰요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>캘린더</strong>
      <p>요일별 진료시간, 점심시간, 마감 시간을 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>시간 슬롯</strong>
      <p>환자가 선택할 수 있는 시간 간격과 정원을 설정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>휴진 설정</strong>
      <p>공휴일, 임시 휴진, 담당자 부재 시간을 닫아요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>기본 진료시간과 점심시간을 먼저 입력해요.</li>
<li>상담 가능 시간과 수술 가능 시간을 구분해요.</li>
<li>담당 의사 부재일과 장비 점검 시간을 닫아요.</li>
<li>이미 예약이 많은 시간대는 추가 예약을 받지 않게 조정해요.</li>
<li>다음 2주 일정을 매주 확인해요.</li>
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
        <tr><td>요일별 시간</td><td>실제 접수 가능한 시간만 열어요.</td><td>퇴근 직전 시간을 열어두면 변경 연락이 늘어요.</td></tr>
<tr><td>점심시간</td><td>예약 가능 시간에서 제외해요.</td><td>점심시간 예약은 당일 취소로 이어질 수 있어요.</td></tr>
<tr><td>시간 간격</td><td>상담에 필요한 시간을 기준으로 정해요.</td><td>너무 짧으면 대기 시간이 길어져요.</td></tr>
<tr><td>정원</td><td>한 시간대에 처리 가능한 환자 수예요.</td><td>수술 상담과 단순 상담을 같은 정원으로 보면 밀려요.</td></tr>
<tr><td>임시 휴진</td><td>날짜 단위 또는 시간 단위로 닫아요.</td><td>광고 집행 중이면 상담 안내도 같이 확인해요.</td></tr>
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
        <tr><td>특정 시간만 막아야 해요</td><td>전체 휴진으로 닫지 말고 해당 시간대만 닫아요.</td></tr>
<tr><td>이미 예약된 환자가 있어요</td><td>시간을 닫기 전에 환자에게 변경 안내를 먼저 해요.</td></tr>
<tr><td>담당자가 휴가예요</td><td>콜백 가능 시간과 예약 가능 시간을 함께 줄여요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

예약 가능 시간은 환자가 직접 선택하는 기준이에요. 실제 진료와 상담이 가능한 시간만 열어두면 변경 연락과 예약 취소를 줄일 수 있어요.

## 설정 전 확인해요

- 평일 진료시간
- 토요일 진료시간
- 점심시간
- 정기 휴무일
- 임시 휴진일
- 수술 전 상담 가능 시간
- 상담실 또는 수술실 운영 가능 시간

## 시간 설정 기준

| 상황 | 설정 방법 |
| --- | --- |
| 점심시간 | 예약 가능 시간에서 제외해요 |
| 야간진료 | 실제 상담 담당자가 있는 시간만 열어요 |
| 수술 가능일 제한 | 수술 전 상담과 수술 가능일을 구분해 안내해요 |
| 공휴일 | 예약 가능 시간을 닫아두거나 별도 안내해요 |
| 담당자 부재 | 콜백 가능 시간과 예약 가능 시간을 같이 조정해요 |

## 매주 확인해요

예약 가능 시간은 한 번 설정하고 끝내면 안 돼요. 담당자 휴가, 수술실 일정, 임시 휴진, 병원 행사 일정이 있으면 환자에게 열려 있는 시간이 실제 운영과 달라질 수 있어요.
