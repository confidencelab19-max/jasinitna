import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import homeData from '@site/src/data/home.json';
import {
  FiActivity,
  FiCalendar,
  FiChevronRight,
  FiCreditCard,
  FiFileText,
  FiHelpCircle,
  FiMap,
  FiMessageCircle,
  FiSearch,
  FiShield,
  FiTarget,
  FiUserCheck,
} from 'react-icons/fi';

type HomeCategory = {
  title: string;
  description: string;
  link: string;
  icon?: string;
  guideCount?: number;
};

type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  link: string;
};

type SearchGuide = {
  title: string;
  description: string;
  category: string;
  link: string;
};

const iconMap = {
  start: FiMap,
  hospital: FiUserCheck,
  events: FiCalendar,
  ads: FiActivity,
  customers: FiMessageCircle,
  appointments: FiCalendar,
  payments: FiCreditCard,
  policy: FiShield,
  faq: FiHelpCircle,
  glossary: FiFileText,
};

const requiredGuideItems: ChecklistItem[] = [
  {
    id: 'first-day',
    title: '입점 첫날 해야 할 일',
    description: '기본정보, 상담 담당자, 이벤트, 광고 시작 전 확인 순서를 잡아요.',
    link: '/docs/start/first-day',
  },
  {
    id: 'hospital',
    title: '병원 기본정보 확인해요',
    description: '주소, 전화번호, 진료시간, 상담 가능 시간을 먼저 맞춰요.',
    link: '/docs/hospital/hospital-profile',
  },
  {
    id: 'callback',
    title: '상담 담당자와 콜백 기준 정해요',
    description: '전화·채팅·콜백 요청을 누가 언제 처리할지 정해요.',
    link: '/docs/customers/phone',
  },
  {
    id: 'event',
    title: '이벤트와 가격 조건 등록해요',
    description: '가격, VAT, 옵션, 부작용 안내를 같은 기준으로 입력해요.',
    link: '/docs/events/create',
  },
  {
    id: 'reservation',
    title: '예약 가능 시간 확인해요',
    description: '예약 요청, 확정, 변경, 휴진일을 실제 일정과 맞춰요.',
    link: '/docs/appointments/overview',
  },
  {
    id: 'ads',
    title: '광고 잔고와 랜딩 확인해요',
    description: '광고 시작 전 승인된 이벤트, 잔고, 일예산을 확인해요.',
    link: '/docs/ads/apply',
  },
  {
    id: 'medical-ad',
    title: '의료광고 기준 확인해요',
    description: '가격, 이미지, 부작용, 환자 유인 금지 기준을 확인해요.',
    link: '/docs/policy/medical-ad-law',
  },
];

const onboardingItems = requiredGuideItems.filter((item) => item.id !== 'medical-ad' && item.id !== 'ads');

function pickIcon(category: HomeCategory) {
  const key = category.icon as keyof typeof iconMap;
  return key && iconMap[key] ? iconMap[key] : FiFileText;
}

function RequiredGuidePanel() {
  return (
    <div className="hero-guide-panel">
      <div className="hero-guide-panel__head">
        <strong>필수 확인 문서</strong>
        <span>읽으면 자동으로 완료돼요</span>
      </div>
      <div className="hero-guide-panel__items">
        {requiredGuideItems.map((item, index) => (
          <Link className="required-guide-row" to={item.link} key={item.id}>
            <em>{String(index + 1).padStart(2, '0')}</em>
            <span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </span>
            <FiChevronRight />
          </Link>
        ))}
      </div>
    </div>
  );
}

function normalizeSearch(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function SearchResults({query}: {query: string}) {
  const guides = (homeData.guides || []) as SearchGuide[];
  const normalizedQuery = normalizeSearch(query);

  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return guides
      .filter((guide) =>
        `${guide.title} ${guide.description} ${guide.category}`.toLowerCase().includes(normalizedQuery),
      )
      .slice(0, 8);
  }, [guides, normalizedQuery]);

  if (!normalizedQuery) return null;

  return (
    <div className="guide-search-results" aria-live="polite">
      {results.length > 0 ? (
        results.map((guide) => (
          <Link className="guide-search-result" to={guide.link} key={guide.link}>
            <span>{guide.category}</span>
            <strong>{guide.title}</strong>
            <small>{guide.description}</small>
          </Link>
        ))
      ) : (
        <div className="guide-search-empty">검색 결과가 없어요. 다른 키워드로 다시 검색해 주세요.</div>
      )}
    </div>
  );
}

