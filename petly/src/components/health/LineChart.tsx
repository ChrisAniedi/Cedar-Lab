import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg';

import { useTheme } from '@/theme/useTheme';

import { Txt } from '../ui/Txt';

export interface ChartPoint {
  key: string;
  value: number;
  label: string;
  valueLabel: string;
}

interface LineChartProps {
  points: ChartPoint[];
  height?: number;
  accessibilityLabel: string;
  pointLabel: (p: ChartPoint) => string;
}

/** Interactive line chart: tap a column to inspect a point. */
export function LineChart({ points, height = 180, accessibilityLabel, pointLabel }: LineChartProps) {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const pad = { x: 12, top: 16, bottom: 16 };

  if (points.length === 0) return null;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const lo = min - span * 0.15;
  const hi = max + span * 0.15;
  const innerW = Math.max(1, width - pad.x * 2);
  const innerH = height - pad.top - pad.bottom;
  const x = (i: number) => pad.x + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number) => pad.top + innerH - ((v - lo) / (hi - lo)) * innerH;
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1).toFixed(1)},${height - pad.bottom} L${x(0).toFixed(1)},${height - pad.bottom} Z`;
  const sel = active ?? points.length - 1;
  const selPoint = points[sel]!;

  return (
    <View className="gap-2">
      <View className="flex-row items-baseline justify-between">
        <Txt variant="title">{selPoint.valueLabel}</Txt>
        <Txt variant="caption" tone="textSecondary">
          {selPoint.label}
        </Txt>
      </View>
      <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)} style={{ height }} accessible accessibilityRole="image" accessibilityLabel={accessibilityLabel}>
        {width > 0 ? (
          <Svg width={width} height={height}>
            <Defs>
              <LinearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={colors.primary} stopOpacity={0.22} />
                <Stop offset="1" stopColor={colors.primary} stopOpacity={0} />
              </LinearGradient>
            </Defs>
            {[0, 0.5, 1].map((r) => (
              <Line key={r} x1={pad.x} x2={width - pad.x} y1={pad.top + innerH * r} y2={pad.top + innerH * r} stroke={colors.border} strokeDasharray="4 6" />
            ))}
            <Path d={area} fill="url(#fill)" />
            <Path d={line} stroke={colors.primary} strokeWidth={2.5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <Line x1={x(sel)} x2={x(sel)} y1={pad.top} y2={height - pad.bottom} stroke={colors.textSecondary} strokeOpacity={0.4} />
            {points.map((p, i) => (
              <Circle key={p.key} cx={x(i)} cy={y(p.value)} r={i === sel ? 6 : 3.5} fill={i === sel ? colors.primary : colors.surface} stroke={colors.primary} strokeWidth={2} />
            ))}
          </Svg>
        ) : null}
        <View className="absolute inset-0 flex-row">
          {points.map((p, i) => (
            <Pressable
              key={p.key}
              className="flex-1"
              onPress={() => setActive(i)}
              accessibilityRole="button"
              accessibilityLabel={pointLabel(p)}
              accessibilityState={{ selected: i === sel }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
