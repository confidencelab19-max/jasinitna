---
title: "앱예약 전체 흐름"
description: "앱예약은 환자가 자신있나에서 병원 예약을 요청하고, 병원이 실제 진료 가능 여부를 확인해 운영하는 흐름이에요. 예약 화면은 상담팀과 데스크가 같은 기준으로 봐야 해요."
sidebar_position: 1
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 앱예약 전체 흐름

<div className="guide-visual guide-visual--appointments">
  <div className="guide-visual__copy">
    <strong>앱예약 전체 흐름 화면에서 이렇게 확인해요</strong>
    <p>예약 요청부터 방문완료까지 상태를 실제 병원 일정과 같은 기준으로 관리해요.</p>
    <ol>
      <li>새 예약 요청과 내부 예약표를 비교해요.</li>
      <li>확정 또는 변경 안내를 빠르게 진행해요.</li>
      <li>방문 후 상태를 마감 전에 정리해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="앱예약 전체 흐름 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>예약 요청</span>
        <em>확인</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>확정 대기</span>
        <em>처리</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>방문완료</span>
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
    <strong>예약 요청부터 방문완료까지 한 화면에서 정리해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>예약 목록</strong>
      <p>새 요청, 확정 대기, 오늘 예약, 변경 요청을 먼저 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>예약 상세</strong>
      <p>환자가 선택한 날짜, 시간, 이벤트, 연락처, 메모를 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상태 처리</strong>
      <p>확정, 변경 안내, 취소, 방문완료, 노쇼 상태를 실제 운영과 맞춰요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>새 예약 요청을 열고 환자가 선택한 날짜와 시간을 확인해요.</li>
<li>병원 내부 예약표와 충돌이 없는지 확인해요.</li>
<li>환자가 본 이벤트의 가격과 상담 조건을 같이 확인해요.</li>
<li>가능하면 예약을 확정하고, 불가능하면 대체 시간을 안내해요.</li>
<li>전화로 변경 안내를 했다면 플랫폼 상태와 메모도 같이 수정해요.</li>
<li>방문 후에는 방문완료, 노쇼, 취소 중 실제 상태로 정리해요.</li>
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
        <tr><td>예약 시간</td><td>내부 예약표와 같은지 확인해요.</td><td>전화로만 바꾸고 화면을 안 바꾸면 혼선이 생겨요.</td></tr>
<tr><td>환자 연락처</td><td>변경 안내와 준비물 안내에만 사용해요.</td><td>광고성 연락에 쓰면 안 돼요.</td></tr>
<tr><td>이벤트명</td><td>상담 가격과 조건을 맞추기 위해 확인해요.</td><td>다른 이벤트 조건으로 안내하면 민원이 생겨요.</td></tr>
<tr><td>상태</td><td>요청, 확정, 취소, 노쇼, 방문완료를 구분해요.</td><td>상태가 비어 있으면 리포트가 흔들려요.</td></tr>
<tr><td>메모</td><td>준비물, 변경 사유, 콜백 시간을 남겨요.</td><td>담당자 교대 시 같은 안내를 반복할 수 있어요.</td></tr>
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
        <tr><td>내부 예약표와 시간이 겹쳐요</td><td>바로 대체 시간을 안내하고 변경 사유를 메모해요.</td></tr>
<tr><td>환자가 연락이 안 돼요</td><td>콜백 기준에 따라 재연락하고, 무리한 반복 연락은 하지 않아요.</td></tr>
<tr><td>예약 당일 오지 않았어요</td><td>노쇼 상태로 정리하고 병원 내부 기준에 따라 후속 안내해요.</td></tr>
<tr><td>예약 후 다른 수술로 바뀌었어요</td><td>상담 메모와 이벤트 조건을 함께 남겨 리포트 해석이 흔들리지 않게 해요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

앱예약은 환자가 자신있나에서 병원 예약을 요청하고, 병원이 실제 진료 가능 여부를 확인해 운영하는 흐름이에요. 예약 화면은 상담팀과 데스크가 같은 기준으로 봐야 해요.

## 예약 흐름

1. 환자가 앱에서 예약 가능 시간을 확인해요.
2. 환자가 원하는 날짜와 시간을 선택해 예약을 요청해요.
3. 병원 담당자가 예약 정보를 확인해요.
4. 병원 내부 예약표와 충돌 여부를 확인해요.
5. 예약을 확정하거나 변경 가능 시간을 안내해요.
6. 방문 후 방문완료, 노쇼, 취소 상태를 정리해요.

## 예약 화면에서 먼저 볼 것

| 항목 | 확인 이유 |
| --- | --- |
| 예약 날짜와 시간 | 병원 내부 예약표와 충돌을 막아요 |
| 환자가 본 이벤트 | 상담 가격과 조건을 맞춰요 |
| 연락처 | 변경이나 추가 안내가 필요할 때 사용해요 |
| 예약 상태 | 요청, 확정, 취소, 노쇼를 구분해요 |
| 메모 | 준비물, 금식, 추가 상담 필요 여부를 공유해요 |

## 운영 원칙

앱에서 가능한 시간으로 보였더라도 병원 내부 사정으로 조정이 필요할 수 있어요. 이 경우 환자에게 빠르게 안내하고, 플랫폼 예약 상태도 실제 진행 상황과 같게 맞춰 주세요.
