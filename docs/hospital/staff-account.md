---
title: "담당자 계정과 권한 관리"
description: "파트너센터는 병원 정보, 이벤트, 상담, 예약, 광고비를 다루는 운영 화면이에요. 모든 직원이 같은 권한을 가지면 실수나 개인정보 노출 위험이 커질 수 있어요."
sidebar_position: 4
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 담당자 계정과 권한 관리

<div className="guide-visual guide-visual--hospital">
  <div className="guide-visual__copy">
    <strong>담당자 계정과 권한 관리 화면에서 이렇게 확인해요</strong>
    <p>직원별 업무에 맞게 계정과 권한을 나눠 실수와 정보 노출을 예방해요.</p>
    <ol>
      <li>담당자별로 필요한 화면을 정해요.</li>
      <li>퇴사자와 외부 대행사 접근을 정리해요.</li>
      <li>환자정보와 광고비 화면 권한을 분리해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="담당자 계정과 권한 관리 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>상담 담당자</span>
        <em>상담</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>마케팅 담당자</span>
        <em>광고</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>정산 담당자</span>
        <em>충전</em>
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
    <strong>상담 담당자부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>상담 담당자 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>마케팅 담당자 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>정산 담당자 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>담당자별로 필요한 화면을 정해요.</li>
<li>퇴사자와 외부 대행사 접근을 정리해요.</li>
<li>환자정보와 광고비 화면 권한을 분리해요.</li>
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
        <tr><td>상담 담당자</td><td>상담 담당자 항목은 응답 여부, 다음 연락 시간, 상담 메모가 남아 있는지 확인해요.</td><td>상담 기록이 비어 있으면 담당자가 바뀔 때 같은 환자에게 다른 안내를 할 수 있어요.</td></tr>
<tr><td>마케팅 담당자</td><td>마케팅 담당자 항목은 연결된 이벤트, 노출 조건, 예산 상태가 현재 집행 목적과 맞는지 확인해요.</td><td>광고 조건이 어긋나면 상담 품질이 떨어지거나 예산이 의도와 다르게 소진될 수 있어요.</td></tr>
<tr><td>정산 담당자</td><td>정산 담당자 항목은 금액, 과금 조건, 증빙 정보가 병원 내부 기준과 같은지 대조해요.</td><td>금액이나 증빙 기준이 다르면 광고 집행, 환불, 세금계산서 처리에서 다시 확인해야 해요.</td></tr>
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

파트너센터는 병원 정보, 이벤트, 상담, 예약, 광고비를 다루는 운영 화면이에요. 모든 직원이 같은 권한을 가지면 실수나 개인정보 노출 위험이 커질 수 있어요.

## 담당자별로 권한을 나눠요

| 담당자 | 주로 보는 화면 |
| --- | --- |
| 원장·대표자 | 병원 정보, 광고비, 주요 정책, 리포트 |
| 상담실장 | 상담, 예약, 후기 답글, 이벤트 조건 |
| 마케팅 담당자 | 이벤트, 광고 신청, 리포트, 이미지 |
| 데스크 | 전화상담, 예약 확정, 변경·취소 |
| 정산 담당자 | 충전, 환불 요청, 세금계산서 정보 |

## 계정 관리 기준

- 개인 계정을 공유하지 않아요.
- 퇴사자나 외부 대행사가 계정을 계속 쓰지 않게 정리해요.
- 비밀번호는 주기적으로 바꿔요.
- 환자정보 화면은 필요한 직원만 보게 해요.
- 광고비와 환불 관련 화면은 승인 담당자를 정해요.

## 새 담당자가 들어오면

입점 첫날 가이드, 상담 상태 관리 기준, 예약 확정 처리 기준, 의료광고 기본 준수 가이드를 먼저 확인하게 해 주세요. 이 네 가지를 확인하면 대부분의 실수를 줄일 수 있어요.
