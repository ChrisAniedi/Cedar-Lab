import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import type { Member } from '@/core/types';
import { useMemberName } from '@/hooks/useMemberName';

import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';

export function MemberRow({ member, assigned, onPress }: { member: Member; assigned: number; onPress: () => void }) {
  const { t } = useTranslation();
  const name = useMemberName();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" className="min-h-[64px] flex-row items-center gap-3 py-2 active:opacity-70">
      <Avatar name={member.name || name(member.id)} size={44} />
      <View className="flex-1 gap-1">
        <View className="flex-row flex-wrap items-center gap-2">
          <Txt variant="callout" weight="semibold">
            {member.isSelf ? `${member.name || t('common.you')} (${t('common.you')})` : member.name}
          </Txt>
          <SampleBadge show={member.isSample} />
        </View>
        <View className="flex-row flex-wrap items-center gap-2">
          <Badge label={t(`team.roles.${member.role}`)} tone={member.role === 'owner' || member.role === 'admin' ? 'primary' : 'neutral'} />
          <Txt variant="caption" tone="textSecondary">
            {t('team.assigned', { count: assigned })}
          </Txt>
        </View>
      </View>
      <Icon name="chevron-forward" tone="textSecondary" size={18} />
    </Pressable>
  );
}
