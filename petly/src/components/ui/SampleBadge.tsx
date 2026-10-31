import { useTranslation } from 'react-i18next';

import { Badge } from './Badge';

/** Marks sample records so they're never mistaken for real data. */
export function SampleBadge({ show = true }: { show?: boolean }) {
  const { t } = useTranslation();
  if (!show) return null;
  return <Badge label={t('sample.badge')} tone="accent" icon="flask-outline" />;
}
