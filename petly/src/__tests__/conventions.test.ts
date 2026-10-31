import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

/** Cheap guards for conventions ESLint can't express. */

const SRC = join(__dirname, '..');

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === '__tests__' ? [] : files(p);
    return /\.tsx?$/.test(name) ? [p] : [];
  });
}

const all = files(SRC);
const tsx = all.filter((f) => f.endsWith('.tsx'));

describe('conventions', () => {
  it('never uses dark: variants (theme tokens are CSS variables)', () => {
    const offenders = tsx.filter((f) => /\bdark:/.test(readFileSync(f, 'utf8')));
    expect(offenders).toEqual([]);
  });

  it('never colours text with a Tailwind text-* colour class (use <Txt tone>)', () => {
    const colourClass = /className=[^>]*\btext-(?:background|surface|border|primary|secondary|accent|success|warning|danger|white|black|gray|slate|zinc|neutral|stone|red|green|amber)\b/;
    const offenders = tsx.filter((f) => colourClass.test(readFileSync(f, 'utf8')));
    expect(offenders).toEqual([]);
  });

  it('keeps one component per file in components/', () => {
    const offenders = tsx
      .filter((f) => f.includes(`${join('src', 'components')}`))
      .filter((f) => (readFileSync(f, 'utf8').match(/^export function [A-Z]/gm) ?? []).length > 1);
    expect(offenders).toEqual([]);
  });

  it('keeps hex colours out of components and screens (use theme tokens)', () => {
    const offenders = tsx.filter((f) => /['"]#[0-9a-fA-F]{3,8}['"]/.test(readFileSync(f, 'utf8')));
    expect(offenders).toEqual([]);
  });
});
