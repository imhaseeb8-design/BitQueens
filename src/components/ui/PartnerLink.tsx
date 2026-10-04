'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';
import { useAudience } from '@/components/audience/AudienceProvider';

/**
 * A link to the partner view of the homepage's ecosystem accordion.
 *
 * The accordion shows the four partner kinds only on the partner side of the
 * hero's switch, so a plain anchor would land a learner-side reader on the
 * four divisions instead. This flips the switch first, then navigates, then
 * scrolls once the accordion has re-rendered.
 */
export function PartnerLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setAudience } = useAudience();
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setAudience('partner');
    router.push('/#ecosystem');
    window.setTimeout(() => {
      document
        .getElementById('ecosystem')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }

  return (
    <Link
      href="/#ecosystem"
      scroll={false}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
