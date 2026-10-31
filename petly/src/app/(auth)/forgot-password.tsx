import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { AuthShell } from '@/components/auth/AuthShell';
import { CloudUnavailableSheet } from '@/components/auth/CloudUnavailableSheet';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { email } from '@/core/validation';
import type { FieldError } from '@/core/validation';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [error, setError] = useState<FieldError | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <AuthShell title={t('auth.forgotTitle')} body={t('auth.forgotBody')}>
      <View className="gap-4">
        <TextField label={t('auth.email')} value={value} onChangeText={setValue} error={error} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
        <Button
          label={t('auth.sendLink')}
          full
          onPress={() => {
            const e = email(value);
            setError(e);
            if (!e) setOpen(true);
          }}
        />
      </View>
      <CloudUnavailableSheet open={open} onClose={() => setOpen(false)} />
    </AuthShell>
  );
}
