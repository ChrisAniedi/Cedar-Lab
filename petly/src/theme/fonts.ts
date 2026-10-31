/** Inter weights, loaded in the root layout. Txt picks the family per weight. */
export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;
export type FontWeight = keyof typeof fontFamily;
