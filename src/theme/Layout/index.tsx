import React, {type ComponentProps, useEffect, useMemo, useState} from 'react';
import OriginalLayout from '@theme-original/Layout';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';

const STORAGE_KEY = 'jasin-auto-onboarding';

const requiredDocs = [
  {
    path: '/docs/start/first-day',
    label: '첫날 설정',
  },
  {
    path: '/docs/hospital/hospital-profile',
    label: '병원 정보',
  },
  {
    path: '/docs/customers/phone',
    label: '상담 기준',
  },
  {
    path: '/docs/events/create',
    label: '이벤트 등록',
  },
  {
    path: '/docs/appointments/overview',
    label: '예약 관리',
  },
  {
    path: '/docs/ads/apply',
    label: '광고 시작',
  },
  {
    path: '/docs/policy/medical-ad-law',
    label: '의료광고',
  },
];

function normalizePath(pathname: string) {
  return pathname.replace(/\/$/, '') || '/';
}

function readProgress() {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}') as Record<string, boolean>;
  } catch {
    return {};
  }
}

function OnboardingTracker() {
  const location = useLocation();
  const path = normalizePath(location.pathname);
  const shouldShow = path === '/' || path.startsWith('/docs/');
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!shouldShow) return;
    setProgress(readProgress());
  }, [shouldShow]);

  useEffect(() => {
    if (!shouldShow) return;
    const current = requiredDocs.find((doc) => doc.path === path);
    if (!current) return;

    let done = false;
    const markComplete = () => {
      if (done) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewport = window.innerHeight;
      const fullHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const reachedBottom = scrollTop + viewport >= fullHeight * 0.86;
      const shortPage = fullHeight <= viewport + 160;

      if (!reachedBottom && !shortPage) return;
      done = true;

      setProgress((prev) => {
        if (prev[current.path]) return prev;
        const next = {...prev, [current.path]: true};
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    };

    const timer = window.setTimeout(markComplete, 900);
    window.addEventListener('scroll', markComplete, {passive: true});
    window.addEventListener('resize', markComplete);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', markComplete);
      window.removeEventListener('resize', markComplete);
    };
  }, [path, shouldShow]);

  const completed = useMemo(
    () => requiredDocs.filter((doc) => progress[doc.path]).length,
    [progress],
  );
  const percent = Math.round((completed / requiredDocs.length) * 100);

  if (!shouldShow) return null;

  return (
    <div className="onboarding-tracker" aria-label="입점 진행 상태">
      <div className="onboarding-tracker__inner">
        <div className="onboarding-tracker__meta">
          <strong>입점 진행</strong>
          <span>필수 가이드를 끝까지 확인하면 자동 완료돼요.</span>
          <em>{completed}/{requiredDocs.length}</em>
        </div>
        <div className="onboarding-tracker__bar" aria-label={`입점 진행률 ${percent}%`}>
          <span style={{width: `${percent}%`}} />
        </div>
        <div className="onboarding-tracker__steps">
          {requiredDocs.map((doc) => (
            <Link
              className={progress[doc.path] ? 'is-done' : ''}
              to={doc.path}
              key={doc.path}>
              {doc.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Layout(props: ComponentProps<typeof OriginalLayout>) {
  return (
    <OriginalLayout {...props}>
      <OnboardingTracker />
      {props.children}
    </OriginalLayout>
  );
}
