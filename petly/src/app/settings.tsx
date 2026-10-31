import Constants from 'expo-constants';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ComingSoonRow } from '@/components/ui/ComingSoonRow';
import { ConfirmSheet } from '@/components/ui/ConfirmSheet';
import { Divider } from '@/components/ui/Divider';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { ListRow } from '@/components/ui/ListRow';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { SwitchRow } from '@/components/ui/SwitchRow';
import { TextField } from '@/components/ui/TextField';
import { Txt } from '@/components/ui/Txt';
import { CURRENCIES } from '@/core/types';
import { ensurePermission } from '@/lib/notifications';
import { deleteSecret, getSecret, SECURE_KEYS, setSecret } from '@/lib/secure';
import { shareJsonFile } from '@/lib/share';
import { useHousehold } from '@/stores/household';
import { eraseAllData, exportAllData, loadSampleData, removeSampleData } from '@/stores/lifecycle';
import { useSettings } from '@/stores/settings';
import { toast } from '@/stores/toast';

const LEADS = ['0', '15', '60', '1440'] as const;

export default function Settings() {
  const { t } = useTranslation();
  const router = useRouter();
  const s = useSettings();
  const [lock, setLock] = useState(false);
  const [lockAvailable, setLockAvailable] = useState(false);
  const [erase, setErase] = useState(false);

  useEffect(() => {
    getSecret(SECURE_KEYS.appLock).then((v) => setLock(v === '1'));
    if (Platform.OS !== 'web') {
      Promise.all([LocalAuthentication.hasHardwareAsync(), LocalAuthentication.isEnrolledAsync()]).then(([h, e]) => setLockAvailable(h && e));
    }
  }, []);

  const toggleLock = async (on: boolean) => {
    const res = await LocalAuthentication.authenticateAsync({ promptMessage: t('lock.prompt') });
    if (!res.success) return;
    if (on) await setSecret(SECURE_KEYS.appLock, '1');
    else await deleteSecret(SECURE_KEYS.appLock);
    setLock(on);
  };

  return (
    <Screen edges={[]} width="form">
      <SectionHeader title={t('settings.profile')} />
      <Card>
        <View className="gap-4">
          <TextField
            label={t('settings.name')}
            value={s.name}
            onChangeText={(name) => {
              s.set({ name });
              useHousehold.getState().setSelfName(name);
            }}
          />
          <TextField label={t('settings.country')} value={s.country} onChangeText={(country) => s.set({ country: country.toUpperCase() })} autoCapitalize="characters" maxLength={2} />
        </View>
      </Card>

      <SectionHeader title={t('settings.household')} />
      <Card>
        <ListRow icon="people-outline" title={t('team.title')} onPress={() => router.push('/care-team')} />
      </Card>

      <SectionHeader title={t('settings.appearance')} />
      <Card>
        <FieldLabel label={t('settings.theme.label')}>
          <SegmentedControl options={(['system', 'light', 'dark'] as const).map((v) => ({ value: v, label: t(`settings.theme.${v}`) }))} value={s.theme} onChange={(theme) => s.set({ theme })} />
        </FieldLabel>
      </Card>

      <SectionHeader title={t('settings.regional')} />
      <Card>
        <View className="gap-4">
          <FieldLabel label={t('settings.units.label')}>
            <SegmentedControl options={(['metric', 'imperial'] as const).map((v) => ({ value: v, label: t(`settings.units.${v}`) }))} value={s.units} onChange={(units) => s.set({ units })} />
          </FieldLabel>
          <FieldLabel label={t('settings.timeFormat.label')}>
            <SegmentedControl options={(['12h', '24h'] as const).map((v) => ({ value: v, label: t(`settings.timeFormat.${v}`) }))} value={s.timeFormat} onChange={(timeFormat) => s.set({ timeFormat })} />
          </FieldLabel>
          <FieldLabel label={t('settings.currency')}>
            <OptionChips options={CURRENCIES.map((c) => ({ value: c, label: c }))} value={s.currency} onChange={(currency) => s.set({ currency })} />
          </FieldLabel>
          <ComingSoonRow icon="language-outline" label={t('settings.language')} body={t('settings.languageBody')} />
        </View>
      </Card>

      <SectionHeader title={t('settings.notifications')} />
      <Card>
        <SwitchRow
          label={t('settings.notificationsEnabled')}
          value={s.notifications.enabled}
          onValueChange={async (enabled) => {
            s.setNotifications({ enabled });
            if (enabled) await ensurePermission();
          }}
        />
        <Divider />
        <SwitchRow label={t('settings.notifyMedication')} value={s.notifications.medication} onValueChange={(medication) => s.setNotifications({ medication })} disabled={!s.notifications.enabled} />
        <SwitchRow label={t('settings.notifyVaccination')} value={s.notifications.vaccination} onValueChange={(vaccination) => s.setNotifications({ vaccination })} disabled={!s.notifications.enabled} />
        <SwitchRow label={t('settings.notifyAppointments')} value={s.notifications.appointments} onValueChange={(appointments) => s.setNotifications({ appointments })} disabled={!s.notifications.enabled} />
        <SwitchRow label={t('settings.notifyCare')} value={s.notifications.care} onValueChange={(care) => s.setNotifications({ care })} disabled={!s.notifications.enabled} />
        <View className="gap-2 pt-2">
          <FieldLabel label={t('settings.defaultLead')}>
            <OptionChips
              options={LEADS.map((l) => ({ value: l, label: t(`reminders.lead.${l}`) }))}
              value={(LEADS.find((l) => Number(l) === s.notifications.leadMinutes) ?? '60') as (typeof LEADS)[number]}
              onChange={(l) => s.setNotifications({ leadMinutes: Number(l) })}
            />
          </FieldLabel>
          <ComingSoonRow icon="mail-outline" label={t('settings.emailNotifications')} />
        </View>
      </Card>

      <SectionHeader title={t('settings.privacy')} />
      <Card>
        {lockAvailable ? (
          <SwitchRow label={t('settings.appLock')} value={lock} onValueChange={toggleLock} />
        ) : (
          <Txt variant="caption" tone="textSecondary">
            {t('settings.appLockUnavailable')}
          </Txt>
        )}
      </Card>

      <SectionHeader title={t('settings.data')} />
      <Card>
        <ListRow
          icon="download-outline"
          title={t('settings.export')}
          subtitle={t('settings.exportBody')}
          onPress={() => shareJsonFile(`petly-export-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(exportAllData(), null, 2)).catch(() => toast(t('errors.generic'), 'danger'))}
        />
        <Divider />
        {s.usingSampleData ? (
          <ListRow
            icon="flask-outline"
            title={t('sample.remove')}
            onPress={() => {
              removeSampleData();
              toast(t('sample.removed'));
            }}
          />
        ) : (
          <ListRow
            icon="flask-outline"
            title={t('settings.loadSample')}
            onPress={() => {
              loadSampleData();
              toast(t('settings.sampleLoaded'));
            }}
          />
        )}
        <Divider />
        <ListRow icon="trash-outline" title={t('settings.erase')} destructive onPress={() => setErase(true)} />
      </Card>
      <View className="gap-2">
        <ComingSoonRow icon="cloud-outline" label={t('settings.cloudSync')} body={t('settings.cloudSyncBody')} />
        <ComingSoonRow icon="star-outline" label={t('more.subscription')} body={t('more.subscriptionBody')} />
      </View>
      <Txt variant="caption" tone="textSecondary" align="center">
        {t('settings.version', { version: Constants.expoConfig?.version ?? '1.0.0' })}
      </Txt>
      <Button label={t('auth.signIn')} variant="ghost" onPress={() => router.push('/sign-in')} />
      <ConfirmSheet
        open={erase}
        title={t('settings.eraseTitle')}
        body={t('settings.eraseBody')}
        confirmLabel={t('settings.erase')}
        destructive
        onClose={() => setErase(false)}
        onConfirm={() => {
          eraseAllData();
          deleteSecret(SECURE_KEYS.appLock).catch(() => {});
          toast(t('settings.erased'));
          router.replace('/welcome');
        }}
      />
    </Screen>
  );
}
