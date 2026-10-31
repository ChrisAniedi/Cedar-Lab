import { Redirect } from 'expo-router';

import { useSettings } from '@/stores/settings';

export default function Index() {
  const onboarded = useSettings((s) => s.onboardingComplete);
  return <Redirect href={onboarded ? '/(tabs)' : '/welcome'} />;
}
