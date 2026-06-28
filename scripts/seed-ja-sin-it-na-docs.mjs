import {mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';

const root = process.cwd();
const reviewedAt = '2026-06-26';
const reviewDueAt = '2026-12-26';

const categories = [
  {
    dir: 'updates',
    label: '자신있나 기능 업데이트',
    position: 1,
    owner: '제품운영팀',
    description: '파트너센터에 새롭게 추가되거나 달라진 기능을 한눈에 확인해 보세요.',
    docs: [
      ['overview', '자신있나 기능 업데이트', '파트너센터의 주요 변경사항을 병원 담당자가 빠르게 확인합니다.'],
      ['release-note-checklist', '업데이트 공지 확인 체크리스트', '업데이트 공지를 읽고 병원 운영에 영향이 있는 항목을 구분합니다.'],
      ['new-feature-rollout', '새 기능 도입 전 점검', '새 기능을 병원 운영에 적용하기 전에 확인해야 할 절차입니다.'],
      ['change-impact-review', '변경 영향도 검토', '기능 변경이 예약, 상담, 결제, 이벤트에 미치는 영향을 확인합니다.'],
      ['partner-center-navigation', '파트너센터 메뉴 변경 확인', '메뉴명과 위치가 바뀌었을 때 직원에게 안내하는 기준입니다.'],
      ['event-editor-update', '이벤트 편집 기능 변경', '이벤트 등록 화면이 바뀌었을 때 확인해야 할 입력 항목입니다.'],
      ['reservation-update', '예약 기능 변경 확인', '예약 가능 시간, 확정, 변경 흐름의 업데이트를 점검합니다.'],
      ['payment-update', '결제 상태 업데이트 확인', '결제 상태 표시와 환불 흐름이 바뀌었을 때 확인합니다.'],
      ['chat-update', '채팅상담 기능 변경 확인', '상담 배정, 알림, 응답 상태의 변경 사항을 확인합니다.'],
      ['photo-review-update', '전후사진 검수 기능 변경', '사진 등록과 검수 상태 변경을 병원 운영 기준에 맞춰 확인합니다.'],
      ['report-update', '성과 리포트 변경 확인', '광고와 예약 성과 리포트가 바뀌었을 때 해석 기준을 정리합니다.'],
      ['staff-training-update', '직원 교육이 필요한 업데이트', '업데이트 후 직원 안내와 교육이 필요한 상황을 구분합니다.'],
      ['update-history', '업데이트 이력 관리', '변경된 기능과 내부 조치 내용을 문서로 남기는 기준입니다.'],
    ],
  },
  {
    dir: 'getting-started',
    label: '자신있나가 궁금하신가요?',
    position: 2,
    owner: '고객성공팀',
    description: '서비스 구조, 병원 계정, 기본 운영 흐름을 처음부터 확인할 수 있는 공간입니다.',
    docs: [
      ['overview', '자신있나 시작하기', '자신있나 서비스 구조와 병원 담당자 기본 흐름을 이해합니다.'],
      ['service-structure', '서비스 구조 이해하기', '고객 화면, 병원 파트너센터, 운영 문서의 관계를 이해합니다.'],
      ['hospital-account', '병원 계정 생성과 초대', '병원 담당자를 초대하고 권한을 부여하는 기본 절차입니다.'],
      ['roles', '담당자 역할 이해하기', '관리자, 운영자, 상담 담당자의 역할을 구분합니다.'],
      ['first-week', '도입 첫 주 운영 체크', '서비스 도입 직후 병원이 확인해야 할 기본 항목입니다.'],
      ['internal-workflow', '내부 업무 흐름 정리', '자신있나 운영을 병원 내부 업무 흐름에 맞추는 방법입니다.'],
      ['customer-journey', '고객 이용 흐름 이해하기', '고객이 검색, 상담, 예약, 결제까지 이동하는 흐름을 봅니다.'],
      ['support-contact', '지원 요청 전 준비사항', '지원팀에 문의하기 전에 준비하면 좋은 정보를 정리합니다.'],
    ],
  },
  {
    dir: 'operations',
    label: '자신있나 운영 가이드',
    position: 3,
    owner: '운영관리팀',
    description: '병원 정보, 담당자 권한, 운영 기준을 안정적으로 관리하는 방법을 모았습니다.',
    docs: [
      ['overview', '자신있나 운영 가이드', '병원 정보와 운영 기준을 안정적으로 관리합니다.'],
      ['hospital-profile', '병원 정보 관리 기준', '고객에게 노출되는 병원 기본 정보를 점검합니다.'],
      ['hours-and-holidays', '진료 시간과 휴무일 관리', '진료 시간, 점심시간, 임시 휴무를 최신 상태로 유지합니다.'],
      ['permission-management', '권한 관리 기준', '담당자별 수정 권한을 안전하게 부여하고 회수합니다.'],
      ['approval-workflow', '내부 승인 흐름 만들기', '고객에게 노출되는 정보의 승인 단계를 정리합니다.'],
      ['incident-response', '운영 이슈 대응', '잘못된 정보 노출이나 상담 누락이 생겼을 때 처리합니다.'],
    ],
  },
  {
    dir: 'events',
    label: '이벤트 가이드',
    position: 4,
    owner: '마케팅운영팀',
    description: '병원의 시술 정보를 고객에게 정확하게 전달하고 이벤트를 관리하는 방법을 안내합니다.',
    docs: [
      ['overview', '이벤트 가이드', '시술 이벤트를 등록하고 관리하는 기본 기준입니다.'],
      ['event-planning', '이벤트 기획 전 확인', '이벤트 목적, 대상, 기간, 가격 조건을 먼저 정리합니다.'],
      ['event-title', '이벤트명 작성 기준', '고객이 이해하기 쉬운 이벤트명을 작성하는 방법입니다.'],
      ['price-and-vat', '가격과 VAT 표기', '가격, VAT, 별도 비용을 고객에게 명확하게 안내합니다.'],
      ['included-items', '포함 항목과 제외 조건', '이벤트에 포함되는 항목과 추가 비용을 구분합니다.'],
      ['event-review', '이벤트 검토 체크리스트', '이벤트 공개 전 병원이 확인해야 할 항목입니다.'],
      ['event-publish', '이벤트 공개와 종료', '이벤트 시작, 수정, 종료 시점의 운영 기준입니다.'],
      ['event-performance', '이벤트 성과 확인', '조회, 상담, 예약 전환 흐름으로 이벤트 성과를 확인합니다.'],
      ['event-faq', '이벤트 문의 응대', '고객이 자주 묻는 이벤트 조건을 일관되게 안내합니다.'],
      ['event-archive', '종료 이벤트 보관', '종료된 이벤트 정보를 내부 기록으로 남기는 방법입니다.'],
    ],
  },
  {
    dir: 'photos',
    label: '전후사진 관리 가이드',
    position: 5,
    owner: '콘텐츠검수팀',
    description: '사진 등록 전 확인해야 할 동의, 심의, 노출 기준을 정리했습니다.',
    docs: [
      ['overview', '전후사진 관리 가이드', '전후사진 등록 전 동의와 노출 기준을 확인합니다.'],
      ['consent', '사진 동의 관리', '전후사진 사용 동의와 철회 요청을 관리합니다.'],
      ['photo-quality', '사진 품질 기준', '촬영 각도, 조명, 해상도 기준을 점검합니다.'],
      ['privacy-mask', '개인정보 비식별 처리', '얼굴, 이름, 차트 정보 등 식별 요소를 제거합니다.'],
      ['before-after-pairing', '전후사진 짝 맞추기', '전후 비교가 왜곡되지 않도록 촬영 조건을 맞춥니다.'],
      ['review-status', '사진 검수 상태 확인', '등록, 보류, 반려, 공개 상태를 확인합니다.'],
      ['removal-request', '노출 중단 요청 처리', '고객 요청이나 내부 기준에 따라 사진을 내립니다.'],
      ['photo-audit', '정기 사진 점검', '공개 중인 사진을 주기적으로 검토하는 기준입니다.'],
    ],
  },
  {
    dir: 'ads',
    label: '광고 상품 소개서',
    position: 6,
    owner: '광고운영팀',
    description: '자신있나 광고 노출 구조와 과금 방식을 병원 담당자가 비교할 수 있어요.',
    docs: [
      ['overview', '광고 상품 소개서', '자신있나 광고 노출 구조와 운영 기준을 이해합니다.'],
      ['billing', '광고 과금 확인', '광고 비용과 집행 상태를 확인하는 기준입니다.'],
    ],
  },
  {
    dir: 'payments',
    label: '앱결제 기능 가이드',
    position: 7,
    owner: '결제운영팀',
    description: '고객이 앱에서 시술 금액을 미리 결제할 때 병원이 확인해야 할 절차입니다.',
    docs: [
      ['overview', '앱결제 기능 가이드', '고객이 앱에서 결제한 내역을 병원이 확인하는 절차입니다.'],
      ['payment-status', '결제 상태 확인', '결제 완료, 대기, 취소, 환불 상태를 구분합니다.'],
      ['reservation-link', '결제와 예약 연결', '결제 내역과 예약 정보를 함께 확인합니다.'],
      ['additional-costs', '추가 비용 안내', '앱결제 금액 외 추가 비용이 필요한 경우 안내 기준입니다.'],
      ['refunds', '환불과 일정 변경 처리', '앱결제 이후 취소나 일정 변경이 발생했을 때 확인할 기준입니다.'],
      ['no-show-policy', '노쇼와 예약 변경 기준', '결제 고객이 내원하지 않거나 일정을 바꾸는 경우를 처리합니다.'],
      ['payment-reconciliation', '정산 확인', '결제 내역과 병원 내부 정산 자료를 대조합니다.'],
      ['payment-faq', '앱결제 문의 응대', '고객의 결제 문의를 일관되게 안내합니다.'],
    ],
  },
  {
    dir: 'performance-ads',
    label: '성과형 부가광고 가이드',
    position: 8,
    owner: '광고운영팀',
    description: '성과형 광고로 병원 이벤트를 더 많이 노출하고 성과를 확인하는 기준입니다.',
    docs: [
      ['overview', '성과형 부가광고 가이드', '성과형 광고의 집행 전후 확인 사항입니다.'],
      ['campaign-goal', '광고 목표 설정', '상담, 예약, 인지도 중 어떤 성과를 볼지 정합니다.'],
      ['event-selection', '광고 대상 이벤트 선택', '성과형 광고에 적합한 이벤트를 고르는 기준입니다.'],
      ['budget-period', '예산과 기간 설정', '예산 한도와 집행 기간을 운영 계획에 맞춥니다.'],
      ['creative-check', '광고 소재 점검', '광고에 연결되는 이벤트와 문구를 점검합니다.'],
      ['consulting-readiness', '상담 준비 상태 확인', '광고 집행 전 상담 인력과 응답 시간을 확인합니다.'],
      ['reporting', '성과 리포트 읽기', '광고 성과를 해석할 때 확인해야 할 지표입니다.'],
      ['optimization', '성과 개선 방법', '클릭, 상담, 예약 전환을 기준으로 개선점을 찾습니다.'],
      ['pause-resume', '광고 중지와 재개', '성과나 운영 상황에 따라 광고를 조정합니다.'],
      ['post-campaign-review', '집행 후 회고', '캠페인 종료 후 다음 운영에 반영할 내용을 정리합니다.'],
    ],
  },
  {
    dir: 'reservations',
    label: '앱예약 가이드',
    position: 9,
    owner: '예약운영팀',
    description: '전화, 카톡, 문자 없이 앱에서 예약을 받고 내원일을 관리하는 방법입니다.',
    docs: [
      ['overview', '앱예약 가이드', '고객이 앱에서 예약을 신청하고 병원이 확정하는 흐름입니다.'],
      ['schedule', '예약 가능 시간 관리', '예약 가능 시간과 휴무일을 최신 상태로 유지합니다.'],
      ['request-review', '예약 요청 확인', '고객이 요청한 일정과 시술 정보를 확인합니다.'],
      ['confirmation', '예약 확정 처리', '예약 가능 여부를 확인하고 확정 안내를 보냅니다.'],
      ['reschedule', '예약 변경 처리', '일정 변경 요청을 받았을 때 처리 기준입니다.'],
      ['cancellation', '예약 취소 처리', '취소 사유와 환불 여부를 함께 확인합니다.'],
      ['pre-visit-guide', '내원 전 안내', '고객이 방문 전에 알아야 할 준비물을 안내합니다.'],
      ['doctor-schedule', '의료진 일정 반영', '담당 의료진별 가능 시간을 예약에 반영합니다.'],
      ['capacity-control', '예약 수용량 관리', '시간대별 예약 과밀을 방지합니다.'],
      ['late-arrival', '지각과 노쇼 대응', '고객이 늦거나 방문하지 않는 경우를 처리합니다.'],
      ['reservation-memo', '예약 메모 관리', '상담 내용과 예약 특이사항을 기록합니다.'],
      ['reservation-report', '예약 리포트 확인', '예약 요청, 확정, 취소 흐름을 지표로 확인합니다.'],
      ['reservation-faq', '예약 문의 응대', '예약 관련 고객 질문에 일관되게 답변합니다.'],
    ],
  },
  {
    dir: 'chat',
    label: '채팅상담 가이드',
    position: 10,
    owner: '상담운영팀',
    description: '채팅상담 정책, 응대 흐름, 담당자 배정 기준을 확인합니다.',
    docs: [
      ['overview', '채팅상담 가이드', '채팅상담 정책과 응대 흐름을 정리합니다.'],
      ['assignment', '상담 담당자 배정', '채팅상담을 담당자에게 배정하고 누락을 줄이는 기준입니다.'],
      ['response-time', '응답 시간 관리', '고객 문의에 적절한 시간 안에 답변하는 기준입니다.'],
      ['first-response', '첫 응답 작성법', '고객 문의 목적을 확인하는 첫 메시지 기준입니다.'],
      ['price-consulting', '가격 문의 응대', '가격, 포함 항목, 추가 비용을 정확히 안내합니다.'],
      ['reservation-consulting', '예약 문의 응대', '상담에서 예약으로 이어지는 흐름을 관리합니다.'],
      ['medical-question', '의료적 질문 처리', '의료 판단이 필요한 질문을 내부 절차에 따라 연결합니다.'],
      ['privacy-in-chat', '개인정보 보호', '채팅에서 확인 가능한 정보와 제한해야 할 정보를 구분합니다.'],
      ['handoff', '상담 인수인계', '근무 교대나 담당자 변경 시 상담 맥락을 전달합니다.'],
      ['template-message', '상담 템플릿 관리', '자주 쓰는 안내 문구를 병원 기준에 맞춰 관리합니다.'],
      ['complaint', '불만 상담 대응', '고객 불만을 기록하고 필요한 부서로 연결합니다.'],
      ['after-hours', '영업시간 외 상담', '운영 시간 외 문의에 대한 자동 안내와 후속 조치 기준입니다.'],
      ['chat-quality', '상담 품질 점검', '응답 누락, 표현, 정보 정확성을 정기적으로 확인합니다.'],
      ['chat-report', '상담 리포트 확인', '상담량, 응답률, 예약 전환을 확인합니다.'],
      ['chat-faq', '채팅상담 FAQ', '상담 담당자가 자주 받는 질문을 정리합니다.'],
    ],
  },
];

const detailByDir = {
  updates: ['업데이트 전후 화면을 비교합니다.', '고객에게 보이는 문구가 바뀌었는지 확인합니다.', '직원 교육이나 내부 공지가 필요한지 판단합니다.'],
  'getting-started': ['담당자와 권한을 먼저 정리합니다.', '고객이 보는 화면과 병원이 관리하는 화면을 구분합니다.', '초기 설정 후 실제 운영 흐름을 테스트합니다.'],
  operations: ['고객에게 노출되는 병원 정보를 최신 상태로 유지합니다.', '수정 권한은 필요한 사람에게만 부여합니다.', '변경 이력과 검토일을 남깁니다.'],
  events: ['가격, 기간, 포함 항목을 명확히 씁니다.', '의료 광고 심의가 필요한 표현을 확인합니다.', '상담 담당자가 같은 조건을 안내할 수 있어야 합니다.'],
  photos: ['동의 범위와 철회 가능성을 확인합니다.', '식별 가능한 정보가 노출되지 않도록 처리합니다.', '촬영 조건이 과도하게 달라 보이지 않도록 관리합니다.'],
  ads: ['광고 목표와 예산을 먼저 정합니다.', '연결되는 이벤트와 랜딩 문서를 점검합니다.', '성과는 상담과 예약 전환까지 함께 봅니다.'],
  payments: ['결제 상태와 예약 상태를 함께 확인합니다.', '추가 비용이 있으면 사전에 안내합니다.', '환불과 변경은 병원 정책과 플랫폼 정책을 함께 확인합니다.'],
  'performance-ads': ['광고 대상 이벤트를 신중히 선택합니다.', '상담 응대 준비가 된 상태에서 집행합니다.', '성과 리포트는 다음 운영 개선에 반영합니다.'],
  reservations: ['예약 가능 시간과 실제 진료 시간이 일치해야 합니다.', '확정, 변경, 취소 기준을 직원이 동일하게 안내합니다.', '내원 전 안내를 통해 노쇼를 줄입니다.'],
  chat: ['첫 응답에서 고객 문의 목적을 확인합니다.', '의료적 판단은 내부 기준에 따라 연결합니다.', '상담 기록과 인수인계를 남깁니다.'],
};

function frontmatter(doc, category, index) {
  return `---\ntitle: ${doc[1]}\ndescription: ${doc[2]}\nsidebar_position: ${index + 1}\nowner: ${category.owner}\nreviewed_at: ${reviewedAt}\nreview_due_at: ${reviewDueAt}\n---`;
}

function body(doc, category) {
  const [slug, title, description] = doc;
  const details = detailByDir[category.dir];
  return `${frontmatter(doc, category, category.docs.findIndex((item) => item[0] === slug))}\n\n# ${title}\n\n${description} 이 문서는 자신있나를 운영하는 병원 담당자가 실제 업무 중 참고할 수 있도록 작성했습니다.\n\n## 먼저 확인할 것\n\n- ${details[0]}\n- ${details[1]}\n- ${details[2]}\n\n## 운영 절차\n\n1. 현재 파트너센터 설정과 병원 내부 기준을 확인합니다.\n2. 고객에게 노출되는 정보가 정확한지 검토합니다.\n3. 담당 부서와 수정 권한자를 확인합니다.\n4. 변경이 필요한 경우 CMS에서 문서를 수정하고 검토일을 갱신합니다.\n5. 변경 후 상담, 예약, 결제 등 연결된 업무에 같은 기준이 반영되었는지 확인합니다.\n\n## 담당자 안내\n\n이 문서의 담당 부서는 ${category.owner}입니다. 내용이 실제 운영과 다르거나 고객 안내에 영향을 주는 경우 담당 부서 확인 후 수정합니다.\n\n## 주의사항\n\n- 의료적 판단, 치료 효과, 가격 조건은 병원 내부 승인 후 안내합니다.\n- 환자 개인정보나 식별 가능한 사례는 문서에 입력하지 않습니다.\n- 고객에게 보이는 표현은 과장되거나 오해를 만들 수 있는 문구를 피합니다.\n\n## CMS 수정 팁\n\n문서를 수정할 때는 제목, 요약, 담당 부서, 마지막 검토일을 함께 확인하세요. 새 문서를 추가하면 사이드바 순서를 지정해 카테고리 안에서 원하는 위치에 배치할 수 있습니다.\n`;
}

function writeJson(filePath, value) {
  mkdirSync(dirname(filePath), {recursive: true});
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

rmSync(join(root, 'docs'), {recursive: true, force: true});

for (const category of categories) {
  const categoryDir = join(root, 'docs', category.dir);
  mkdirSync(categoryDir, {recursive: true});
  writeJson(join(categoryDir, '_category_.json'), {
    label: category.label,
    position: category.position,
  });

  category.docs.forEach((doc, index) => {
    const filePath = join(categoryDir, `${doc[0]}.md`);
    writeFileSync(filePath, body(doc, category, index), 'utf8');
  });
}

const homePath = join(root, 'src', 'data', 'home.json');
writeJson(homePath, {
  banners: [
    {
      image: '/img/docusaurus-social-card.jpg',
      title: '자신있나 병원향 이용 가이드',
      description: '자신있나를 운영하는 병원 담당자가 필요한 설정, 운영, 상담, 예약, 결제 가이드를 빠르게 확인할 수 있어요.',
      searchPlaceholder: '가이드 제목, 내용',
      buttonText: '가이드 보기',
      buttonLink: '/docs/getting-started/overview',
    },
  ],
  categories: categories.map((category) => ({
    title: category.label,
    description: category.description,
    link: `/docs/${category.dir}/overview`,
    guideCount: category.docs.length,
  })),
});

console.log(`Seeded ${categories.reduce((sum, category) => sum + category.docs.length, 0)} docs.`);
