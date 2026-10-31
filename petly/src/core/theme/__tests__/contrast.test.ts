import { AA_NORMAL, contrastRatio, hexToRgb, hexToTriplet, meetsAA } from '../contrast';
import { textPairs } from '../textPairs';
import { palettes, type SchemeName } from '../tokens';

describe('contrast maths', () => {
  it('matches known WCAG reference values', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
    expect(contrastRatio('#777777', '#FFFFFF')).toBeCloseTo(4.48, 2);
  });

  it('is symmetric', () => {
    expect(contrastRatio('#285C49', '#FFFFFF')).toBeCloseTo(contrastRatio('#FFFFFF', '#285C49'));
  });

  it('parses hex and triplets', () => {
    expect(hexToRgb('#285C49')).toEqual({ r: 40, g: 92, b: 73 });
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToTriplet('#285C49')).toBe('40 92 73');
    expect(() => hexToRgb('nope')).toThrow();
  });

  it('documents why the PRD secondary grey was replaced', () => {
    expect(meetsAA('#7A827D', '#FFFFFF')).toBe(false);
  });

  it('documents why sage never carries white text', () => {
    expect(meetsAA('#FFFFFF', '#A8C6AE')).toBe(false);
    expect(meetsAA('#FFFFFF', '#F4B99E')).toBe(false);
  });
});

describe.each(['light', 'dark'] as SchemeName[])('%s theme text pairs meet WCAG AA', (scheme) => {
  const palette = palettes[scheme];
  it.each(textPairs.map((p) => [p.fg, p.bg, p.where] as const))('%s on %s (%s)', (fg, bg) => {
    const ratio = contrastRatio(palette[fg], palette[bg]);
    expect({ pair: `${fg} on ${bg}`, ratio: Math.round(ratio * 100) / 100, pass: ratio >= AA_NORMAL }).toEqual(
      expect.objectContaining({ pass: true }),
    );
  });
});
