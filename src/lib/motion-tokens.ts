/** Shared timing for word-by-word headline entrances. Values are seconds. */
export const motionTokens = {
  duration: { considered: 0.65 },
  stagger: { word: 0.07 },
  blur: { text: 6, soft: 3 },
} as const;
