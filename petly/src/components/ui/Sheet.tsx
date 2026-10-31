import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, type BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useEffect, useRef, type ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/useTheme';

import { Txt } from './Txt';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Backdrop = (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.4} />;

/**
 * Controlled bottom sheet. It renders in a portal, so its surface colour is
 * passed in JS from the theme rather than relying on CSS variables.
 */
export function Sheet({ open, onClose, title, children }: SheetProps) {
  const ref = useRef<BottomSheetModal>(null);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Only dismiss a sheet that is actually presented: calling dismiss() on a
  // never-presented BottomSheetModal leaves it unable to present later.
  const shown = useRef(false);

  useEffect(() => {
    if (open && !shown.current) {
      shown.current = true;
      ref.current?.present();
    } else if (!open && shown.current) {
      shown.current = false;
      ref.current?.dismiss();
    }
  }, [open]);

  const handleDismiss = () => {
    shown.current = false;
    onClose();
  };

  return (
    <BottomSheetModal
      ref={ref}
      onDismiss={handleDismiss}
      backdropComponent={Backdrop}
      backgroundStyle={{ backgroundColor: colors.surface }}
      handleIndicatorStyle={{ backgroundColor: colors.border, width: 40 }}
      enableDynamicSizing
      maxDynamicContentSize={640}
      accessibilityViewIsModal
    >
      <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}>
        <View style={{ gap: 16, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
          {title ? (
            <Txt variant="heading" accessibilityRole="header">
              {title}
            </Txt>
          ) : null}
          {children}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
