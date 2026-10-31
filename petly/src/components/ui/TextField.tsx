import { useTranslation } from 'react-i18next';
import { TextInput, View, type TextInputProps } from 'react-native';

import type { FieldError } from '@/core/validation';
import { fontFamily } from '@/theme/fonts';
import { useTheme } from '@/theme/useTheme';

import { Txt } from './Txt';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: FieldError | null;
  hint?: string;
  optional?: boolean;
}

/** Input text and placeholder colours are set in JS, like <Txt>. */
export function TextField({ label, error, hint, optional, multiline, ...input }: TextFieldProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View className="gap-1.5">
      <View className="flex-row items-baseline gap-1.5">
        <Txt variant="label">{label}</Txt>
        {optional ? (
          <Txt variant="caption" tone="textSecondary">
            {t('common.optional')}
          </Txt>
        ) : null}
      </View>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={hint}
        placeholderTextColor={colors.textSecondary}
        selectionColor={colors.primary}
        multiline={multiline}
        className={`rounded-field border bg-surface-muted px-3.5 ${multiline ? 'min-h-[96px] py-3' : 'min-h-[48px]'} ${error ? 'border-danger' : 'border-border'}`}
        style={{ color: colors.text, fontFamily: fontFamily.regular, fontSize: 15, textAlignVertical: multiline ? 'top' : 'center' }}
        {...input}
      />
      {error ? (
        <Txt variant="caption" tone="dangerInk" accessibilityLiveRegion="polite" accessibilityRole="alert">
          {t(`errors.${error}`)}
        </Txt>
      ) : hint ? (
        <Txt variant="caption" tone="textSecondary">
          {hint}
        </Txt>
      ) : null}
    </View>
  );
}
