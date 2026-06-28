---
title: "병원 프로필 등록·수정 가이드"
description: "병원 프로필은 환자가 상담을 신청하기 전에 확인하는 기본 정보예요. 정보가 오래되면 상담 취소와 예약 이탈이 생길 수 있어요."
sidebar_position: 1
owner: "자신있나 파트너스"
review_status: "게시 가능"
reviewed_at: 2026-06-27
review_due_at: 2026-12-27
---

# 병원 프로필 등록·수정 가이드

<div className="guide-visual guide-visual--hospital">
  <div className="guide-visual__copy">
    <strong>병원 프로필 등록·수정 가이드 화면에서 이렇게 확인해요</strong>
    <p>환자가 상담 전 확인하는 병원명, 위치, 전화번호, 진료시간을 정확히 맞춰요.</p>
    <ol>
      <li>필수 입력칸이 비어 있는지 확인해요.</li>
      <li>수정한 정보가 환자 화면에 어떻게 보이는지 확인해요.</li>
      <li>저장 후 연결된 이벤트 문구도 같이 점검해요.</li>
    </ol>
  </div>
  <div className="visual-screen" aria-label="병원 프로필 등록·수정 가이드 확인 화면">
    <div className="visual-screen__bar"></div>
    <div className="visual-screen__body">
      <div className="visual-screen__row">
        <i></i>
        <span>주소·전화</span>
        <em>필수</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>진료시간</span>
        <em>필수</em>
      </div>
      <div className="visual-screen__row">
        <i></i>
        <span>저장 버튼</span>
        <em>클릭</em>
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
    <strong>주소·전화부터 순서대로 확인해요</strong>
    <p>아래 순서대로 보면 화면을 처음 여는 담당자도 지금 무엇을 확인하고 어떤 상태로 저장해야 하는지 알 수 있어요.</p>
  </div>
  <div className="screen-anatomy">
    <div className="screen-anatomy__part">
      <strong>목록 영역</strong>
      <p>주소·전화 항목을 먼저 보고 처리 우선순위를 정해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>상세 영역</strong>
      <p>진료시간 항목을 열어 실제 운영 정보와 맞는지 확인해요.</p>
    </div>
    <div className="screen-anatomy__part">
      <strong>처리 영역</strong>
      <p>저장 버튼 항목을 확인한 뒤 상태를 저장하고 담당자에게 공유해요.</p>
    </div>
  </div>
  <div className="guide-playbook__grid">
    <div className="guide-playbook__panel">
      <h2>실제 처리 순서</h2>
      <ol>
        <li>필수 입력칸이 비어 있는지 확인해요.</li>
<li>수정한 정보가 환자 화면에 어떻게 보이는지 확인해요.</li>
<li>저장 후 연결된 이벤트 문구도 같이 점검해요.</li>
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
        <tr><td>주소·전화</td><td>주소·전화 항목은 응답 여부, 다음 연락 시간, 상담 메모가 남아 있는지 확인해요.</td><td>상담 기록이 비어 있으면 담당자가 바뀔 때 같은 환자에게 다른 안내를 할 수 있어요.</td></tr>
<tr><td>진료시간</td><td>진료시간 항목은 환자에게 안내한 시간과 병원 내부 예약표가 같은지 확인해요.</td><td>예약 상태가 다르면 콜백 누락, 내원 혼선, 노쇼 처리 오류가 생길 수 있어요.</td></tr>
<tr><td>저장 버튼</td><td>저장 버튼 항목은 화면 값과 병원 내부 운영 기준이 일치하는지 확인해요.</td><td>기준이 다르면 상담, 예약, 광고 중 연결된 업무에서 추가 확인이 필요해져요.</td></tr>
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

병원 프로필은 환자가 상담을 신청하기 전에 확인하는 기본 정보예요. 정보가 오래되면 상담 취소와 예약 이탈이 생길 수 있어요.

## 등록 전 준비해 주세요

- 병원명, 주소, 대표 전화번호
- 진료시간, 점심시간, 휴무일
- 주차와 내원 안내
- 상담 가능 시간
- 병원 소개 문구
- 병원 외관, 내부, 상담실 이미지
- 주요 진료·수술 분야

## 병원 소개 작성 기준

병원 소개는 과장된 홍보보다 환자가 내원 전 알아야 할 정보를 중심으로 써 주세요.

| 피해야 할 표현 | 권장 표현 |
| --- | --- |
| 남성수술 최고 병원 | 남성수술 상담이 가능한 병원 |
| 무조건 만족 | 개인 상태에 따라 결과가 달라질 수 있어요 |
| 부작용 없는 수술 | 부작용 가능성이 있어 상담이 필요해요 |
| 빠른 회복 보장 | 회복 기간은 개인차가 있을 수 있어요 |

## 수정 후 다시 확인해 주세요

병원명, 주소, 의사 정보, 대표 문구, 의료광고 문구가 바뀌면 자신있나 확인이 필요할 수 있어요. 수정한 내용이 이벤트나 광고와 연결되어 있다면 노출 전에 다시 검수될 수 있어요.
