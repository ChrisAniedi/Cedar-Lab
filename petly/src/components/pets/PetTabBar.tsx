import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView } from 'react-native';

import { Txt } from '../ui/Txt';

export const PET_TABS = ['overview', 'health', 'care', 'records', 'documents', 'wellness'] as const;
export type PetTab = (typeof PET_TABS)[number];

export function PetTabBar({ value, onChange }: { value: PetTab; onChange: (t: PetTab) => void }) {
  const { t } = useTranslation();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-1 rounded-field bg-surface-muted p-1" accessibilityRole="tablist">
      {PET_TABS.map((tab) => {
        const selected = tab === value;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            className={`min-h-[40px] justify-center rounded-lg px-4 ${selected ? 'bg-surface' : ''}`}
          >
            <Txt variant="callout" tone={selected ? 'textPrimary' : 'textSecondary'} weight={selected ? 'semibold' : 'medium'}>
              {t(`pets.tabs.${tab}`)}
            </Txt>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
