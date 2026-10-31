import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { Icon } from './Icon';
import { TextField } from './TextField';
import { Txt } from './Txt';

/** Free-text list editor for allergies, conditions, etc. */
export function TagInput({ label, placeholder, values, onChange }: { label: string; placeholder: string; values: string[]; onChange: (v: string[]) => void }) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (v && !values.includes(v)) onChange([...values, v]);
    setDraft('');
  };
  return (
    <View className="gap-2">
      <TextField label={label} placeholder={placeholder} value={draft} onChangeText={setDraft} onSubmitEditing={add} returnKeyType="done" blurOnSubmit={false} optional />
      {draft.trim() ? (
        <Pressable onPress={add} accessibilityRole="button" className="min-h-[40px] flex-row items-center gap-1.5 self-start">
          <Icon name="add-circle-outline" tone="textPrimary" size={18} />
          <Txt variant="callout" tone="textPrimary">
            {t('common.add')}
          </Txt>
        </Pressable>
      ) : null}
      <View className="flex-row flex-wrap gap-2">
        {values.map((v) => (
          <Pressable
            key={v}
            onPress={() => onChange(values.filter((x) => x !== v))}
            accessibilityRole="button"
            accessibilityLabel={t('a11y.removeItem', { value: v })}
            className="min-h-[36px] flex-row items-center gap-1.5 rounded-full bg-primary-soft px-3"
          >
            <Txt variant="callout" tone="textPrimary">
              {v}
            </Txt>
            <Icon name="close" tone="textPrimary" size={14} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
