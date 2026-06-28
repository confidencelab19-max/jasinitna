---
title: "파트너센터 화면별 사용법"
description: "파트너센터는 병원이 매일 운영하는 화면을 업무별로 나눠 보여줘요. 처음에는 메뉴 이름보다 “무슨 일을 처리하는 화면인지” 기준으로 보면 쉬워요."
sidebar_position: 3
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 파트너센터 화면별 사용법

<div className="guide-visual guide-visual--start">
  <div className="guide-visual__copy">
    <strong>파트너센터 화면별 사용법 화면에서 이렇게 확인해요</strong>
    <p>파트너센터 메뉴를 업무 기준으로 읽고 지금 처리할 화면을 빠르게 찾아요.</p>
    <ol>
      <li>새 상담과 예약 요청을 먼저 확인해요.</li>
      <li>이벤트 반려와 광고잔고 알림을 확인해요.</li>
      <li>필요한 업무 화면으로 바로 이동해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="파트너센터 화면별 사용법 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>상담 관리</span>
        <em>미응답</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>예약 관리</span>
        <em>요청</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>이벤트 관리</span>
        <em>반려</em>
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
    <strong>상담 관리부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>상담 관리 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>예약 관리 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>이벤트 관리 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>새 상담과 예약 요청을 먼저 확인해요.</li>
<li>이벤트 반려와 광고잔고 알림을 확인해요.</li>
<li>필요한 업무 화면으로 바로 이동해요.</li>
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
        <tr><td>상담 관리</td><td>상담 관리 항목은 응답 여부, 다음 연락 시간, 상담 메모가 남아 있는지 확인해요.</td><td>상담 기록이 비어 있으면 담당자가 바뀔 때 같은 환자에게 다른 안내를 할 수 있어요.</td></tr>
<tr><td>예약 관리</td><td>예약 관리 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
<tr><td>이벤트 관리</td><td>이벤트 관리 항목은 환자에게 보이는 문구, 가격, 이미지, 부작용 안내가 검수 기준에 맞는지 봐요.</td><td>검수 기준과 다르면 노출이 지연되거나 상담에서 가격·조건 오해가 생길 수 있어요.</td></tr>
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

파트너센터는 병원이 매일 운영하는 화면을 업무별로 나눠 보여줘요. 처음에는 메뉴 이름보다 “무슨 일을 처리하는 화면인지” 기준으로 보면 쉬워요.

## 화면별 역할

| 화면 | 병원이 하는 일 |
| --- | --- |
| 병원 정보 | 병원명, 주소, 진료시간, 이미지, 의사 정보를 관리해요 |
| 이벤트 관리 | 이벤트를 등록하고 검수 상태와 반려 사유를 확인해요 |
| 광고 관리 | 광고 신청, 잔고, 일예산, 리포트를 확인해요 |
| 상담 관리 | 전화상담, 채팅상담, 콜백 요청을 처리해요 |
| 예약 관리 | 예약 요청, 확정, 변경, 취소, 방문완료를 관리해요 |
| 후기 관리 | 후기 내용을 확인하고 공개 답글을 작성해요 |
| 충전·정산 | 광고비 충전, 포인트, 환불 요청, 세금계산서 정보를 확인해요 |

## 처음 로그인하면 이렇게 봐요

1. 새 상담과 예약 요청이 있는지 확인해요.
2. 이벤트 반려나 수정 요청이 있는지 확인해요.
3. 광고잔고 부족이나 일예산 소진 알림을 확인해요.
4. 후기 답글이 필요한지 확인해요.
5. 병원 진료시간과 예약 가능 시간이 실제 일정과 같은지 확인해요.

## 메뉴를 찾기 어려울 때

업무 기준으로 검색해요. 예를 들어 환자가 전화 문의를 했다면 “상담”, 예약 시간을 바꿔야 한다면 “예약”, 가격 문구를 고쳐야 한다면 “이벤트” 문서를 먼저 열면 돼요.
