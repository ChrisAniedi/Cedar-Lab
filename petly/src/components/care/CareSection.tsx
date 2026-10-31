import { View } from 'react-native';

import type { TaskOccurrence } from '@/core/tasks';

import { Txt } from '../ui/Txt';
import { CareTaskItem } from './CareTaskItem';

export function CareSection({ title, items, onToggle, showPet }: { title: string; items: TaskOccurrence[]; onToggle: (o: TaskOccurrence) => void; showPet: boolean }) {
  if (items.length === 0) return null;
  return (
    <View className="gap-2">
      <Txt variant="overline" tone="textSecondary">
        {`${title} · ${items.length}`}
      </Txt>
      <View className="gap-1.5">
        {items.map((o) => (
          <CareTaskItem key={`${o.task.id}-${o.date}`} occ={o} onToggle={() => onToggle(o)} showPet={showPet} />
        ))}
      </View>
    </View>
  );
}
