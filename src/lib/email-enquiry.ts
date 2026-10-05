import { mailboxes } from '@/content/site';

/** Interim email handoff. This prepares a message; it never sends one. */
export function prepareEmailEnquiry(subject:string, fields:Record<string,string>) {
  const body = Object.entries(fields).map(([label,value]) => `${label}: ${value.trim() || 'Not specified'}`).join('\n\n');
  const href = `mailto:${mailboxes.general}?subject=${encodeURIComponent(`BitQueens — ${subject}`)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  return href;
}
