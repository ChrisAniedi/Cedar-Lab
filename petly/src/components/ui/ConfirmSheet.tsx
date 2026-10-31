import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Button } from './Button';
import { Sheet } from './Sheet';
import { Txt } from './Txt';

interface ConfirmSheetProps {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmSheet({ open, title, body, confirmLabel, destructive, onConfirm, onClose }: ConfirmSheetProps) {
  const { t } = useTranslation();
  return (
    <Sheet open={open} onClose={onClose} title={title}>
      <Txt tone="textSecondary">{body}</Txt>
      <View className="gap-2">
        <Button
          label={confirmLabel}
          variant={destructive ? 'danger' : 'primary'}
          onPress={() => {
            onConfirm();
            onClose();
          }}
          full
        />
        <Button label={t('common.cancel')} variant="secondary" onPress={onClose} full />
      </View>
    </Sheet>
  );
}
