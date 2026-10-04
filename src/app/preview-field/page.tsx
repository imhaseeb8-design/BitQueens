import type { Metadata } from 'next';
import { DotGradientField } from '@/components/ui/DotGradientField';

/**
 * The dotted-motion reference board.
 *
 * Kept, not temporary: this is where the four shapes of DotGradientField are
 * looked at side by side when one is being picked for a section. Each panel
 * is labelled with the exact prop that produces it.
 */
export const metadata: Metadata = {
  title: 'Dot field shapes',
  robots: { index: false, follow: false },
};

const SHAPES = [
  {
    name: 'Crown',
    prop: 'shape="crown"',
    note: 'The brand mark. Blunt enough to read instantly at the dot pitch.',
  },
  {
    name: 'Wave',
    prop: 'shape="wave"',
    note: 'A flowing ribbon. Leaves the middle open, so it sits under type.',
  },
  {
    name: 'Wordmark',
    prop: 'shape="wordmark"',
    note: 'BitQueens in dots. Needs a tall band — the strokes are thin.',
  },
  {
    name: 'Field',
    prop: 'the default — no shape prop',
    note: 'A plain radial gradient. The quietest of the four.',
  },
] as const;

const fill: React.CSSProperties = { position: 'absolute', inset: 0 };

export default function PreviewField() {
  return (
    <main style={{ background: 'var(--bq-canvas)', paddingBottom: 60 }}>
      {SHAPES.map((s) => (
        <div
          key={s.name}
          style={{
            position: 'relative',
            height: 420,
            background: 'var(--bq-canvas)',
            overflow: 'hidden',
            borderBottom: '1px solid var(--bq-ink-14)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 18,
              left: 24,
              zIndex: 2,
              maxWidth: 380,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--bq-neue-montreal), sans-serif',
                fontSize: 22,
                letterSpacing: '-0.02em',
                color: 'var(--bq-green-deep)',
              }}
            >
              {s.name}
            </p>
            <p
              style={{
                margin: '6px 0 0',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 12,
                color: 'var(--bq-blue-slate)',
              }}
            >
              {s.prop}
            </p>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: 13,
                lineHeight: 1.5,
                color: 'var(--bq-ink-50)',
              }}
            >
              {s.note}
            </p>
          </div>
          <DotGradientField
            style={fill}
            shape={s.name.toLowerCase() as 'crown' | 'wave' | 'wordmark' | 'field'}
          />
        </div>
      ))}
    </main>
  );
}
