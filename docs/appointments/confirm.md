---
title: "예약 확정 처리 기준"
description: "예약 요청이 들어오면 가능한 빨리 병원 내부 예약표와 비교해 확정 여부를 정해야 해요. 확정이 늦어지면 환자가 다른 병원으로 이동할 수 있어요."
sidebar_position: 3
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 예약 확정 처리 기준

<div className="guide-visual guide-visual--appointments">
  <div className="guide-visual__copy">
    <strong>예약 확정 처리 기준 화면에서 이렇게 확인해요</strong>
    <p>예약 확정은 내부 예약표 확인과 환자 안내가 함께 끝나야 완료돼요.</p>
    <ol>
      <li>선택된 날짜와 시간을 확인해요.</li>
      <li>준비물과 내원 안내를 전달해요.</li>
      <li>통화 후 플랫폼 상태도 확정으로 바꿔요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="예약 확정 처리 기준 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>예약 요청</span>
        <em>확인</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>내부 일정</span>
        <em>대조</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>예약 확정</span>
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
    <strong>예약 확정은 통화와 화면 상태가 같이 끝나야 해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>새 예약</strong>
      <p>확정 대기 목록에서 오늘 처리할 예약을 먼저 봐요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>환자 정보</strong>
      <p>이벤트, 요청 시간, 연락처, 준비물 안내 필요 여부를 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>확정 버튼</strong>
      <p>확정 또는 변경 안내 후 상태를 저장해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>환자가 선택한 예약 시간을 내부 예약표와 비교해요.</li>
<li>가능하면 확정하고 내원 안내를 전달해요.</li>
<li>준비물이 필요한 상담이라면 메모에 남겨요.</li>
<li>불가능하면 가능한 시간 2~3개를 안내해요.</li>
<li>전화 또는 채팅으로 안내한 뒤 플랫폼 상태를 확정 또는 변경 요청으로 저장해요.</li>
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
        <tr><td>요청 시간</td><td>환자가 선택한 시간이에요.</td><td>내부 예약표와 다르면 반드시 조정해요.</td></tr>
<tr><td>확정 상태</td><td>실제 예약 확정 후 바꿔요.</td><td>상태를 안 바꾸면 다른 담당자가 다시 연락할 수 있어요.</td></tr>
<tr><td>내원 안내</td><td>위치, 주차, 준비물, 도착 시간을 안내해요.</td><td>안내 누락은 당일 취소로 이어질 수 있어요.</td></tr>
<tr><td>담당자 메모</td><td>변경 사유와 환자 요청을 남겨요.</td><td>메모가 없으면 교대 근무 때 맥락이 끊겨요.</td></tr>
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
        <tr><td>환자가 시간을 바꾸고 싶어 해요</td><td>변경 가능 시간을 안내하고 상태를 변경으로 저장해요.</td></tr>
<tr><td>병원 일정이 갑자기 막혔어요</td><td>먼저 환자에게 안내한 뒤 예약 가능 시간을 닫아요.</td></tr>
<tr><td>예약 후 상담 내용이 바뀌었어요</td><td>상담 메모와 예약 메모를 모두 업데이트해요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

예약 요청이 들어오면 가능한 빨리 병원 내부 예약표와 비교해 확정 여부를 정해야 해요. 확정이 늦어지면 환자가 다른 병원으로 이동할 수 있어요.

## 확정 전 확인 순서

1. 환자가 선택한 날짜와 시간을 확인해요.
2. 병원 내부 예약표와 충돌 여부를 확인해요.
3. 환자가 본 이벤트와 상담 내용을 확인해요.
4. 준비물이 필요한 수술·상담인지 확인해요.
5. 예약 확정 또는 시간 변경 안내를 진행해요.

## 확정 후 안내하면 좋아요

- 병원 위치와 주차 안내
- 예약 시간보다 일찍 도착해야 하는지 여부
- 신분증이나 검사 자료 필요 여부
- 수술·시술 전 주의사항
- 변경이나 취소 연락 기준

## 확정 상태를 꼭 바꿔요

전화로만 확정하고 플랫폼 상태를 바꾸지 않으면 담당자 간 공유가 끊길 수 있어요. 환자와 통화가 끝났다면 예약 화면의 상태도 실제와 같게 정리해 주세요.
