import { useTranslation } from 'react-i18next';

import type { PetHealthStatus } from '@/core/health';

import { Badge } from '../ui/Badge';

const MAP = {
  good: { tone: 'success', icon: 'checkmark-circle' },
  upcoming: { tone: 'warning', icon: 'time' },
  attention: { tone: 'danger', icon: 'alert-circle' },
} as const;

export function HealthStatusBadge({ status }: { status: PetHealthStatus }) {
  const { t } = useTranslation();
  return <Badge label={t(`healthStatus.${status}`)} tone={MAP[status].tone} icon={MAP[status].icon} />;
}
