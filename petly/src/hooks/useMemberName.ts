import { useTranslation } from 'react-i18next';

import { useHousehold } from '@/stores/household';

/** Display name for a household member id ("You" for this device's person). */
export function useMemberName() {
  const { t } = useTranslation();
  const members = useHousehold((s) => s.members);
  const current = useHousehold((s) => s.currentMemberId);
  return (id: string | null | undefined) => {
    if (!id) return t('common.unassigned');
    if (id === current) return t('common.you');
    const m = members.find((x) => x.id === id);
    return m?.name || t('common.unknown');
  };
}
