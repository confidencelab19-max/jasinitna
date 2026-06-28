---
title: "이벤트 상태값과 노출 기준"
description: "이벤트는 등록, 검수, 승인, 반려, 수정, 종료 상태를 지나며 노출 여부가 달라져요. 병원 담당자는 상태값을 보고 지금 해야 할 일을 바로 판단할 수 있어야 해요."
sidebar_position: 3
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 이벤트 상태값과 노출 기준

<div className="guide-visual guide-visual--events">
  <div className="guide-visual__copy">
    <strong>이벤트 상태값과 노출 기준 화면에서 이렇게 확인해요</strong>
    <p>이벤트 상태값을 보고 노출 가능 여부와 병원이 해야 할 일을 바로 구분해요.</p>
    <ol>
      <li>상태와 마지막 수정일을 확인해요.</li>
      <li>반려 또는 수정검수 사유를 열어봐요.</li>
      <li>광고 연결 이벤트라면 광고 상태도 같이 확인해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="이벤트 상태값과 노출 기준 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>검수중</span>
        <em>대기</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>반려</span>
        <em>수정</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>승인</span>
        <em>노출</em>
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
    <strong>상태값을 보고 다음 행동을 결정해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>상태 필터</strong>
      <p>작성중, 검수중, 승인, 반려, 종료 상태를 나눠 봐요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>이벤트 목록</strong>
      <p>마지막 수정일, 연결 광고, 담당자 메모를 함께 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 패널</strong>
      <p>반려 사유, 재검수 여부, 노출 가능 여부를 확인해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>반려 상태는 사유를 먼저 열고 수정 담당자를 정해요.</li>
<li>검수중 상태는 같은 이벤트를 반복 수정하지 말고 결과를 기다려요.</li>
<li>승인 상태는 상담팀에 가격과 조건을 공유해요.</li>
<li>수정검수 상태는 광고 연결 여부를 함께 확인해요.</li>
<li>종료 상태는 상담 중 같은 조건을 안내하지 않도록 내부에 공유해요.</li>
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
        <tr><td>작성중</td><td>검수 요청 전 상태예요.</td><td>저장만 해두고 요청하지 않으면 노출되지 않아요.</td></tr>
<tr><td>검수중</td><td>자신있나 확인 중이에요.</td><td>계속 수정하면 확인 기준이 바뀔 수 있어요.</td></tr>
<tr><td>승인</td><td>환자에게 노출할 수 있어요.</td><td>상담팀이 다른 조건을 말하면 민원이 생겨요.</td></tr>
<tr><td>반려</td><td>수정이 필요해요.</td><td>반려 사유를 보지 않고 제목만 바꾸면 해결되지 않아요.</td></tr>
<tr><td>종료</td><td>더 이상 노출하지 않는 상태예요.</td><td>종료 이벤트를 상담 중 안내하지 않게 주의해요.</td></tr>
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
        <tr><td>승인인데 보이지 않아요</td><td>이벤트 기간, 노출 설정, 광고 연결 상태, 카테고리를 함께 확인해요.</td></tr>
<tr><td>수정 후 상담이 줄었어요</td><td>변경된 제목, 대표 이미지, 가격 안내가 환자 입장에서 이해되는지 다시 봐요.</td></tr>
<tr><td>종료 후 문의가 들어와요</td><td>기존 광고 소재나 상담 스크립트에 이전 조건이 남아 있는지 확인해요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

이벤트는 등록, 검수, 승인, 반려, 수정, 종료 상태를 지나며 노출 여부가 달라져요. 병원 담당자는 상태값을 보고 지금 해야 할 일을 바로 판단할 수 있어야 해요.

## 상태별로 해야 할 일

| 상태 | 의미 | 병원이 할 일 |
| --- | --- | --- |
| 작성중 | 아직 검수 요청 전이에요 | 가격, 이미지, 부작용 안내를 마저 입력해요 |
| 검수중 | 자신있나가 내용을 확인하고 있어요 | 같은 이벤트를 반복 수정하지 말고 결과를 기다려요 |
| 승인 | 환자에게 노출할 수 있어요 | 상담팀에 가격과 조건을 공유해요 |
| 반려 | 수정이 필요한 항목이 있어요 | 반려 사유를 보고 해당 항목만 정확히 고쳐요 |
| 수정검수 | 승인 후 바뀐 내용이 다시 확인 중이에요 | 광고 연결 여부와 노출 상태를 함께 확인해요 |
| 종료 | 기간이 끝났거나 병원이 내린 상태예요 | 상담 중 같은 조건을 안내하지 않게 공유해요 |

## 상태 확인 순서

1. 이벤트 목록에서 상태와 마지막 수정일을 확인해요.
2. 반려 또는 수정검수 상태라면 사유를 먼저 열어봐요.
3. 가격, 이미지, 상세 설명 중 어떤 항목이 문제인지 분리해요.
4. 수정 후에는 상담팀에 변경된 조건을 공유해요.
5. 광고에 연결된 이벤트라면 광고 노출 상태도 같이 확인해요.

## 자주 생기는 실수

- 이미 승인된 이벤트 이미지만 바꾸고 입력 가격은 그대로 두는 경우가 있어요.
- 종료된 이벤트를 상담 중 계속 안내하는 경우가 있어요.
- 반려 사유를 보지 않고 제목만 바꿔 다시 요청하는 경우가 있어요.
- 광고에 연결된 이벤트가 수정검수 상태인데 광고가 멈춘 이유를 잔고 문제로만 보는 경우가 있어요.
