import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { DoseLog } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { useMemberName } from '@/hooks/useMemberName';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Txt } from '../ui/Txt';

/** A scheduled dose: mark given / skip, or show who did it. Never suggests a dose. */
export function DoseRow({ time, log, onLog }: { time: string; log: DoseLog | null; onLog: (s: DoseLog['status']) => void }) {
  const { t } = useTranslation();
  const f = useFormat();
  const member = useMemberName();
  return (
    <View className="min-h-[56px] flex-row items-center gap-3 py-2">
      <Txt variant="subheading" style={{ width: 84 }}>
        {f.time(time)}
      </Txt>
      {log ? (
        <View className="flex-1 gap-1">
          <Badge label={t(`medications.${log.status}`)} tone={log.status === 'given' ? 'success' : 'warning'} icon={log.status === 'given' ? 'checkmark-circle' : 'remove-circle-outline'} />
          <Txt variant="caption" tone="textSecondary">
            {t('common.byOn', { name: member(log.by), time: f.time(new Date(log.at).toTimeString().slice(0, 5)) })}
          </Txt>
        </View>
      ) : (
        <View className="flex-1 flex-row justify-end gap-2">
          <Button size="sm" variant="secondary" label={t('medications.markSkipped')} onPress={() => onLog('skipped')} />
          <Button size="sm" label={t('medications.markGiven')} icon="checkmark" onPress={() => onLog('given')} />
        </View>
      )}
    </View>
  );
}
