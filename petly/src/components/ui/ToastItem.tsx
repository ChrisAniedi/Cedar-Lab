import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import { useToast, type Toast } from '@/stores/toast';

import { Icon } from './Icon';
import { Txt } from './Txt';

const ICON = { success: 'checkmark-circle', info: 'information-circle', danger: 'alert-circle' } as const;

/** Uses the measured onPrimary/primary and onDanger/danger pairs. */
export function ToastItem({ toast }: { toast: Toast }) {
  const dismiss = useToast((s) => s.dismiss);
  const danger = toast.tone === 'danger';
  return (
    <Animated.View entering={FadeInDown.duration(200)} exiting={FadeOutDown.duration(150)} style={{ width: '100%', maxWidth: 480 }}>
      <View
        className={`flex-row items-center gap-3 rounded-field px-4 py-3 ${danger ? 'bg-danger' : 'bg-primary'}`}
        accessibilityLiveRegion="polite"
        accessibilityRole="alert"
      >
        <Icon name={ICON[toast.tone]} tone={danger ? 'onDanger' : 'onPrimary'} size={20} />
        <Txt variant="callout" tone={danger ? 'onDanger' : 'onPrimary'} style={{ flex: 1 }}>
          {toast.message}
        </Txt>
        {toast.action ? (
          <Pressable
            onPress={() => {
              toast.action?.onPress();
              dismiss(toast.id);
            }}
            accessibilityRole="button"
            hitSlop={8}
            className="min-h-[36px] justify-center"
          >
            <Txt variant="label" tone={danger ? 'onDanger' : 'onPrimary'} style={{ textDecorationLine: 'underline' }}>
              {toast.action.label}
            </Txt>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}
