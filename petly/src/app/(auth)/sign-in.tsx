import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { AuthShell } from '@/components/auth/AuthShell';
import { CloudUnavailableSheet } from '@/components/auth/CloudUnavailableSheet';
import { SocialSignIn } from '@/components/auth/SocialSignIn';
import { TextLink } from '@/components/auth/TextLink';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { collect, email, hasErrors, required } from '@/core/validation';

export default function SignIn() {
  const { t } = useTranslation();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [open, setOpen] = useState(false);
  const validate = (f: typeof form) => collect({ email: email(f.email), password: required(f.password) });

  const submit = () => {
    const e = validate(form);
    setErrors(e);
    if (!hasErrors(e)) setOpen(true);
  };

  return (
    <AuthShell title={t('auth.signInTitle')} body={t('auth.signInBody')}>
      <View className="gap-4">
        <TextField label={t('auth.email')} value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} error={errors.email} keyboardType="email-address" autoCapitalize="none" autoComplete="email" textContentType="emailAddress" />
        <TextField label={t('auth.password')} value={form.password} onChangeText={(v) => setForm({ ...form, password: v })} error={errors.password} secureTextEntry autoComplete="password" textContentType="password" />
        <Button label={t('auth.signIn')} onPress={submit} full />
        <TextLink label={t('auth.forgot')} onPress={() => router.push('/forgot-password')} />
      </View>
      <SocialSignIn />
      <TextLink label={t('auth.noAccount')} onPress={() => router.replace('/sign-up')} />
      <CloudUnavailableSheet open={open} onClose={() => setOpen(false)} />
    </AuthShell>
  );
}
