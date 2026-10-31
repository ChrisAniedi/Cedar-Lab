import type { SurfaceToken, TextToken } from './tokens';

/**
 * Every text-carrying colour pair in the UI. The contrast test measures each
 * pair in both themes against WCAG AA.
 *
 * RULE: when a coloured surface gains text, add the pair here first.
 */
export type TextPair = { fg: TextToken; bg: SurfaceToken; where: string };

export const textPairs: TextPair[] = [
  // Body and secondary text on the neutral surfaces
  { fg: 'text', bg: 'background', where: 'screen body' },
  { fg: 'text', bg: 'surface', where: 'cards' },
  { fg: 'text', bg: 'surfaceMuted', where: 'inputs, muted rows' },
  { fg: 'textSecondary', bg: 'background', where: 'screen captions' },
  { fg: 'textSecondary', bg: 'surface', where: 'card captions' },
  { fg: 'textSecondary', bg: 'surfaceMuted', where: 'input placeholders, muted rows' },
  { fg: 'textPrimary', bg: 'background', where: 'links on screen' },
  { fg: 'textPrimary', bg: 'surface', where: 'links in cards' },
  { fg: 'textPrimary', bg: 'primarySoft', where: 'selected chips, tab pills' },
  { fg: 'textPrimary', bg: 'surfaceMuted', where: 'ghost buttons on muted rows' },

  // Brand surfaces
  { fg: 'onPrimary', bg: 'primary', where: 'primary buttons, active nav, hero' },
  { fg: 'onSecondary', bg: 'secondary', where: 'sage badges' },
  { fg: 'onAccent', bg: 'accent', where: 'peach highlight' },
  { fg: 'accentInk', bg: 'accentSoft', where: 'sample-data badge' },
  { fg: 'accentInk', bg: 'surface', where: 'sample-data note' },

  // Status
  { fg: 'successInk', bg: 'successSoft', where: 'done / healthy badges' },
  { fg: 'successInk', bg: 'surface', where: 'done text in cards' },
  { fg: 'warningInk', bg: 'warningSoft', where: 'due-soon badges' },
  { fg: 'warningInk', bg: 'surface', where: 'due-soon text in cards' },
  { fg: 'dangerInk', bg: 'dangerSoft', where: 'overdue badges' },
  { fg: 'dangerInk', bg: 'surface', where: 'overdue text, field errors' },
  { fg: 'dangerInk', bg: 'background', where: 'form errors on screen' },
  { fg: 'onDanger', bg: 'danger', where: 'destructive buttons' },
];
