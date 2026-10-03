'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';
import { useAudience } from '@/components/audience/AudienceProvider';

/**
 * A link to the homepage's Partners section.
 *
 * The section only renders on the partner side of the hero's audience
 * switch, so a plain anchor would land on nothing for a learner-side reader.
 * This flips the switch first, then navigates, then scrolls once the section
 * has mounted.
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
    router.push('/#partners');
    window.setTimeout(() => {
      document
        .getElementById('partners')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }

  return (
    <Link
      href="/#partners"
      scroll={false}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
