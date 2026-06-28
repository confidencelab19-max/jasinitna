---
title: "자신있나 운영 흐름 이해하기"
description: "자신있나 운영은 크게 6단계로 보면 쉬워요."
sidebar_position: 2
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 자신있나 운영 흐름 이해하기

<div className="guide-visual guide-visual--start">
  <div className="guide-visual__copy">
    <strong>자신있나 운영 흐름 이해하기 화면에서 이렇게 확인해요</strong>
    <p>입력, 검수, 노출, 상담, 예약, 후기 흐름을 한 번에 연결해서 봐요.</p>
    <ol>
      <li>현재 단계의 상태를 확인해요.</li>
      <li>다음 업무로 넘어가기 전 누락된 입력값을 봐요.</li>
      <li>상담과 예약 결과를 다시 운영 화면에서 확인해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="자신있나 운영 흐름 이해하기 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>정보 등록</span>
        <em>완료</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>앱 노출</span>
        <em>진행</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>상담·예약</span>
        <em>확인</em>
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
    <strong>정보 등록부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>정보 등록 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>앱 노출 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>상담·예약 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>현재 단계의 상태를 확인해요.</li>
<li>다음 업무로 넘어가기 전 누락된 입력값을 봐요.</li>
<li>상담과 예약 결과를 다시 운영 화면에서 확인해요.</li>
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
        <tr><td>정보 등록</td><td>정보 등록 항목은 화면 값과 병원 내부 운영 기준이 일치하는지 확인해요.</td><td>기준이 다르면 상담, 예약, 광고 중 연결된 업무에서 추가 확인이 필요해져요.</td></tr>
<tr><td>앱 노출</td><td>앱 노출 항목은 연결된 이벤트, 노출 조건, 예산 상태가 현재 집행 목적과 맞는지 확인해요.</td><td>광고 조건이 어긋나면 상담 품질이 떨어지거나 예산이 의도와 다르게 소진될 수 있어요.</td></tr>
<tr><td>상담·예약</td><td>상담·예약 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
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
        <tr><td>어디부터 봐야 할지 모르겠어요</td><td>입점 후 첫날 해야 할 일, 운영 흐름, 매일 확인 루틴 순서로 열어보면 돼요.</td></tr>
<tr><td>담당자마다 처리 기준이 달라요</td><td>상담, 예약, 광고, 정산 담당자를 나누고 각 화면의 메모 기준을 먼저 맞춰요.</td></tr>
<tr><td>필수 문서를 봤는데 다음 행동이 헷갈려요</td><td>상단 온보딩 진행 상태에서 완료되지 않은 문서를 열고, 해당 문서의 처리 순서만 따라가요.</td></tr>
      </tbody>
    </table>
  </div>
</div>

자신있나 운영은 크게 6단계로 보면 쉬워요.

## 운영 흐름

1. 병원과 의사 정보를 등록해요.
2. 이벤트를 등록하고 검수를 받아요.
3. 승인된 이벤트와 병원 정보를 앱에 노출해요.
4. 필요한 경우 광고 상품을 신청해 노출을 강화해요.
5. 환자가 전화상담, 채팅상담, 앱예약으로 전환돼요.
6. 상담·내원 이후 후기와 리포트를 확인해 운영을 개선해요.

## 병원 담당자가 자주 보는 화면

| 화면 | 확인할 내용 |
| --- | --- |
| 병원 정보 | 소개, 이미지, 진료시간, 위치, 상담 가능 시간 |
| 이벤트 관리 | 등록 상태, 반려 사유, 가격, 이미지, 검수 결과 |
| 광고 관리 | 광고 상품, 예산, 잔고, 노출 상태, 리포트 |
| 상담 관리 | 전화상담 요청, 채팅상담, 첨부 이미지 |
| 예약 관리 | 예약 접수, 변경, 취소, 노쇼, 방문완료 |
| 후기 관리 | 후기 내용, 인증후기, 답글, 삭제 검토 요청 |

## 운영할 때 중요한 기준

앱에 보이는 내용과 상담에서 안내하는 내용이 같아야 해요. 이벤트 가격, 추가 비용, 예약 가능 시간, 수술 가능 여부가 상담에서 달라지면 환자 불만과 광고 심사 문제가 함께 생길 수 있어요.
