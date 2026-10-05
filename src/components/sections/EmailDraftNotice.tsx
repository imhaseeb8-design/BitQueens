import { mailboxes } from '@/content/site';
import styles from '@/components/ui/Form.module.css';

export function EmailDraftNotice({onBack}:{onBack:()=>void}) {
  return <div className={styles.success} role="status"><h3 className={styles.successTitle}>Continue in your email app.</h3><p className={styles.successBody}>Your details have been prepared as an email draft. Review it and send it to complete your request.</p><p className={styles.successNote}>Nothing is sent automatically. If your email app didn’t open, write to <a href={`mailto:${mailboxes.general}`}>{mailboxes.general}</a>.</p><button type="button" className={styles.submit} onClick={onBack}>Back to your details</button></div>;
}
