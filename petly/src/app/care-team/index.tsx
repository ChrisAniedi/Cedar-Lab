import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ActivityTimeline } from '@/components/health/ActivityTimeline';
import { useActivity } from '@/components/health/useActivity';
import { MemberRow } from '@/components/team/MemberRow';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ComingSoonRow } from '@/components/ui/ComingSoonRow';
import { Divider } from '@/components/ui/Divider';
import { FieldLabel } from '@/components/ui/FieldLabel';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Txt } from '@/components/ui/Txt';
import { ROLES } from '@/core/types';
import { useCare } from '@/stores/care';
import { useHousehold } from '@/stores/household';

export default function CareTeam() {
  const { t } = useTranslation();
  const router = useRouter();
  const members = useHousehold((s) => s.members);
  const current = useHousehold((s) => s.currentMemberId);
  const setCurrent = useHousehold((s) => s.setCurrentMember);
  const tasks = useCare((s) => s.tasks);
  const activity = useActivity(null, 10);

  return (
    <Screen edges={[]} width="form">
      <Txt tone="textSecondary">{t('team.addBody')}</Txt>
      <Card>
        <SectionHeader title={t('team.members')} action={t('team.add')} onAction={() => router.push('/care-team/new')} />
        {members.map((m, i) => (
          <View key={m.id}>
            {i > 0 ? <Divider /> : null}
            <MemberRow member={m} assigned={tasks.filter((x) => x.assigneeId === m.id).length} onPress={() => router.push({ pathname: '/care-team/new', params: { id: m.id } })} />
          </View>
        ))}
      </Card>
      {members.length > 1 ? (
        <Card>
          <FieldLabel label={t('team.actingAs')}>
            <Txt variant="caption" tone="textSecondary">
              {t('team.actingAsBody')}
            </Txt>
            <OptionChips options={members.map((m) => ({ value: m.id, label: m.isSelf ? m.name || t('common.you') : m.name }))} value={current} onChange={setCurrent} />
          </FieldLabel>
        </Card>
      ) : null}
      <Card>
        <SectionHeader title={t('team.permissions')} />
        {ROLES.map((r) => (
          <View key={r} className="gap-0.5 py-2">
            <Txt variant="callout" weight="semibold">
              {t(`team.roles.${r}`)}
            </Txt>
            <Txt variant="caption" tone="textSecondary">
              {t(`team.roleDescriptions.${r}`)}
            </Txt>
          </View>
        ))}
      </Card>
      <View className="gap-2">
        <ComingSoonRow icon="mail-outline" label={t('team.invites')} body={t('team.invitesBody')} />
        <ComingSoonRow icon="hourglass-outline" label={t('team.pending')} />
      </View>
      <Card>
        <SectionHeader title={t('team.recent')} />
        <ActivityTimeline items={activity} />
      </Card>
      <Button label={t('team.add')} icon="person-add-outline" variant="secondary" onPress={() => router.push('/care-team/new')} />
    </Screen>
  );
}
