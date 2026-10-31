import { Stack } from 'expo-router';

import { useStackOptions } from '@/theme/useStackOptions';

export default function AuthLayout() {
  const options = useStackOptions();
  return <Stack screenOptions={{ ...options, headerShown: true, title: '' }} />;
}
