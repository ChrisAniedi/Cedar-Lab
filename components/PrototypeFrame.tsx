import styles from './PrototypeFrame.module.css';

/**
 * Renders a self-contained HTML prototype as a non-interactive screenshot,
 * isolated in an iframe via `srcDoc` (so it adds no browser-history entry and
 * its global styles/scripts never leak into the site).
 */
export default function PrototypeFrame({ html, title }: { html: string; title: string }) {
  return (
    <div className={styles.frame}>
      <iframe srcDoc={html} title={title} scrolling="no" tabIndex={-1} aria-hidden loading="lazy" />
    </div>
  );
}