function HeroSection({query, setQuery}: {query: string; setQuery: (value: string) => void}) {
  const banner = homeData.banners?.[0] || {};

  return (
    <section className="guide-hero">
      <div className="home-shell guide-hero__inner">
        <div className="guide-hero__copy">
          <h1>{banner.title || '자신있나 파트너 가이드'}</h1>
          <p>{banner.description || '입점 후 병원 정보, 이벤트, 광고, 상담, 예약을 어떤 순서로 관리해야 하는지 바로 확인할 수 있어요.'}</p>
          <div className="guide-search">
            <FiSearch aria-hidden="true" />
            <input
              type="text"
              placeholder={banner.searchPlaceholder || '병원 정보, 이벤트 검수, 상담 관리, 광고 잔고 검색'}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <SearchResults query={query} />
          <div className="guide-hero__actions">
            <Link className="button-primary" to={banner.buttonLink || '/docs/start/first-day'}>
              {banner.buttonText || '입점 첫날 가이드'}
            </Link>
            <Link className="button-secondary" to="/docs/events/medical-review">의료광고 검수 기준</Link>
          </div>
        </div>
        <RequiredGuidePanel />
      </div>
    </section>
  );
}

function OnboardingFlowSection() {
  return (
    <section className="guide-section">
      <div className="home-shell">
        <div className="section-title-row">
          <h2>처음 입점하면 이 순서로 진행해요</h2>
          <p>왼쪽부터 순서대로 확인하면 병원 노출, 상담 접수, 광고 운영까지 빠짐없이 시작할 수 있어요.</p>
        </div>
        <div className="onboarding-flow">
          {onboardingItems.map((item, index) => (
            <Link className="flow-step" to={item.link} key={item.id}>
              <div className="flow-step__number">{String(index + 1).padStart(2, '0')}</div>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
              <FiChevronRight />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkPreviewSection() {
  const items = [
    {
      title: '상담 관리',
      description: '새 문의, 콜백 필요, 예약 연결 상태를 놓치지 않게 봐요.',
      link: '/docs/customers/phone',
      icon: FiMessageCircle,
      rows: ['새 전화상담 3건', '콜백 필요 1건', '예약 연결 확인'],
    },
    {
      title: '이벤트 검수',
      description: '가격, VAT, 옵션, 부작용 안내가 서로 맞는지 확인해요.',
      link: '/docs/events/medical-review',
      icon: FiShield,
      rows: ['가격·VAT 일치', '부작용 안내 포함', '이미지 문구 확인'],
    },
    {
      title: '광고 운영',
      description: '광고잔고, 일예산, 랜딩 이벤트 상태를 먼저 확인해요.',
      link: '/docs/ads/products',
      icon: FiTarget,
      rows: ['잔고 정상', '일예산 확인', '랜딩 승인 상태'],
    },
    {
      title: '예약 관리',
      description: '예약 요청, 확정, 변경, 취소 상태를 같은 기준으로 정리해요.',
      link: '/docs/appointments/overview',
      icon: FiCalendar,
      rows: ['예약요청', '확정 대기', '방문완료'],
    },
  ];

  return (
    <section className="guide-section guide-section--tight">
      <div className="home-shell">
        <div className="section-title-row">
          <h2>어떤 화면에서 무엇을 봐야 하는지 확인해요</h2>
          <p>각 업무 카드에서 바로 관련 가이드로 이동할 수 있어요.</p>
        </div>
        <div className="work-preview-grid">
          {items.map((item) => (
            <Link className="work-preview-card" to={item.link} key={item.title}>
              <div className="work-preview-card__head">
                {React.createElement(item.icon)}
                <strong>{item.title}</strong>
                <FiChevronRight />
              </div>
              <p>{item.description}</p>
              <div className="mini-screen" aria-hidden="true">
                {item.rows.map((row, index) => (
                  <div className="mini-screen__row" key={row}>
                    <span className={index === 0 ? 'is-red' : ''} />
                    <em>{row}</em>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategorySection({query}: {query: string}) {
  const categories = homeData.categories as HomeCategory[];
  const normalizedQuery = normalizeSearch(query);
  const filteredCategories = useMemo(
    () =>
      categories.filter((cat) => {
        if (!normalizedQuery) return true;
        return `${cat.title} ${cat.description}`.toLowerCase().includes(normalizedQuery);
      }),
    [categories, normalizedQuery],
  );

  return (
    <section className="guide-section guide-section--last">
      <div className="home-shell">
        <div className="section-title-row">
          <h2>전체 가이드</h2>
          <p>업무별로 필요한 문서를 열어 확인해요.</p>
        </div>
        <div className="category-grid">
          {filteredCategories.map((cat) => (
            <Link to={cat.link} className="category-card" key={cat.title}>
              <div className="category-card__icon" aria-hidden="true">
                {React.createElement(pickIcon(cat))}
              </div>
              <div className="category-card__body">
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <span>{cat.guideCount || 0}개 문서</span>
              </div>
              <FiChevronRight className="card-arrow" />
            </Link>
          ))}
        </div>
        {filteredCategories.length === 0 && (
          <div className="category-empty">검색 결과가 없어요. 다른 키워드로 다시 검색해 주세요.</div>
        )}
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const [query, setQuery] = useState('');

  return (
    <Layout title={siteConfig.title} description="자신있나 병원 담당자용 파트너 가이드">
      <main>
        <HeroSection query={query} setQuery={setQuery} />
        <OnboardingFlowSection />
        <WorkPreviewSection />
        <CategorySection query={query} />
      </main>
    </Layout>
  );
}
