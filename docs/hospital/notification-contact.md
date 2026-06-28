---
title: "알림 수신과 연락 담당자 설정"
description: "검수 반려, 광고잔고 부족, 새 상담, 예약 요청은 담당자가 빨리 확인해야 해요. 알림을 받을 사람과 처리할 사람을 병원 내부에서 나눠두면 누락을 줄일 수 있어요."
sidebar_position: 5
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 알림 수신과 연락 담당자 설정

<div className="guide-visual guide-visual--hospital">
  <div className="guide-visual__copy">
    <strong>알림 수신과 연락 담당자 설정 화면에서 이렇게 확인해요</strong>
    <p>새 상담, 예약, 반려, 잔고 부족 알림이 맞는 담당자에게 가도록 관리해요.</p>
    <ol>
      <li>알림별 담당자를 지정해요.</li>
      <li>휴대폰과 이메일 변경 시 바로 수정해요.</li>
      <li>매주 알림 수신 여부를 확인해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="알림 수신과 연락 담당자 설정 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>새 상담</span>
        <em>상담팀</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>예약 요청</span>
        <em>데스크</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>잔고 부족</span>
        <em>정산</em>
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
    <strong>새 상담부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>새 상담 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>예약 요청 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>잔고 부족 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>알림별 담당자를 지정해요.</li>
<li>휴대폰과 이메일 변경 시 바로 수정해요.</li>
<li>매주 알림 수신 여부를 확인해요.</li>
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
        <tr><td>새 상담</td><td>새 상담 항목은 응답 여부, 다음 연락 시간, 상담 메모가 남아 있는지 확인해요.</td><td>상담 기록이 비어 있으면 담당자가 바뀔 때 같은 환자에게 다른 안내를 할 수 있어요.</td></tr>
<tr><td>예약 요청</td><td>예약 요청 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
<tr><td>잔고 부족</td><td>잔고 부족 항목은 금액, 과금 조건, 증빙 정보가 병원 내부 기준과 같은지 대조해요.</td><td>금액이나 증빙 기준이 다르면 광고 집행, 환불, 세금계산서 처리에서 다시 확인해야 해요.</td></tr>
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
        <tr><td>병원 정보가 앱과 실제 운영이 달라요</td><td>파트너센터에서 먼저 수정하고 상담팀에 변경 내용을 공유해요.</td></tr>
<tr><td>의사 경력이나 이미지 기준이 애매해요</td><td>확인 가능한 정보만 남기고 과장 표현, 선정적 이미지, 불필요한 민감 정보는 제외해요.</td></tr>
<tr><td>알림을 받아야 할 담당자가 못 받아요</td><td>상담, 예약, 광고, 정산 담당자 연락처와 권한을 다시 확인해요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

검수 반려, 광고잔고 부족, 새 상담, 예약 요청은 담당자가 빨리 확인해야 해요. 알림을 받을 사람과 처리할 사람을 병원 내부에서 나눠두면 누락을 줄일 수 있어요.

## 알림별 담당자를 정해요

| 알림 | 담당자 |
| --- | --- |
| 새 상담 요청 | 상담실장 또는 상담 담당자 |
| 예약 요청 | 데스크 또는 예약 담당자 |
| 이벤트 반려 | 마케팅 담당자 |
| 광고잔고 부족 | 광고·정산 담당자 |
| 후기 답글 필요 | 상담실장 또는 고객 응대 담당자 |
| 환불·증빙 확인 | 정산 담당자 |

## 연락처가 바뀌면 바로 수정해요

담당자 휴대폰, 이메일, 대표번호가 바뀌면 알림을 놓칠 수 있어요. 특히 광고잔고 부족이나 이벤트 반려 알림을 놓치면 광고가 멈추거나 이벤트 노출이 늦어질 수 있어요.

## 매주 확인하면 좋아요

- 새 상담 알림이 담당자에게 도착하는지 확인해요.
- 예약 요청 알림을 데스크가 바로 볼 수 있는지 확인해요.
- 광고비와 세금계산서 관련 연락처가 정산 담당자 정보인지 확인해요.
- 퇴사자 연락처가 남아 있지 않은지 확인해요.
