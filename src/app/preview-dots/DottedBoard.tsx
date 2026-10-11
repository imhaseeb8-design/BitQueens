'use client';

import { Dithering } from '@paper-design/shaders-react';
import { DotGradientField } from '@/components/ui/DotGradientField';
import { DottedGlobe } from '@/components/ui/DottedGlobe';
import { GlobalDotMap } from '@/components/ui/GlobalDotMap';
import {
  DotFieldMark,
  DotGlobeMark,
  NetworkMark,
  TrackMark,
} from '@/components/ui/PathMarks';
import { bodySans, displaySans } from '@/styles/fonts';
import styles from './board.module.css';

/* Every panel carries the same three labels, so the board reads as a list of
   things that can be used rather than a gallery. */
function Panel({
  name,
  call,
  used,
  note,
  height = 320,
  children,
}: {
  name: string;
  call: string;
  used: string;
  note: string;
  height?: number;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.panel}>
      <header className={styles.meta}>
        <h2 className={styles.name}>{name}</h2>
        <code className={styles.call}>{call}</code>
        <p className={styles.note}>{note}</p>
        <p className={styles.used}>{used}</p>
      </header>
      <div className={styles.stage} style={{ minHeight: height }}>
        {children}
      </div>
    </section>
  );
}

/* The marks are 3D-spun by HoverSpin off the nearest `data-spin-group`, so
   each tile is its own group and turns when the cursor is anywhere on it. */
function MarkTile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.markTile} data-spin-group>
      <div className={styles.markBox}>{children}</div>
      <span className={styles.markLabel}>{label}</span>
    </div>
  );
}

export function DottedBoard() {
  return (
    <main className={`${styles.page} ${bodySans.variable} ${displaySans.variable}`}>
      <header className={styles.head}>
        <h1 className={styles.title}>Dotted motion</h1>
        <p className={styles.lede}>
          Everything animated and dotted on the site, live. All of it shares one
          material — the same two greys-to-green, the same dot pitch and radius
          as a fraction of width — so a new section can borrow any of it and
          still look like the same page.
        </p>
      </header>

      <Panel
        name="GlobalDotMap"
        call='<GlobalDotMap pulseGrowth={0.22} />'
        used="Contact, About hero, About closing"
        note="The world map. Four gaussians roam across it and the dots under them grow and go green. Fills its element, so it needs a box with a height — aspect-ratio 2048 / 1153."
        height={380}
      >
        <div className={styles.mapBox}>
          <GlobalDotMap className={styles.fill} />
        </div>
      </Panel>

      <Panel
        name="DottedGlobe"
        call='<DottedGlobe period={150} color="#000" />'
        used="Homepage ecosystem band, Place / CTA band"
        note="Every dot lifted off globe-dotted.png back onto the sphere it was rendered from, then turned. Edge dots squash to hairlines and unsquash coming round. Stops when off screen."
        height={380}
      >
        <div className={styles.globeRow}>
          <div className={styles.globeBox}>
            <DottedGlobe className={styles.globe} period={60} />
            <span className={styles.caption}>period={'{60}'} — fast, for looking at</span>
          </div>
          <div className={styles.globeBox}>
            <DottedGlobe className={styles.globe} period={150} />
            <span className={styles.caption}>period={'{150}'} — the default</span>
          </div>
        </div>
      </Panel>

      <Panel
        name="DotGradientField — crown"
        call='<DotGradientField shape="crown" />'
        used="available"
        note="The brand mark. Blunt enough to read instantly at the dot pitch."
      >
        <DotGradientField shape="crown" className={styles.fill} />
      </Panel>

      <Panel
        name="DotGradientField — wave"
        call='<DotGradientField shape="wave" />'
        used="available"
        note="A flowing ribbon that leaves the middle open, so it sits under type."
      >
        <DotGradientField shape="wave" className={styles.fill} />
      </Panel>

      <Panel
        name="DotGradientField — wordmark"
        call='<DotGradientField shape="wordmark" />'
        used="available"
        note="BitQueens in dots. Needs a tall band — the strokes are thin."
      >
        <DotGradientField shape="wordmark" className={styles.fill} />
      </Panel>

      <Panel
        name="DotGradientField — field"
        call="<DotGradientField /> — the default, no shape prop"
        used="Academy enrol, Innovations quote"
        note="A plain radial gradient of dots. The quietest of the four; focusX / focusY / spreadX / spreadY move and size the bright middle."
      >
        <DotGradientField className={styles.fill} />
      </Panel>

      <Panel
        name="Path marks"
        call="<DotGlobeMark /> · <DotFieldMark /> · <TrackMark /> · <NetworkMark />"
        used="Homepage path steps — Join, Learn, Build"
        note="Vector recreations of the supplied artwork, painted in --mark-color. Each completes one 3D spin per hover; hover anywhere on a tile."
        height={240}
      >
        <div className={styles.marks}>
          <MarkTile label="DotGlobeMark — Join">
            <DotGlobeMark className={styles.mark} />
          </MarkTile>
          <MarkTile label="DotFieldMark — Learn">
            <DotFieldMark className={styles.mark} />
          </MarkTile>
          <MarkTile label="TrackMark">
            <TrackMark className={styles.mark} />
          </MarkTile>
          <MarkTile label="NetworkMark — Build">
            <NetworkMark className={styles.mark} />
          </MarkTile>
        </div>
      </Panel>

      <Panel
        name="Hero dithering sphere"
        call='<Dithering shape="sphere" type="4x4" size={2} colorFront="#234F3E" />'
        used="Homepage hero headline — the mark after “Built for”"
        note="Not one of ours: @paper-design/shaders-react, dithered to a dot grid. It is the only dotted mark that is a shader rather than a canvas we draw."
        height={240}
      >
        <div className={styles.ditherRow}>
          <div className={styles.ditherBox}>
            <Dithering
              speed={0.7}
              shape="sphere"
              type="4x4"
              size={2}
              scale={1}
              colorBack="#00000000"
              colorFront="#234F3E"
              className={styles.fill}
            />
          </div>
          <div className={styles.ditherBox}>
            <Dithering
              speed={0.7}
              shape="sphere"
              type="4x4"
              size={4}
              scale={1}
              colorBack="#00000000"
              colorFront="#234F3E"
              className={styles.fill}
            />
            <span className={styles.caption}>size={'{4}'} — coarser</span>
          </div>
        </div>
      </Panel>
    </main>
  );
}
