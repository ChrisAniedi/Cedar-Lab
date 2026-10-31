import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { formatBytes } from '@/core/format';
import type { DocumentCategory, PetDocument } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { usePetLookup } from '@/hooks/usePetLookup';

import { Icon, type IconName } from '../ui/Icon';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';

export const DOC_ICON: Record<DocumentCategory, IconName> = {
  vaccination: 'shield-checkmark-outline',
  prescription: 'medkit-outline',
  lab: 'flask-outline',
  insurance: 'umbrella-outline',
  adoption: 'heart-outline',
  invoice: 'receipt-outline',
  other: 'document-text-outline',
};

export function DocumentCard({ doc, onPress }: { doc: PetDocument; onPress: () => void }) {
  const { t } = useTranslation();
  const f = useFormat();
  const pet = usePetLookup()(doc.petId);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${doc.title}, ${t(`documents.categories.${doc.category}`)}, ${pet?.name ?? ''}`}
      className="flex-row items-center gap-3 rounded-field border border-border bg-surface px-3 py-3 active:opacity-80"
    >
      <View className="h-11 w-11 items-center justify-center rounded-field bg-primary-soft">
        <Icon name={DOC_ICON[doc.category]} tone="textPrimary" />
      </View>
      <View className="flex-1 gap-0.5">
        <View className="flex-row flex-wrap items-center gap-2">
          <Txt variant="callout" weight="semibold" numberOfLines={1}>
            {doc.title}
          </Txt>
          <SampleBadge show={doc.isSample} />
        </View>
        <Txt variant="caption" tone="textSecondary" numberOfLines={1}>
          {[pet?.name, t(`documents.categories.${doc.category}`), f.date(doc.date), doc.sizeBytes ? formatBytes(doc.sizeBytes) : null].filter(Boolean).join(' · ')}
        </Txt>
      </View>
      <Icon name={doc.uri ? 'open-outline' : 'document-outline'} tone="textSecondary" size={18} />
    </Pressable>
  );
}
