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
import { collect, email, hasErrors, matches, password, required } from '@/core/validation';

export default function SignUp() {
  const { t } = useTranslation();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [open, setOpen] = useState(false);
  const validate = (f: typeof form) =>
    collect({ name: required(f.name), email: email(f.email), password: password(f.password), confirm: f.confirm ? matches(f.password, f.confirm) : required(f.confirm) });

  const submit = () => {
    const e = validate(form);
    setErrors(e);
    if (!hasErrors(e)) setOpen(true);
  };

  return (
    <AuthShell title={t('auth.signUpTitle')} body={t('auth.signUpBody')}>
      <View className="gap-4">
        <TextField label={t('auth.name')} value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} error={errors.name} autoComplete="name" textContentType="name" />
        <TextField label={t('auth.email')} value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} error={errors.email} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
        <TextField label={t('auth.password')} value={form.password} onChangeText={(v) => setForm({ ...form, password: v })} error={errors.password} secureTextEntry hint={t('errors.passwordShort')} textContentType="newPassword" />
        <TextField label={t('auth.confirmPassword')} value={form.confirm} onChangeText={(v) => setForm({ ...form, confirm: v })} error={errors.confirm} secureTextEntry textContentType="newPassword" />
        <Button label={t('auth.signUp')} onPress={submit} full />
      </View>
      <SocialSignIn />
      <TextLink label={t('auth.haveAccount')} onPress={() => router.replace('/sign-in')} />
      <TextLink label={t('auth.verifyEmail')} onPress={() => router.push('/verify-email')} />
      <CloudUnavailableSheet open={open} onClose={() => setOpen(false)} />
    </AuthShell>
  );
}
