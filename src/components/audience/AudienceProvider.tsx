'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Audience = 'learn' | 'partner';

interface AudienceValue {
  audience: Audience;
  setAudience: (next: Audience) => void;
}

const AudienceContext = createContext<AudienceValue | null>(null);

/**
 * Who the reader says they are.
 *
 * The hero's switch sets it and the page reads it, so a section further down
 * can answer the same question the hero asked. It lives in a provider rather
 * than in the hero's own state because the two are in different branches of
 * the tree — the provider is the only place they meet.
 *
 * Server Components can sit inside this: they arrive as `children`, already
 * rendered.
 */
export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>('learn');
  const value = useMemo(() => ({ audience, setAudience }), [audience]);

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>;
}

/**
 * Renders its children only for one side of the switch.
 *
 * The children are still Server Components — they arrive already rendered
 * and this only decides whether to mount them — so a section can be dropped
 * for one audience without being rewritten as a client component.
 */
export function AudienceOnly({
  audience,
  children,
}: {
  audience: Audience;
  children: ReactNode;
}) {
  return useAudience().audience === audience ? <>{children}</> : null;
}

export function useAudience(): AudienceValue {
  const value = useContext(AudienceContext);
  if (!value) {
    throw new Error('useAudience must be used inside an AudienceProvider');
  }
  return value;
}
