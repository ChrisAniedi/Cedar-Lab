import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToast } from '@/stores/toast';

import { ToastItem } from './ToastItem';

/** Renders confirmation toasts above everything. */
export function ToastHost() {
  const toasts = useToast((s) => s.toasts);
  const insets = useSafeAreaInsets();
  if (toasts.length === 0) return null;
  return (
    <View pointerEvents="box-none" className="absolute left-0 right-0 items-center gap-2 px-4" style={{ bottom: insets.bottom + 72 }}>
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </View>
  );
}
