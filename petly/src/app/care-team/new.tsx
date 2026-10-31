import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { ConfirmSheet } from '@/components/ui/ConfirmSheet';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { Txt } from '@/components/ui/Txt';
import { RoleOption } from '@/components/team/RoleOption';
import { ROLES, type Role } from '@/core/types';
import { required } from '@/core/validation';
import { useHousehold } from '@/stores/household';
import { useSettings } from '@/stores/settings';
import { toast } from '@/stores/toast';

export default function MemberForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const existing = useHousehold((s) => s.members.find((m) => m.id === id));
  const { addMember, updateMember, removeMember, setSelfName } = useHousehold();
  const [name, setName] = useState(existing?.name ?? '');
  const [role, setRole] = useState<Role>(existing?.role ?? 'caregiver');
  const [error, setError] = useState<'required' | null>(null);
  const [confirm, setConfirm] = useState(false);
  const roles = existing?.isSelf ? (['owner'] as Role[]) : ROLES.filter((r) => r !== 'owner');

  const save = () => {
    const e = required(name);
    setError(e === 'required' ? 'required' : null);
    if (e) return;
    if (existing?.isSelf) {
      setSelfName(name.trim());
      useSettings.getState().set({ name: name.trim() });
    } else if (existing) updateMember(existing.id, { name: name.trim(), role });
    else addMember(name.trim(), role);
    toast(t('team.saved'));
    router.back();
  };

  return (
    <Screen width="form" edges={[]} footer={<Button label={t('common.save')} onPress={save} full />}>
      <Stack.Screen options={{ title: existing ? existing.name || t('common.you') : t('team.add') }} />
      <TextField label={t('team.name')} value={name} onChangeText={setName} error={error} autoComplete="name" />
      <View className="gap-2">
        <Txt variant="label">{t('team.role')}</Txt>
        {roles.map((r) => (
          <RoleOption key={r} role={r} selected={role === r} onPress={() => setRole(r)} />
        ))}
      </View>
      {existing && !existing.isSelf ? (
        <View>
          <Button label={t('common.delete')} variant="ghost" icon="trash-outline" onPress={() => setConfirm(true)} />
          <ConfirmSheet
            open={confirm}
            title={t('team.removeTitle', { name: existing.name })}
            body={t('team.removeBody')}
            confirmLabel={t('common.delete')}
            destructive
            onClose={() => setConfirm(false)}
            onConfirm={() => {
              removeMember(existing.id);
              router.back();
            }}
          />
        </View>
      ) : null}
    </Screen>
  );
}
