import { View } from 'react-native';

import { Txt } from '../ui/Txt';

/** Compact 1–5 score history (appetite, water, energy). Oldest → newest. */
export function ScoreBars({ title, scores, summary, accessibilityLabel }: { title: string; scores: (number | null)[]; summary: string; accessibilityLabel: string }) {
  return (
    <View className="gap-2" accessible accessibilityLabel={accessibilityLabel}>
      <View className="flex-row items-baseline justify-between">
        <Txt variant="callout" weight="semibold">
          {title}
        </Txt>
        <Txt variant="caption" tone="textSecondary">
          {summary}
        </Txt>
      </View>
      <View className="h-12 flex-row items-end gap-1">
        {scores.map((s, i) => (
          <View key={i} className="flex-1 justify-end rounded-sm bg-surface-muted" style={{ height: '100%' }}>
            {s ? <View className={`rounded-sm ${s <= 2 ? 'bg-warning' : 'bg-secondary'}`} style={{ height: `${(s / 5) * 100}%` }} /> : null}
          </View>
        ))}
      </View>
    </View>
  );
}
