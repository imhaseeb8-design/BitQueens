import localFont from 'next/font/local';

// Apply these variables as each section is migrated to the new typography.
export const neueMontreal = localFont({
  src: '../../public/fonts/NeueMontreal-Regular.otf',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--bq-neue-montreal',
});

export const instrumentSerif = localFont({
  src: '../../public/fonts/InstrumentSerif-Regular.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--bq-instrument-serif',
});

export const interTight = localFont({
  src: '../../public/fonts/InterTight-Regular.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--bq-inter-tight',
});
