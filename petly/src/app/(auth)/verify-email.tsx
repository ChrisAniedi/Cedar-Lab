import { useTranslation } from 'react-i18next';

import { AuthShell } from '@/components/auth/AuthShell';
import { ComingSoonRow } from '@/components/ui/ComingSoonRow';

/** Verification needs cloud accounts — shown honestly as not yet available. */
export default function VerifyEmail() {
  const { t } = useTranslation();
  return (
    <AuthShell title={t('auth.verifyTitle')} body={t('auth.verifyBody')}>
      <ComingSoonRow icon="mail-outline" label={t('auth.verifyEmail')} body={t('auth.cloudUnavailableBody')} />
    </AuthShell>
  );
}
