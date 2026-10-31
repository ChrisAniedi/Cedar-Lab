import { useTranslation } from 'react-i18next';

import { useMemberName } from '@/hooks/useMemberName';
import { useHousehold } from '@/stores/household';

import { FieldLabel } from '../ui/FieldLabel';
import { OptionChips } from '../ui/OptionChips';

export function MemberPicker({ label, value, onChange }: { label: string; value: string | null; onChange: (id: string | null) => void }) {
  const { t } = useTranslation();
  const members = useHousehold((s) => s.members).filter((m) => m.role !== 'viewer');
  const name = useMemberName();
  return (
    <FieldLabel label={label}>
      <OptionChips
        scroll
        options={[{ value: 'none', label: t('common.unassigned') }, ...members.map((m) => ({ value: m.id, label: name(m.id) }))]}
        value={value ?? 'none'}
        onChange={(v) => onChange(v === 'none' ? null : v)}
      />
    </FieldLabel>
  );
}
